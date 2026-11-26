import { useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, Send } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { SectionHeader } from '../components/SectionHeader'
import { contactProvider } from '../data/site'
import { social } from '../data/social'
import type { RoutePath } from '../hooks/useRouter'

interface Props {
  reducedMotion: boolean
  onNavigate: (route: RoutePath) => void
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Contact({ reducedMotion, onNavigate }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const mountedAtRef = useRef<number>(Date.now())
  useSectionReveal(sectionRef, reducedMotion)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email.handle)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback: focus mailto
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')

    // Spam guards: honeypot and minimum interaction dwell time (1.5s)
    if (honeypot.trim() !== '') {
      setStatus('sent')
      return
    }
    if (Date.now() - mountedAtRef.current < 1500) {
      setErrorMsg('Please wait a moment before sending your message.')
      setStatus('error')
      return
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanMessage = message.trim()

    if (cleanName.length < 2) {
      setErrorMsg('Please enter your name (at least 2 characters).')
      setStatus('error')
      return
    }
    if (!EMAIL_RE.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }
    if (cleanMessage.length < 10) {
      setErrorMsg('Please write a brief message (at least 10 characters).')
      setStatus('error')
      return
    }

    setStatus('sending')

    try {
      let res: Response
      if (contactProvider.kind === 'web3forms') {
        res = await fetch(contactProvider.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: contactProvider.accessKey,
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            subject: `Portfolio inquiry from ${cleanName}`,
          }),
        })
      } else {
        res = await fetch(contactProvider.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: cleanName,
            email: cleanEmail,
            message: cleanMessage,
            _subject: `Portfolio inquiry from ${cleanName}`,
            _captcha: 'false',
          }),
        })
      }

      const data = (await res.json().catch(() => ({}))) as { success?: boolean | string; message?: string }
      if (!res.ok || data.success === false || data.success === 'false') {
        throw new Error(data.message || 'Unable to deliver your message right now.')
      }

      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? `${err.message} You can also email directly at ${social.email.handle}.`
          : `Delivery failed. Please email directly at ${social.email.handle}.`,
      )
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="06"
          kicker="Contact"
          title={
            <>
              Let&apos;s build{' '}
              <span className="font-serif italic font-normal text-accent-ink">something meaningful</span>
            </>
          }
          aside={<p>Open to engineering internships, project collaborations and technical conversations.</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Direct channels */}
          <div className="space-y-4 lg:col-span-5" data-reveal="">
            <div className="rounded-3xl border border-line bg-bg-2 p-6">
              <p className="eyebrow text-faint">Direct Email</p>
              <a
                href={social.email.href}
                className="mt-2 block break-all text-lg font-medium text-ink transition hover:text-accent-ink sm:text-xl"
              >
                {social.email.handle}
              </a>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={social.email.href}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-accent px-4 text-xs font-semibold text-on-accent transition hover:opacity-90"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Open Mail App</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition hover:border-accent-ink"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-accent-ink" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            <a
              href={social.github.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between rounded-3xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                  <GithubIcon className="h-4 w-4 text-ink" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">GitHub</p>
                  <p className="font-mono text-xs text-muted">@{social.github.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
            </a>

            <a
              href={social.linkedin.href}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between rounded-3xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                  <LinkedinIcon className="h-4 w-4 text-ink" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">LinkedIn</p>
                  <p className="font-mono text-xs text-muted">/in/{social.linkedin.handle}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden="true" />
            </a>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-line bg-bg-2 p-6 sm:p-8 lg:col-span-7" data-reveal="">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Honeypot anti-spam field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Leave this blank</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="eyebrow mb-2 block text-muted">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent-ink focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="eyebrow mb-2 block text-muted">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    maxLength={160}
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent-ink focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="eyebrow mb-2 block text-muted">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={2500}
                  rows={5}
                  placeholder="Tell me about the project, role or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-faint focus:border-accent-ink focus:outline-none"
                />
              </div>

              {status === 'error' && errorMsg ? (
                <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-ink">
                  {errorMsg}
                </p>
              ) : null}

              {status === 'sent' ? (
                <p role="status" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-xs text-ink">
                  Message delivered via {contactProvider.name}. Thank you for reaching out.
                </p>
              ) : null}

              <div className="flex flex-col justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition hover:opacity-90 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                </button>

                <p className="text-xs text-muted">
                  Delivered via {contactProvider.name}.{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="underline decoration-line-strong underline-offset-4 hover:text-ink"
                  >
                    Privacy disclosure
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
