import { useEffect, useRef } from 'react'
import { ArrowDownRight, Mail } from 'lucide-react'
import { gsap } from '../animations/gsap'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { BrandLogo } from '../components/BrandLogo'
import { Magnetic } from '../components/Magnetic'
import { PortraitFrame } from '../components/PortraitFrame'
import { profile } from '../data/profile'
import { social } from '../data/social'

interface Props {
  reducedMotion: boolean
  onScrollTo: (target: string) => void
}

export function Hero({ reducedMotion, onScrollTo }: Props) {
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el || reducedMotion) return

    const ctx = gsap.context(() => {
      gsap.from('[data-hero-in]', {
        y: 22,
        opacity: 0,
        duration: 0.78,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="top" ref={heroRef} className="relative border-b border-line pt-7 pb-10 sm:pt-9 md:pt-11 md:pb-12">
      <div className="container-x">
        {/* Top identity bar */}
        <div data-hero-in="" className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="eyebrow text-muted">
              {profile.initials} · Open to Internships &amp; Engineering Roles
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {profile.location}
          </p>
        </div>

        {/* Editorial split: Left brand lockup + copy & CTAs, Right dedicated portrait */}
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {/* Official VSW logo presentation lockup */}
            <div data-hero-in="" className="mb-5 flex items-center gap-3.5 sm:gap-4">
              <BrandLogo variant="full" size="xl" />
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-tight text-ink sm:text-base">{profile.name}</p>
                <p className="eyebrow mt-1 text-accent-ink">{profile.positioning}</p>
              </div>
            </div>

            <h1
              data-hero-in=""
              className="text-[clamp(2.3rem,5vw,4.35rem)] font-medium leading-[1.04] tracking-[-0.035em] text-ink"
            >
              Building{' '}
              <span className="font-serif italic font-normal text-accent-ink">intelligent</span>{' '}
              applications through thoughtful engineering.
            </h1>

            <p data-hero-in="" className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            {/* Primary CTAs + Verified social links */}
            <div data-hero-in="" className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
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
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:bg-surface hover:text-ink"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:bg-surface hover:text-ink"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={social.email.href}
                  aria-label="Send email"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:bg-surface hover:text-ink"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div data-hero-in="" className="lg:col-span-5">
            <PortraitFrame className="mx-auto max-w-[380px] lg:ml-auto lg:mr-0" />
          </div>
        </div>

        {/* 4-column Engineering Focus Bar */}
        <div data-hero-in="" className="mt-10 grid divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {profile.focusAreas.map((area, idx) => (
            <div
              key={area.index}
              className={`pt-4 pb-2.5 sm:py-4 ${idx > 0 ? 'lg:border-l lg:border-line lg:pl-6' : ''} ${
                idx % 2 === 1 ? 'sm:border-l sm:border-line sm:pl-6 lg:pl-6' : 'sm:pr-6'
              }`}
            >
              <p className="font-mono text-[11px] font-semibold text-accent-ink">{area.index}</p>
              <p className="mt-1 text-sm font-medium text-ink">{area.label}</p>
              <p className="mt-0.5 text-xs text-muted">{area.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
