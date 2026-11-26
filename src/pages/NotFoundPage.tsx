import { ArrowLeft } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'
import type { RoutePath } from '../hooks/useRouter'

interface Props {
  onNavigate: (route: RoutePath) => void
}

export function NotFoundPage({ onNavigate }: Props) {
  return (
    <section className="section-y">
      <div className="container-x max-w-2xl">
        <div className="rounded-3xl border border-line bg-bg-2 p-8 sm:p-12">
          <div className="mb-6 flex items-center gap-3">
            <BrandLogo size="md" />
            <span className="eyebrow text-accent-ink">HTTP 404 · Route Not Found</span>
          </div>
          <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Page not <span className="font-serif italic font-normal text-accent-ink">found</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            The address you requested does not match a page on this portfolio. Return to the main showcase to explore
            projects, technical skills and contact details.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 text-xs font-semibold text-on-accent transition hover:opacity-90"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Return Home</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-5 text-xs font-medium text-ink transition hover:border-accent-ink"
            >
              Privacy Disclosure
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
