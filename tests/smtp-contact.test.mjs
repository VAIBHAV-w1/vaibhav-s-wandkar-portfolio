import assert from 'node:assert/strict'
import net from 'node:net'
import { Readable } from 'node:stream'
import { handleContactRequest } from '../api/contact.ts'

function makeReq({ method = 'POST', headers = {}, body = undefined, ip = '203.0.113.10' } = {}) {
  const payload = body === undefined ? null : typeof body === 'string' ? body : JSON.stringify(body)
  const stream = payload ? Readable.from([Buffer.from(payload, 'utf8')]) : Readable.from([])
  return Object.assign(stream, {
    method,
    ip,
    headers: {
      host: 'vaibhav-s-wandkar-portfolio.vercel.app',
      origin: 'https://vaibhav-s-wandkar-portfolio.vercel.app',
      'content-type': 'application/json',
      ...headers,
    },
    socket: { remoteAddress: ip },
  })
}

function makeRes() {
  const headers = {}
  let rawBody = ''
  return {
    statusCode: 200,
    setHeader(k, v) {
      headers[k.toLowerCase()] = String(v)
    },
    end(chunk = '') {
      rawBody += Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk)
    },
    get parsed() {
      return JSON.parse(rawBody || '{}')
    },
    get headers() {
      return headers
    },
  }
}

function createFreshStore() {
  return { ipHits: new Map(), recentFingerprints: new Map() }
}

/**
 * Lightweight local RFC 5321 TCP SMTP server to test real Nodemailer wire exchanges.
 */
function startLocalSmtpServer({ rejectAuth = false } = {}) {
  return new Promise((resolve) => {
    const receivedMessages = []
    const server = net.createServer((socket) => {
      let buffer = ''
      let inData = false
      let currentData = ''
      socket.write('220 localhost ESMTP VSW-Test\r\n')
      socket.on('data', (chunk) => {
        buffer += chunk.toString('utf8')
        while (buffer.length > 0) {
          if (inData) {
            const endIdx = buffer.indexOf('\r\n.\r\n')
            if (endIdx === -1) break
            currentData += buffer.slice(0, endIdx)
            buffer = buffer.slice(endIdx + 5)
            inData = false
            receivedMessages.push(currentData)
            currentData = ''
            socket.write('250 2.0.0 Ok: queued for test delivery\r\n')
            continue
          }
          const nl = buffer.indexOf('\r\n')
          if (nl === -1) break
          const line = buffer.slice(0, nl)
          buffer = buffer.slice(nl + 2)
          const upper = line.toUpperCase()
          if (upper.startsWith('EHLO') || upper.startsWith('HELO')) {
            socket.write('250-localhost\r\n250 AUTH PLAIN LOGIN\r\n')
          } else if (upper.startsWith('AUTH PLAIN')) {
            if (rejectAuth) {
              socket.write('535 5.7.8 Authentication credentials invalid\r\n')
            } else {
              socket.write('235 2.7.0 Authentication successful\r\n')
            }
          } else if (upper.startsWith('AUTH LOGIN')) {
            socket.write('334 VXNlcm5hbWU6\r\n')
          } else if (upper.startsWith('MAIL FROM:')) {
            socket.write('250 2.1.0 Ok\r\n')
          } else if (upper.startsWith('RCPT TO:')) {
            socket.write('250 2.1.5 Ok\r\n')
          } else if (upper === 'DATA') {
            inData = true
            socket.write('354 End data with <CR><LF>.<CR><LF>\r\n')
          } else if (upper === 'QUIT') {
            socket.write('221 2.0.0 Bye\r\n')
            socket.end()
          } else {
            socket.write(rejectAuth ? '535 5.7.8 Authentication failed\r\n' : '250 2.0.0 Ok\r\n')
          }
        }
      })
    })
    server.listen(0, '127.0.0.1', () => {
      const addr = server.address()
      resolve({
        port: addr.port,
        receivedMessages,
        close: () => new Promise((r) => server.close(() => r())),
      })
    })
  })
}

async function runTests() {
  const validEnv = (port) => ({
    SMTP_HOST: '127.0.0.1',
    SMTP_PORT: String(port),
    SMTP_SECURE: 'false',
    SMTP_USER: 'mailer-user',
    SMTP_PASS: 'secret-test-pass',
    MAIL_FROM: 'portfolio@example.test',
    MAIL_TO: 'vaibhavwandkar5@gmail.com',
  })

  // 1. Missing fields
  {
    const res = makeRes()
    await handleContactRequest(
      makeReq({ body: { name: 'A', email: 'v@example.com', subject: 'Hi', message: 'short' } }),
      res,
      { store: createFreshStore(), env: validEnv(587) },
    )
    assert.equal(res.statusCode, 400)
    assert.equal(res.parsed.ok, false)
    console.log('PASS 1: Missing/short fields rejected (400)')
  }

  // 2. Invalid email
  {
    const res = makeRes()
    await handleContactRequest(
      makeReq({ body: { name: 'Recruiter', email: 'not-an-email', subject: 'Role inquiry', message: 'Checking project details for role.' } }),
      res,
      { store: createFreshStore(), env: validEnv(587) },
    )
    assert.equal(res.statusCode, 400)
    assert.match(res.parsed.error, /email/i)
    console.log('PASS 2: Invalid email rejected (400)')
  }

  // 3. Oversized message
  {
    const res = makeRes()
    await handleContactRequest(
      makeReq({
        body: {
          name: 'Visitor',
          email: 'visitor@example.com',
          subject: 'Long payload test',
          message: 'x'.repeat(2600),
        },
      }),
      res,
      { store: createFreshStore(), env: validEnv(587) },
    )
    assert.equal(res.statusCode, 400)
    assert.match(res.parsed.error, /2500/)
    console.log('PASS 3: Oversized message rejected (400)')
  }

  // 4. Honeypot submission
  {
    const res = makeRes()
    await handleContactRequest(
      makeReq({
        body: {
          name: 'Bot User',
          email: 'bot@example.com',
          subject: 'Spam offer',
          message: 'Click this promotional link today for free SEO.',
          company: 'Filled-by-bot',
        },
      }),
      res,
      { store: createFreshStore(), env: validEnv(587) },
    )
    assert.equal(res.statusCode, 400)
    assert.equal(res.parsed.ok, false)
    console.log('PASS 4: Honeypot submission rejected (400)')
  }

  // 5. Invalid HTTP method
  {
    const res = makeRes()
    await handleContactRequest(makeReq({ method: 'GET' }), res, { store: createFreshStore() })
    assert.equal(res.statusCode, 405)
    assert.equal(res.headers.allow, 'POST')
    console.log('PASS 5: Invalid HTTP method GET rejected (405)')
  }

  // 6. Valid request over real loopback TCP SMTP server (Nodemailer wire protocol)
  {
    const smtp = await startLocalSmtpServer()
    try {
      const res = makeRes()
      await handleContactRequest(
        makeReq({
          body: {
            name: 'Anita Rao',
            email: 'anita.rao@example.com',
            subject: 'Django internship question',
            message: 'Hi Vaibhav, saw DeepVision on your portfolio and would like to connect.',
            company: '',
          },
        }),
        res,
        { store: createFreshStore(), env: validEnv(smtp.port) },
      )
      assert.equal(res.statusCode, 200)
      assert.equal(res.parsed.ok, true)
      assert.equal(smtp.receivedMessages.length, 1)
      const wire = smtp.receivedMessages[0]
      assert.match(wire, /Reply-To: anita\.rao@example\.com/i)
      assert.match(wire, /Subject: \[Portfolio\] Django internship question/i)
      assert.match(wire, /Anita Rao/)
      assert.doesNotMatch(wire, /<html>/i)
      console.log('PASS 6: Valid request delivered over Nodemailer SMTP wire protocol (200)')
    } finally {
      await smtp.close()
    }
  }

  // 7. SMTP authentication failure -> generic 502 error without exposing credentials
  {
    const smtp = await startLocalSmtpServer({ rejectAuth: true })
    try {
      const res = makeRes()
      await handleContactRequest(
        makeReq({
          body: {
            name: 'Anita Rao',
            email: 'anita.rao@example.com',
            subject: 'Auth error test',
            message: 'Testing SMTP auth failure handling cleanly.',
          },
        }),
        res,
        { store: createFreshStore(), env: validEnv(smtp.port) },
      )
      assert.equal(res.statusCode, 502)
      assert.equal(res.parsed.ok, false)
      assert.doesNotMatch(res.parsed.error, /secret-test-pass|535|127\.0\.0\.1/)
      console.log('PASS 7: SMTP authentication failure handled generically (502, no leak)')
    } finally {
      await smtp.close()
    }
  }

  // 8. SMTP connection failure / timeout
  {
    // Grab an unused ephemeral port by binding then immediately closing
    const deadSmtp = await startLocalSmtpServer()
    const deadPort = deadSmtp.port
    await deadSmtp.close()

    const res = makeRes()
    await handleContactRequest(
      makeReq({
        body: {
          name: 'Anita Rao',
          email: 'anita.rao@example.com',
          subject: 'Timeout / connection test',
          message: 'Testing refused SMTP connection error handling.',
        },
      }),
      res,
      { store: createFreshStore(), env: validEnv(deadPort) },
    )
    assert.equal(res.statusCode, 502)
    assert.equal(res.parsed.ok, false)
    assert.doesNotMatch(res.parsed.error, /ECONNREFUSED|127\.0\.0\.1|secret-test-pass/)
    console.log('PASS 8: SMTP connection failure handled generically (502, no leak)')
  }

  // 9. Duplicate submission rejection (429)
  {
    const smtp = await startLocalSmtpServer()
    try {
      const store = createFreshStore()
      const payload = {
        name: 'Rahul Nair',
        email: 'rahul@example.com',
        subject: 'Duplicate test',
        message: 'Checking duplicate submission protection works cleanly.',
      }
      const res1 = makeRes()
      await handleContactRequest(makeReq({ body: payload }), res1, { store, env: validEnv(smtp.port) })
      assert.equal(res1.statusCode, 200)

      const res2 = makeRes()
      await handleContactRequest(makeReq({ body: payload }), res2, { store, env: validEnv(smtp.port) })
      assert.equal(res2.statusCode, 429)
      assert.ok(Number(res2.headers['retry-after']) >= 1)
      assert.equal(smtp.receivedMessages.length, 1)
      console.log('PASS 9: Duplicate submission blocked before second SMTP send (429)')
    } finally {
      await smtp.close()
    }
  }

  // 10. Rate limit response (429 after 5 requests) + Origin rejection (403)
  {
    const smtp = await startLocalSmtpServer()
    try {
      const store = createFreshStore()
      for (let i = 1; i <= 5; i += 1) {
        const r = makeRes()
        await handleContactRequest(
          makeReq({
            ip: '198.51.100.77',
            body: {
              name: `User ${i}`,
              email: `user${i}@example.com`,
              subject: `Subject ${i}`,
              message: `Unique valid message payload number ${i} for rate limit.`,
            },
          }),
          r,
          { store, env: validEnv(smtp.port) },
        )
        assert.equal(r.statusCode, 200)
      }
      const blocked = makeRes()
      await handleContactRequest(
        makeReq({
          ip: '198.51.100.77',
          body: {
            name: 'User 6',
            email: 'user6@example.com',
            subject: 'Subject 6',
            message: 'Sixth submission should trigger sliding window rate limit.',
          },
        }),
        blocked,
        { store, env: validEnv(smtp.port) },
      )
      assert.equal(blocked.statusCode, 429)
      assert.ok(Number(blocked.headers['retry-after']) >= 1)

      const badOrigin = makeRes()
      await handleContactRequest(
        makeReq({
          headers: { origin: 'https://untrusted-origin.example' },
          body: {
            name: 'Tester',
            email: 't@example.com',
            subject: 'Origin check',
            message: 'Should be blocked by origin validation check.',
          },
        }),
        badOrigin,
        { store: createFreshStore(), env: validEnv(smtp.port) },
      )
      assert.equal(badOrigin.statusCode, 403)
      console.log('PASS 10: Rate-limit (429) and untrusted origin check (403) verified')
    } finally {
      await smtp.close()
    }
  }

  console.log('\nALL 10 SMTP CONTACT ENDPOINT TESTS PASSED.')
}

runTests().catch((err) => {
  console.error(err)
  process.exit(1)
})
