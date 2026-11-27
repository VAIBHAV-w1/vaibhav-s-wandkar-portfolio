import { ArrowLeft } from 'lucide-react'
import { profile } from '../data/profile'
import { site } from '../data/site'
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
          className="mb-8 inline-flex min-h-[42px] items-center gap-2 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition hover:border-accent-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Portfolio</span>
        </button>

        <p className="eyebrow mb-3 text-accent-ink">Privacy Disclosure</p>
        <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">Privacy Notice</h1>
        <p className="mt-3 font-mono text-xs text-faint">Last updated: {site.privacyUpdated}</p>

        <div className="mt-8 space-y-6 border-t border-line pt-7 text-sm leading-relaxed text-muted sm:text-base">
          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">1. Analytics &amp; Tracking</h2>
            <p>
              This portfolio does not run third-party analytics trackers, advertising cookies or behavioural profiling.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">2. Browser Storage</h2>
            <p>
              Your theme preference is stored locally in <code className="font-mono text-ink">localStorage</code> under{' '}
              <code className="font-mono text-ink">vsw-theme</code>, and the initial intro flag uses{' '}
              <code className="font-mono text-ink">sessionStorage</code> (<code className="font-mono text-ink">vsw-intro-seen</code>).
              Neither value is transmitted off your device.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">3. Contact Form Submissions</h2>
            <p>
              Messages submitted through the contact form are sent to the portfolio&apos;s same-origin API endpoint (
              <code className="font-mono text-ink">/api/contact</code>) and forwarded via server-side SMTP to{' '}
              {profile.name} ({social.email.handle}) solely to respond to your inquiry. Your submitted details are not
              stored in a public database.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-medium text-ink">4. External Links</h2>
            <p>
              Project repository and demo links open external platforms such as GitHub, LinkedIn or Vercel under their
              own privacy policies.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
