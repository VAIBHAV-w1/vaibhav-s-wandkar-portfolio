import crypto from 'node:crypto'
import type { IncomingMessage, ServerResponse } from 'node:http'
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@<>()[\]\\.,;:\s@"]+(\.[^\s@<>()[\]\\.,;:\s@"]+)*@[^\s@<>()[\]\\.,;:\s@"]+\.[^\s@<>()[\]\\.,;:\s@"]{2,}$/i
const MAX_BODY_BYTES = 16 * 1024
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX_REQUESTS = 5
const DUPLICATE_COOLDOWN_MS = 90 * 1000
const MAX_TRACKED_KEYS = 2000

export interface ContactRequest extends IncomingMessage {
  body?: unknown
  ip?: string
}

export interface ContactResponse extends ServerResponse {
  status?: (code: number) => ContactResponse
  json?: (payload: unknown) => void
}

export interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
  from: string
  to: string
}

export interface RateLimiterStore {
  ipHits: Map<string, number[]>
  recentFingerprints: Map<string, number>
}

export interface HandlerDeps {
  env?: Record<string, string | undefined>
  now?: () => number
  store?: RateLimiterStore
  createTransport?: typeof nodemailer.createTransport
}

const defaultStore: RateLimiterStore = {
  ipHits: new Map(),
  recentFingerprints: new Map(),
}

function sendJson(res: ContactResponse, statusCode: number, payload: Record<string, unknown>, extraHeaders?: Record<string, string>) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) {
      res.setHeader(k, v)
    }
  }
  res.end(JSON.stringify(payload))
}

function stripHeaderControlChars(value: string): string {
  return value.replace(/[\r\n\0\u0008\u000B\u000C\u007F]/g, ' ').replace(/\s+/g, ' ').trim()
}

function sanitizeMultilineBody(value: string): string {
  return value.replace(/\r\n/g, '\n').replace(/\r/g, '\n').replace(/\0/g, '').trim()
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

export function buildContactEmailText(params: {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}): string {
  return [
    'VSW — New Portfolio Enquiry',
    'You have received a new message through your portfolio contact form.',
    '--------------------------------------------------',
    `Sender Name:  ${params.name}`,
    `Sender Email: ${params.email}`,
    `Subject:      ${params.subject}`,
    `Submitted:    ${params.submittedAt}`,
    '--------------------------------------------------',
    '',
    params.message,
    '',
    '--------------------------------------------------',
    'Sent through the VSW Portfolio Contact Form.',
  ].join('\n')
}

export function buildContactEmailHtml(params: {
  name: string
  email: string
  subject: string
  message: string
  submittedAt: string
}): string {
  const safeName = escapeHtml(params.name)
  const safeEmail = escapeHtml(params.email)
  const safeSubject = escapeHtml(params.subject)
  const safeSubmittedAt = escapeHtml(params.submittedAt)
  const safeMessageHtml = escapeHtml(params.message).replace(/\n/g, '<br />')
  const replyHref = `mailto:${encodeURIComponent(params.email)}?subject=${encodeURIComponent(`Re: ${params.subject}`)}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f0e7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#141512;-webkit-font-smoothing:antialiased;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f3f0e7;padding:28px 14px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #dfd8c8;border-radius:14px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background-color:#0d0e0c;padding:24px 28px;border-bottom:2px solid #d4af37;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="vertical-align:middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border:1.5px solid #d4af37;border-radius:999px;padding:7px 14px;background-color:#151612;">
                          <span style="font-size:15px;font-weight:700;letter-spacing:0.12em;color:#ece8dc;">V<span style="color:#d4af37;">S</span>W</span>
                        </td>
                        <td style="padding-left:14px;">
                          <div style="font-size:15px;font-weight:600;color:#ece8dc;line-height:1.25;">Vaibhav S. Wandkar</div>
                          <div style="font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#d4af37;margin-top:2px;">Portfolio Notification</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro & Heading -->
          <tr>
            <td style="padding:28px 28px 18px 28px;background-color:#ffffff;">
              <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.25;font-weight:600;color:#141512;">New Portfolio Enquiry</h1>
              <p style="margin:0;font-size:14px;line-height:1.6;color:#4a4842;">
                You have received a new message through your portfolio contact form.
              </p>
            </td>
          </tr>

          <!-- Sender Metadata Table -->
          <tr>
            <td style="padding:0 28px 20px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#faf8f2;border:1px solid #e6dfd0;border-radius:10px;">
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ebe5d8;width:110px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78560b;">Sender Name</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ebe5d8;font-size:14px;font-weight:600;color:#141512;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #ebe5d8;width:110px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78560b;">Sender Email</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #ebe5d8;font-size:14px;color:#141512;">
                    <a href="mailto:${safeEmail}" style="color:#78560b;text-decoration:underline;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;width:110px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78560b;">Subject</td>
                  <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#141512;">${safeSubject}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body Panel -->
          <tr>
            <td style="padding:0 28px 24px 28px;">
              <div style="font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#78560b;margin-bottom:8px;">Message</div>
              <div style="background-color:#faf8f2;border:1px solid #e6dfd0;border-left:3px solid #d4af37;border-radius:8px;padding:16px 18px;font-size:14px;line-height:1.65;color:#141512;word-break:break-word;">
                ${safeMessageHtml}
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:0 28px 28px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="border-radius:999px;background-color:#0d0e0c;border:1px solid #d4af37;">
                    <a href="${replyHref}" style="display:inline-block;padding:12px 24px;font-size:13px;font-weight:600;color:#f3d98b;text-decoration:none;letter-spacing:0.02em;">Reply to Sender</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#faf8f2;border-top:1px solid #e6dfd0;padding:16px 28px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-size:12px;color:#5a574f;">Sent through the VSW Portfolio Contact Form.</td>
                  <td align="right" style="font-size:11px;color:#7a766c;font-family:Consolas,Menlo,monospace;">${safeSubmittedAt}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function extractClientIp(req: ContactRequest): string {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim()
  }
  const realIp = req.headers['x-real-ip']
  if (typeof realIp === 'string' && realIp.trim()) {
    return realIp.trim()
  }
  return req.ip || req.socket?.remoteAddress || 'unknown'
}

function isAllowedOrigin(req: ContactRequest, env: Record<string, string | undefined>): boolean {
  const rawOrigin = typeof req.headers.origin === 'string' ? req.headers.origin.trim() : ''
  const rawReferer = typeof req.headers.referer === 'string' ? req.headers.referer.trim() : ''
  const candidate = rawOrigin || (rawReferer ? (() => {
    try {
      return new URL(rawReferer).origin
    } catch {
      return ''
    }
  })() : '')

  // Same-origin non-browser clients (e.g. curl) without Origin/Referer are checked against Host if present;
  // cross-origin requests always send Origin in modern browsers.
  if (!candidate) return true

  let parsed: URL
  try {
    parsed = new URL(candidate)
  } catch {
    return false
  }

  if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      (parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1')) {
    return true
  }

  const allowedHosts = new Set<string>()
  const hostHeader = (req.headers['x-forwarded-host'] || req.headers.host || '') as string
  if (hostHeader) {
    allowedHosts.add(hostHeader.split(',')[0].trim().toLowerCase())
  }
  for (const key of ['SITE_URL', 'VITE_SITE_URL', 'VERCEL_PROJECT_PRODUCTION_URL', 'VERCEL_URL', 'VERCEL_BRANCH_URL']) {
    const val = (env[key] || '').trim()
    if (!val) continue
    try {
      const normalized = val.startsWith('http://') || val.startsWith('https://') ? new URL(val).host : val
      allowedHosts.add(normalized.replace(/\/+$/, '').toLowerCase())
    } catch {
      // ignore invalid env URL format
    }
  }

  return allowedHosts.has(parsed.host.toLowerCase())
}

async function readRequestBody(req: ContactRequest): Promise<Record<string, unknown>> {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return req.body as Record<string, unknown>
    }
    const rawStr = Buffer.isBuffer(req.body) ? req.body.toString('utf8') : String(req.body)
    if (Buffer.byteLength(rawStr, 'utf8') > MAX_BODY_BYTES) {
      throw new RangeError('Payload too large')
    }
    const parsed = JSON.parse(rawStr)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new SyntaxError('Expected JSON object')
    }
    return parsed as Record<string, unknown>
  }

  const chunks: Buffer[] = []
  let total = 0
  for await (const chunk of req) {
    const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    total += buf.length
    if (total > MAX_BODY_BYTES) {
      throw new RangeError('Payload too large')
    }
    chunks.push(buf)
  }
  const raw = Buffer.concat(chunks).toString('utf8').trim()
  if (!raw) {
    throw new SyntaxError('Empty body')
  }
  const parsed = JSON.parse(raw)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new SyntaxError('Expected JSON object')
  }
  return parsed as Record<string, unknown>
}

export function resolveSmtpConfig(env: Record<string, string | undefined>): SmtpConfig | null {
  const host = (env.SMTP_HOST || '').trim()
  const user = (env.SMTP_USER || '').trim()
  const pass = env.SMTP_PASS || ''
  const from = (env.MAIL_FROM || '').trim()
  const to = (env.MAIL_TO || '').trim()

  if (!host || !user || !pass || !from || !to) {
    return null
  }

  const portRaw = (env.SMTP_PORT || '587').trim()
  const port = Number(portRaw)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    return null
  }

  const secureRaw = (env.SMTP_SECURE || '').trim().toLowerCase()
  const secure =
    secureRaw === 'true' || secureRaw === '1'
      ? true
      : secureRaw === 'false' || secureRaw === '0'
        ? false
        : port === 465

  return { host, port, secure, user, pass, from, to }
}

function pruneMapIfNeeded(map: Map<string, unknown>) {
  if (map.size <= MAX_TRACKED_KEYS) return
  const excess = map.size - MAX_TRACKED_KEYS
  let count = 0
  for (const key of map.keys()) {
    map.delete(key)
    count += 1
    if (count >= excess) break
  }
}

function extractEmailDomain(addr: string): string {
  const at = addr.lastIndexOf('@')
  if (at === -1) return 'unknown'
  return addr.slice(at + 1).replace(/[>\s].*$/, '').toLowerCase() || 'unknown'
}

export async function handleContactRequest(
  req: ContactRequest,
  res: ContactResponse,
  deps: HandlerDeps = {},
): Promise<void> {
  const env = deps.env ?? process.env
  const now = deps.now ?? Date.now
  const store = deps.store ?? defaultStore
  const createTransport = deps.createTransport ?? nodemailer.createTransport

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' }, { Allow: 'POST' })
    return
  }

  if (!isAllowedOrigin(req, env)) {
    sendJson(res, 403, { ok: false, error: 'Origin not allowed.' })
    return
  }

  const contentType = String(req.headers['content-type'] || '').toLowerCase()
  if (!contentType.includes('application/json')) {
    sendJson(res, 415, { ok: false, error: 'Content-Type must be application/json.' })
    return
  }

  let body: Record<string, unknown>
  try {
    body = await readRequestBody(req)
  } catch (err) {
    if (err instanceof RangeError) {
      sendJson(res, 413, { ok: false, error: 'Request payload is too large.' })
      return
    }
    sendJson(res, 400, { ok: false, error: 'Malformed JSON request body.' })
    return
  }

  // Reject filled honeypot field before validation/SMTP
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    sendJson(res, 400, { ok: false, error: 'Invalid submission.' })
    return
  }

  const rawName = typeof body.name === 'string' ? body.name : ''
  const rawEmail = typeof body.email === 'string' ? body.email : ''
  const rawSubject = typeof body.subject === 'string' ? body.subject : ''
  const rawMessage = typeof body.message === 'string' ? body.message : ''

  const cleanName = stripHeaderControlChars(rawName)
  const cleanEmail = stripHeaderControlChars(rawEmail).toLowerCase()
  const cleanSubject = stripHeaderControlChars(rawSubject)
  const cleanMessage = sanitizeMultilineBody(rawMessage)

  if (cleanName.length < 2 || cleanName.length > 100) {
    sendJson(res, 400, { ok: false, error: 'Please enter a name between 2 and 100 characters.' })
    return
  }
  if (!cleanEmail || cleanEmail.length > 160 || !EMAIL_RE.test(cleanEmail)) {
    sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' })
    return
  }
  if (cleanSubject.length < 3 || cleanSubject.length > 150) {
    sendJson(res, 400, { ok: false, error: 'Please enter a subject between 3 and 150 characters.' })
    return
  }
  if (cleanMessage.length < 10 || cleanMessage.length > 2500) {
    sendJson(res, 400, { ok: false, error: 'Please enter a message between 10 and 2500 characters.' })
    return
  }

  const currentMs = now()
  const clientIp = extractClientIp(req)

  // Check duplicate submission fingerprint
  const fingerprint = crypto
    .createHash('sha256')
    .update(`${clientIp}|${cleanEmail}|${cleanSubject}|${cleanMessage}`)
    .digest('hex')
  const prevDup = store.recentFingerprints.get(fingerprint)
  if (prevDup !== undefined && currentMs - prevDup < DUPLICATE_COOLDOWN_MS) {
    const retryAfter = Math.max(1, Math.ceil((DUPLICATE_COOLDOWN_MS - (currentMs - prevDup)) / 1000))
    sendJson(
      res,
      429,
      { ok: false, error: 'This message was already sent recently. Please wait before sending again.' },
      { 'Retry-After': String(retryAfter) },
    )
    return
  }

  // Sliding-window rate limit per IP
  const recentHits = (store.ipHits.get(clientIp) || []).filter((ts) => currentMs - ts < RATE_WINDOW_MS)
  if (recentHits.length >= RATE_MAX_REQUESTS) {
    const oldest = recentHits[0]
    const retryAfter = Math.max(1, Math.ceil((RATE_WINDOW_MS - (currentMs - oldest)) / 1000))
    sendJson(
      res,
      429,
      { ok: false, error: 'Too many messages sent recently. Please wait a few minutes and try again.' },
      { 'Retry-After': String(retryAfter) },
    )
    return
  }

  const smtp = resolveSmtpConfig(env)
  if (!smtp) {
    sendJson(res, 503, {
      ok: false,
      error: 'Email delivery is not configured on this server. Please use the direct email address listed on the page.',
    })
    return
  }

  // Count attempt before dialing SMTP to prevent rapid error-flooding
  recentHits.push(currentMs)
  store.ipHits.set(clientIp, recentHits)
  pruneMapIfNeeded(store.ipHits)

  const submittedAt = new Date(currentMs).toISOString()
  const emailParams = {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
    submittedAt,
  }
  const textBody = buildContactEmailText(emailParams)
  const htmlBody = buildContactEmailHtml(emailParams)

  try {
    const transporter = createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    })

    const info = await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: cleanEmail,
      subject: `[Portfolio] ${cleanSubject}`,
      text: textBody,
      html: htmlBody,
    })

    const accepted = Array.isArray(info.accepted) ? info.accepted.length : 0
    const rejected = Array.isArray(info.rejected) ? info.rejected.length : 0
    const smtpResponse = typeof info.response === 'string' ? info.response.slice(0, 80) : ''

    if (accepted === 0 || rejected > 0) {
      const rejErr = new Error('SMTP recipient rejected') as Error & { code?: string }
      rejErr.code = 'ERECIPIENT'
      throw rejErr
    }

    console.info(
      `[CONTACT_SMTP_SENT] host=${smtp.host} port=${smtp.port} secure=${smtp.secure} fromDomain=${extractEmailDomain(smtp.from)} toDomain=${extractEmailDomain(smtp.to)} accepted=${accepted} rejected=${rejected} response="${smtpResponse}"`,
    )

    store.recentFingerprints.set(fingerprint, currentMs)
    pruneMapIfNeeded(store.recentFingerprints)

    sendJson(res, 200, {
      ok: true,
      message: 'Message sent successfully. Thank you for reaching out.',
    })
  } catch (err) {
    const errObj = err && typeof err === 'object' ? (err as { code?: unknown; responseCode?: unknown; command?: unknown }) : {}
    const code = errObj.code ? String(errObj.code) : 'SMTP_ERROR'
    const responseCode = errObj.responseCode ? String(errObj.responseCode) : ''
    const command = errObj.command ? String(errObj.command) : ''
    console.error(`[CONTACT_SMTP_FAILED] host=${smtp.host} port=${smtp.port} secure=${smtp.secure} code=${code} responseCode=${responseCode} command=${command}`)
    sendJson(res, 502, {
      ok: false,
      error: 'Unable to send your message right now. Please try again later or email vaibhavwandkar5@gmail.com directly.',
    })
  }
}

export default async function handler(req: ContactRequest, res: ContactResponse): Promise<void> {
  await handleContactRequest(req, res)
}
