import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { social } from '../data/social'
import type { RoutePath } from '../hooks/useRouter'

interface Props {
  route: RoutePath
  onNavigate: (route: RoutePath) => void
  onScrollTo: (target: string) => void
}

export function Footer({ route, onNavigate, onScrollTo }: Props) {
  const year = new Date().getFullYear()

  const handleLink = (id: string) => {
    if (route !== '/') {
      onNavigate('/')
      window.setTimeout(() => onScrollTo(`#${id}`), 60)
      return
    }
    onScrollTo(`#${id}`)
  }

  return (
    <footer className="border-t border-line bg-bg-2 py-9">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="group flex items-center gap-3.5">
            <BrandLogo variant="full" size="md" />
            <div>
              <p className="text-sm font-medium text-ink">{profile.name}</p>
              <p className="text-xs text-muted">Python &amp; Django Full-Stack Developer · Hubli, India</p>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLink(item.id)}
                className="min-h-[36px] transition hover:text-ink"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => onNavigate('/privacy')}
              className="min-h-[36px] transition hover:text-ink"
            >
              Privacy
            </button>
          </nav>

          <button
            type="button"
            onClick={() => onScrollTo('#top')}
            aria-label="Back to top"
            className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition hover:border-accent-ink md:self-auto"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 border-t border-line pt-5 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href={social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              GitHub <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a
              href={social.linkedin.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-ink"
            >
              LinkedIn <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
            <a href={social.email.href} className="hover:text-ink">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
