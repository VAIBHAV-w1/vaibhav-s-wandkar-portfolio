import { useEffect, useRef } from 'react'
import { ArrowDown, ArrowDownRight, Mail } from 'lucide-react'
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
        y: 20,
        opacity: 0,
        duration: 0.72,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
      gsap.from('[data-hero-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.8,
        delay: 0.25,
        ease: 'power3.out',
        clearProps: 'transform',
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="top" ref={heroRef} className="relative border-b border-line pt-8 pb-8 sm:pt-10 md:pt-12 md:pb-10">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div data-hero-in="" className="mb-5 flex items-center gap-3.5 sm:gap-4">
              <BrandLogo
                variant="full"
                size="xl"
                className="transition-transform duration-300 hover:scale-[1.03]"
              />
              <div className="min-w-0">
                <p className="eyebrow inline-flex items-center gap-2 text-accent-ink">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full bg-accent ${reducedMotion ? '' : 'pulse-dot'}`}
                  />
                  <span>{profile.positioning}</span>
                </p>
                <p className="mt-1 font-mono text-xs text-faint">{profile.location}</p>
                <span data-hero-line="" aria-hidden="true" className="mt-2 block h-px w-16 bg-accent/45" />
              </div>
            </div>

            <h1
              data-hero-in=""
              className="text-[clamp(2.25rem,4.8vw,4.1rem)] font-medium leading-[1.06] tracking-[-0.03em] text-ink"
            >
              {profile.greeting}
            </h1>

            <p data-hero-in="" className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            <div data-hero-in="" className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <Magnetic reducedMotion={reducedMotion}>
                <button
                  type="button"
                  onClick={() => onScrollTo('#work')}
                  data-cursor="View"
                  className="group inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition duration-200 hover:opacity-90 active:scale-[0.98]"
                >
                  <span>View Projects</span>
                  <ArrowDownRight
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>

              <Magnetic reducedMotion={reducedMotion}>
                <button
                  type="button"
                  onClick={() => onScrollTo('#contact')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-line-strong bg-bg-2 px-6 text-sm font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-accent-ink hover:bg-surface active:scale-[0.98]"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent-ink hover:bg-surface hover:text-ink active:scale-[0.96]"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a
                  href={social.linkedin.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent-ink hover:bg-surface hover:text-ink active:scale-[0.96]"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a
                  href={social.email.href}
                  aria-label="Send email"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition duration-200 hover:-translate-y-0.5 hover:border-accent-ink hover:bg-surface hover:text-ink active:scale-[0.96]"
                >
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div data-hero-in="" className="lg:col-span-5">
            <PortraitFrame className="mx-auto max-w-[370px] transition duration-300 hover:border-accent/45 lg:ml-auto lg:mr-0" />
          </div>
        </div>

        {/* Tasteful animated scroll indicator */}
        <div data-hero-in="" className="mt-7 flex items-center justify-between border-t border-line/60 pt-4">
          <button
            type="button"
            onClick={() => onScrollTo('#about')}
            className="group inline-flex items-center gap-2.5 text-xs text-muted transition hover:text-ink"
          >
            <span className="relative flex h-5 w-3.5 items-center justify-center overflow-hidden rounded-full border border-line-strong">
              <span
                aria-hidden="true"
                className={`h-1.5 w-0.5 rounded-full bg-accent ${reducedMotion ? '' : 'scroll-cue-line'}`}
              />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.14em]">Scroll to explore</span>
            <ArrowDown
              className="h-3 w-3 text-accent-ink transition-transform duration-200 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </button>
          <span className="hidden font-mono text-[11px] text-faint sm:inline">01 — 07</span>
        </div>
      </div>
    </section>
  )
}
