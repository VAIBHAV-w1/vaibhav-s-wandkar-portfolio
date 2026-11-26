import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { gsap } from '../animations/gsap'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { Magnetic } from '../components/Magnetic'
import { profile } from '../data/profile'
import { social } from '../data/social'
import type { Theme } from '../hooks/useTheme'

const HeroScene = lazy(() => import('../components/HeroScene'))

interface Props {
  theme: Theme
  reducedMotion: boolean
  onScrollTo: (target: string) => void
}

export function Hero({ theme, reducedMotion, onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="top" ref={heroRef} className="relative overflow-hidden border-b border-line pt-12 pb-10 sm:pt-16 md:pt-20 md:pb-14">
      <div className="container-x">
        {/* Top metadata row */}
        <div data-hero-in="" className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-2.5">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="eyebrow text-muted">Python &amp; Django Developer · BIET, Davangere</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {profile.name.toUpperCase()}
          </p>
        </div>

        {/* Main 12-col split */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p data-hero-in="" className="eyebrow mb-4 text-accent-ink">
              {profile.positioning}
            </p>
            <h1
              data-hero-in=""
              className="text-[clamp(2.4rem,5.4vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            >
              Engineering{' '}
              <span className="font-serif italic font-normal text-accent-ink">intelligent</span>{' '}
              applications with Python and Django.
            </h1>

            <p data-hero-in="" className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            {/* CTAs */}
            <div data-hero-in="" className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic reducedMotion={reducedMotion}>
                <button
                  type="button"
                  onClick={() => onScrollTo('#work')}
                  data-cursor="View"
                  className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition hover:opacity-90"
                >
                  <span>Explore Projects</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </Magnetic>

              <Magnetic reducedMotion={reducedMotion}>
                <button
                  type="button"
                  onClick={() => onScrollTo('#contact')}
                  className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line-strong bg-bg-2 px-6 text-sm font-medium text-ink transition hover:border-accent-ink hover:bg-surface"
                >
                  <span>Contact Me</span>
                </button>
              </Magnetic>

              <div className="flex items-center gap-2 pl-1">
                <a
                  href={social.github.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:bg-surface hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:bg-surface hover:text-ink"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive 3D / geometric centerpiece */}
          <div data-hero-in="" className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-2 p-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
                <span>SYS // INTERACTIVE MESH</span>
                <span className="text-accent-ink">PY · DJANGO · SQL</span>
              </div>
              <ErrorBoundary
                fallback={
                  <div className="flex h-[280px] items-center justify-center text-muted">
                    <span className="font-mono text-xs">Interactive mesh unavailable</span>
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex h-[280px] items-center justify-center sm:h-[340px] lg:h-[420px]">
                      <div className="h-24 w-24 rounded-full border border-line-strong opacity-40" />
                    </div>
                  }
                >
                  <HeroScene theme={theme} reducedMotion={reducedMotion} />
                </Suspense>
              </ErrorBoundary>
              <div className="flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                <span>Move pointer to inspect</span>
                <button
                  type="button"
                  onClick={() => onScrollTo('#about')}
                  className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition hover:text-accent-ink"
                >
                  Scroll <ArrowUpRight className="h-3 w-3 rotate-90" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Role marquee */}
        <div className="marquee mt-12 overflow-hidden border-t border-line pt-6" aria-hidden="true">
          <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
            {[...profile.roles, ...profile.roles].map((role, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{role}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
