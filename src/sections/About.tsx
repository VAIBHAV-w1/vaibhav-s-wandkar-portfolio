import { useRef } from 'react'
import { useSectionReveal } from '../animations/gsap'
import { BrandLogo } from '../components/BrandLogo'
import { SectionHeader } from '../components/SectionHeader'
import { profile } from '../data/profile'

interface Props {
  reducedMotion: boolean
}

export function About({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  return (
    <section id="about" ref={sectionRef} className="section-y">
      <div className="container-x">
        <SectionHeader
          index="01"
          kicker="About"
          title={
            <>
              Thoughtful systems,{' '}
              <span className="font-serif italic font-normal text-accent-ink">dependable code</span>
            </>
          }
          aside={<p>{profile.location} · Computer Science &amp; Design</p>}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Editorial narrative */}
          <div className="space-y-4 lg:col-span-6" data-reveal="">
            <p className="text-xl leading-snug tracking-tight text-ink sm:text-2xl md:text-[1.6rem]">
              {profile.about.statement}
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{profile.about.background}</p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{profile.about.approach}</p>
          </div>

          {/* Profile Ledger with Official VSW Brand Mark */}
          <div className="divide-y divide-line rounded-2xl border border-line bg-bg-2 px-6 lg:col-span-6" data-reveal="">
            <div className="flex items-center gap-4 py-5">
              <BrandLogo variant="full" size="md" />
              <div className="min-w-0">
                <p className="text-base font-medium text-ink">{profile.name}</p>
                <p className="eyebrow mt-0.5 text-accent-ink">Brand &amp; Engineering Focus</p>
              </div>
            </div>

            <div className="py-5">
              <p className="eyebrow mb-3 text-accent-ink">Areas of Interest</p>
              <ul className="grid gap-x-6 gap-y-2 text-sm text-ink sm:grid-cols-2">
                {profile.interests.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-5 py-5 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-2 text-accent-ink">Active Focus</p>
                <ul className="space-y-1.5 text-sm text-ink">
                  {profile.exploring.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="eyebrow mb-2 text-faint">Languages</p>
                <p className="text-sm font-medium text-ink">{profile.languages.join(' · ')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
