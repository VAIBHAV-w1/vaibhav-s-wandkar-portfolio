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
        duration: 0.72,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      })
    }, el)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section id="top" ref={heroRef} className="relative border-b border-line pt-8 pb-10 sm:pt-10 md:pt-12 md:pb-14">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div data-hero-in="" className="mb-5 flex items-center gap-3.5 sm:gap-4">
              <BrandLogo variant="full" size="xl" />
              <div className="min-w-0">
                <p className="eyebrow text-accent-ink">{profile.positioning}</p>
                <p className="mt-1 font-mono text-xs text-faint">{profile.location}</p>
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
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-on-accent transition hover:opacity-90"
                >
                  <span>View Projects</span>
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </Magnetic>

              <Magnetic reducedMotion={reducedMotion}>
                <button
                  type="button"
                  onClick={() => onScrollTo('#contact')}
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-line-strong bg-bg-2 px-6 text-sm font-medium text-ink transition hover:border-accent-ink hover:bg-surface"
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
            <PortraitFrame className="mx-auto max-w-[370px] lg:ml-auto lg:mr-0" />
          </div>
        </div>
      </div>
    </section>
  )
}
