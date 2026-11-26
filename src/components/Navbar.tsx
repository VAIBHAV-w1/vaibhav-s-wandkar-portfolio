import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { navItems } from '../data/navigation'
import { profile } from '../data/profile'
import { social } from '../data/social'
import type { Theme } from '../hooks/useTheme'
import type { RoutePath } from '../hooks/useRouter'
import { BrandLogo } from './BrandLogo'
import { ThemeToggle } from './ThemeToggle'

interface Props {
  theme: Theme
  onToggleTheme: (origin?: { x: number; y: number }) => void
  activeSection: string
  route: RoutePath
  onNavigate: (route: RoutePath) => void
  onScrollTo: (target: string) => void
  onDrawerChange: (open: boolean) => void
}

export function Navbar({
  theme,
  onToggleTheme,
  activeSection,
  route,
  onNavigate,
  onScrollTo,
  onDrawerChange,
}: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuBtnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    onDrawerChange(open)
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onDrawerChange])

  const handleNavClick = (sectionId: string) => {
    setOpen(false)
    if (route !== '/') {
      onNavigate('/')
      window.setTimeout(() => onScrollTo(`#${sectionId}`), 60)
      return
    }
    onScrollTo(`#${sectionId}`)
  }

  const handleBrandClick = () => {
    setOpen(false)
    if (route !== '/') {
      onNavigate('/')
    } else {
      onScrollTo('#top')
    }
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? 'border-line bg-bg/95 backdrop-blur-sm' : 'border-transparent bg-bg/85'
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBrandClick}
            className="group inline-flex items-center gap-2.5 text-left"
            aria-label={`${profile.name} — back to top`}
          >
            <BrandLogo size="sm" />
            <span className="hidden text-sm font-medium tracking-tight text-ink sm:inline">{profile.name}</span>
          </button>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = route === '/' && activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs transition ${
                    isActive
                      ? 'bg-surface font-medium text-ink ring-1 ring-line-strong'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  <span className="font-mono text-[10px] text-accent-ink">{item.index}</span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href={social.github.href}
              target="_blank"
              rel="noreferrer noopener"
              className="hidden h-10 items-center gap-1.5 rounded-full border border-line px-3.5 text-xs font-medium text-ink transition hover:border-line-strong hover:bg-surface sm:inline-flex"
            >
              <span>GitHub</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-line-strong hover:bg-surface lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 flex flex-col justify-between overflow-y-auto bg-bg px-6 py-8 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-line border-y border-line">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className="flex min-h-[56px] items-center justify-between py-3 text-left text-2xl font-medium tracking-tight text-ink transition hover:text-accent-ink"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-accent-ink">{item.index}</span>
                </button>
              ))}
            </nav>

            <div className="mt-8 space-y-4 border-t border-line pt-6">
              <p className="eyebrow text-faint">Connect</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={social.github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-ink"
                >
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-ink"
                >
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={social.email.href}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line px-4 text-sm text-ink"
                >
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
