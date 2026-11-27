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
          scrolled ? 'border-line bg-bg/95 backdrop-blur-sm shadow-xs' : 'border-line/50 bg-bg/90'
        }`}
      >
        <div className="container-x flex h-[74px] items-center justify-between gap-3 md:h-20">
          <button
            type="button"
            onClick={handleBrandClick}
            className="group inline-flex shrink-0 items-center gap-2.5 text-left transition-transform duration-200 active:scale-[0.98] xl:gap-3"
            aria-label={`${profile.name} — back to top`}
          >
            <BrandLogo variant="compact" />
            <span className="hidden text-[15px] font-semibold tracking-tight text-ink transition-colors duration-200 group-hover:text-accent-ink sm:inline lg:hidden xl:inline xl:text-base">
              {profile.name}
            </span>
          </button>

          <nav aria-label="Primary navigation" className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {navItems.map((item) => {
              const isActive = route === '/' && activeSection === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium transition-colors duration-200 xl:px-3.5 xl:text-sm ${
                    isActive ? 'text-ink' : 'text-ink/75 hover:text-ink'
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-full bg-surface ring-1 ring-line-strong"
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="relative z-10 font-mono text-[10px] font-semibold text-accent-ink xl:text-[11px]">
                    {item.index}
                  </span>
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <a
              href={social.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-10 items-center gap-1.5 whitespace-nowrap rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition duration-200 hover:border-accent-ink hover:bg-surface active:scale-[0.98] sm:inline-flex"
            >
              <span>GitHub</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-accent-ink transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition duration-200 hover:border-accent-ink hover:bg-surface active:scale-[0.96] lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-[74px] z-40 flex flex-col justify-between overflow-y-auto bg-bg px-6 py-8 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-line border-y border-line">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.22, delay: idx * 0.03, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => handleNavClick(item.id)}
                  className="flex min-h-[54px] items-center justify-between py-3 text-left text-2xl font-medium tracking-tight text-ink transition-colors duration-200 hover:text-accent-ink"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-sm font-semibold text-accent-ink">{item.index}</span>
                </motion.button>
              ))}
            </nav>

            <div className="mt-8 space-y-4 border-t border-line pt-6">
              <p className="eyebrow text-faint">Connect</p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={social.github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-accent-ink"
                >
                  GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-accent-ink"
                >
                  LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={social.email.href}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-ink transition hover:border-accent-ink"
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
