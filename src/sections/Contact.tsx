import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Loader2, Mail, MapPin, Send } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { SectionHeader } from '../components/SectionHeader'
import { social } from '../data/social'
import type { RoutePath } from '../hooks/useRouter'

interface Props {
  reducedMotion: boolean
  onNavigate: (route: RoutePath) => void
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function Contact({ reducedMotion, onNavigate }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')
  const [copied, setCopied] = useState(false)
  const submittingRef = useRef(false)
  const lastSubmittedRef = useRef<{ signature: string; at: number } | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(social.email.handle)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard unavailable; mailto remains visible
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submittingRef.current) return

    setFeedback('')

    const cleanName = name.trim()
    const cleanEmail = email.trim()
    const cleanSubject = subject.trim()
    const cleanMessage = message.trim()

    if (cleanName.length < 2 || cleanName.length > 100) {
      setFeedback('Please enter your name (2 to 100 characters).')
      setStatus('error')
      return
    }
    if (!EMAIL_RE.test(cleanEmail) || cleanEmail.length > 160) {
      setFeedback('Please enter a valid email address.')
      setStatus('error')
      return
    }
    if (cleanSubject.length < 3 || cleanSubject.length > 150) {
      setFeedback('Please enter a subject (3 to 150 characters).')
      setStatus('error')
      return
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 2500) {
      setFeedback('Please enter a message (10 to 2500 characters).')
      setStatus('error')
      return
    }

    const signature = `${cleanEmail.toLowerCase()}|${cleanSubject}|${cleanMessage}`
    const prev = lastSubmittedRef.current
    if (prev && prev.signature === signature && Date.now() - prev.at < 90_000) {
      setFeedback('This message was just sent. Please wait before submitting the same message again.')
      setStatus('error')
      return
    }

    submittingRef.current = true
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          subject: cleanSubject,
          message: cleanMessage,
          company: honeypot,
        }),
      })

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; message?: string }

      if (!res.ok || data.ok !== true) {
        throw new Error(
          data.error || `Unable to deliver your message right now. Please email ${social.email.handle} directly.`,
        )
      }

      lastSubmittedRef.current = { signature, at: Date.now() }
      setStatus('sent')
      setFeedback(data.message || 'Message sent successfully.')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setFeedback(
        err instanceof Error
          ? err.message
          : `Delivery failed. Please email directly at ${social.email.handle}.`,
      )
    } finally {
      submittingRef.current = false
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="07"
          kicker="Contact"
          title="Get in Touch"
          aside={<p>Reach out regarding internships, software projects or technical collaborations.</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5" data-reveal="">
            <div className="rounded-2xl border border-line bg-bg-2 p-6 transition duration-200 hover:border-line-strong">
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
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-accent px-4 text-xs font-semibold text-on-accent transition duration-200 hover:opacity-90 active:scale-[0.97]"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Send Email Directly</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition duration-200 hover:border-accent-ink active:scale-[0.97]"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-accent-ink" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Address'}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-line bg-bg-2 p-5 transition duration-200 hover:border-line-strong">
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface">
                  <MapPin className="h-4 w-4 text-accent-ink" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Location</p>
                  <p className="font-mono text-xs text-muted">{social.location}</p>
                </div>
              </div>
            </div>

            <a
              href={social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-bg-2 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/45"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-200 group-hover:border-accent/45">
                  <GithubIcon className="h-4 w-4 text-ink" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">GitHub</p>
                  <p className="font-mono text-xs text-muted">@{social.github.handle}</p>
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink"
                aria-hidden="true"
              />
            </a>

            <a
              href={social.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-2xl border border-line bg-bg-2 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/45"
            >
              <div className="flex items-center gap-3.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface transition-colors duration-200 group-hover:border-accent/45">
                  <LinkedinIcon className="h-4 w-4 text-ink" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">LinkedIn</p>
                  <p className="font-mono text-xs text-muted">/in/{social.linkedin.handle}</p>
                </div>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink"
                aria-hidden="true"
              />
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-bg-2 p-6 transition-colors duration-200 hover:border-line-strong sm:p-8 lg:col-span-7" data-reveal="">
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

              <div className="grid gap-4 sm:grid-cols-2">
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
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition duration-150 placeholder:text-faint hover:border-line-strong focus:border-accent-ink focus:ring-2 focus:ring-accent/15 focus:outline-none"
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
                    className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition duration-150 placeholder:text-faint hover:border-line-strong focus:border-accent-ink focus:ring-2 focus:ring-accent/15 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="eyebrow mb-2 block text-muted">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={150}
                  placeholder="Internship inquiry, project question or collaboration"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition duration-150 placeholder:text-faint hover:border-line-strong focus:border-accent-ink focus:ring-2 focus:ring-accent/15 focus:outline-none"
                />
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
                  rows={4}
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-y rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink transition duration-150 placeholder:text-faint hover:border-line-strong focus:border-accent-ink focus:ring-2 focus:ring-accent/15 focus:outline-none"
                />
              </div>

              <AnimatePresence mode="wait">
                {status === 'error' && feedback ? (
                  <motion.p
                    key="contact-error"
                    role="alert"
                    initial={reducedMotion ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-ink"
                  >
                    {feedback}
                  </motion.p>
                ) : null}

                {status === 'sent' && feedback ? (
                  <motion.p
                    key="contact-sent"
                    role="status"
                    initial={reducedMotion ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2 rounded-xl border border-accent/45 bg-accent/10 px-4 py-3 text-xs text-ink"
                  >
                    <Check className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
                    <span>{feedback}</span>
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <div className="flex flex-col justify-between gap-4 pt-1 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Send className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                </button>

                <p className="text-xs text-muted">
                  Sent securely via server-side SMTP.{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('/privacy')}
                    className="underline decoration-line-strong underline-offset-4 transition hover:text-ink"
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
