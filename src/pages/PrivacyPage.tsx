import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/profile'
import { contactProvider, site } from '../data/site'
import { social } from '../data/social'
import type { RoutePath } from '../hooks/useRouter'

interface Props {
  onNavigate: (route: RoutePath) => void
}

export function PrivacyPage({ onNavigate }: Props) {
  return (
    <section className="section-y">
      <div className="container-x max-w-3xl">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="mb-10 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition hover:border-accent-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Portfolio</span>
        </button>

        <p className="eyebrow mb-3 text-accent-ink">Privacy &amp; Contact Disclosure</p>
        <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">Privacy Notice</h1>
        <p className="mt-3 font-mono text-xs text-faint">Last updated: {site.privacyUpdated}</p>

        <div className="mt-10 space-y-8 border-t border-line pt-8 text-sm leading-relaxed text-muted sm:text-base">
          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">1. Analytics &amp; Tracking</h2>
            <p>
              This portfolio does not use advertising trackers, behavioural profiling, or third-party analytics cookies.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">2. Browser Storage</h2>
            <p>
              Your theme choice (dark or light mode) is stored locally in <code className="font-mono text-ink">localStorage</code>{' '}
              under the key <code className="font-mono text-ink">vsw-theme</code>, and the brief opening transition flag
              is stored in <code className="font-mono text-ink">sessionStorage</code> under{' '}
              <code className="font-mono text-ink">vsw-intro-seen</code>. Neither leaves your browser.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">3. Contact Form Submissions</h2>
            <p>
              When you submit the contact form, your name, email address and message are sent directly from your browser
              to{' '}
              <a
                href={contactProvider.policy}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:text-accent-ink"
              >
                {contactProvider.name} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>{' '}
              strictly for the purpose of delivering your message to {profile.name} ({social.email.handle}). You may
              also write directly using your own email client at any time.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">4. External Links</h2>
            <p>
              Repository and demo links open external platforms such as GitHub, LinkedIn or Vercel, each governed by its
              own privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
