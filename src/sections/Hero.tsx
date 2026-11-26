import { useEffect, useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { gsap } from '../animations/gsap'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
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
    <section id="top" ref={heroRef} className="relative overflow-hidden border-b border-line pt-10 pb-10 sm:pt-14 md:pt-16 md:pb-14">
      <div className="container-x relative">
        {/* Top metadata row */}
        <div data-hero-in="" className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <div className="flex items-center gap-2.5">
            <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="eyebrow text-muted">Python &amp; Django Full-Stack Developer · BIET, Davangere</span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
            {profile.location}
          </p>
        </div>

        {/* Main 12-col split: dedicated unobstructed portrait on the right */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p data-hero-in="" className="eyebrow mb-4 text-accent-ink">
              {profile.positioning}
            </p>
            <h1
              data-hero-in=""
              className="text-[clamp(2.35rem,5.2vw,4.55rem)] font-medium leading-[1.02] tracking-[-0.035em] text-ink"
            >
              Building{' '}
              <span className="font-serif italic font-normal text-accent-ink">intelligent</span>{' '}
              digital experiences with Python and Django.
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

          <div data-hero-in="" className="lg:col-span-5">
            <PortraitFrame className="mx-auto max-w-[390px] lg:ml-auto lg:mr-0" />
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
