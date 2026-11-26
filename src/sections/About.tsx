import { useRef } from 'react'
import { useSectionReveal } from '../animations/gsap'
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
              Engineering systems with{' '}
              <span className="font-serif italic font-normal text-accent-ink">design clarity</span>
            </>
          }
          aside={<p>{profile.education.institution} · {profile.education.university}</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial lead statement */}
          <div className="lg:col-span-6" data-reveal="">
            <p className="text-xl leading-snug tracking-tight text-ink sm:text-2xl md:text-[1.65rem]">
              {profile.about.statement}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">{profile.about.background}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{profile.about.approach}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink sm:text-base">{profile.about.direction}</p>
          </div>

          {/* Structured metadata grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6" data-reveal="">
            <div className="rounded-2xl border border-line bg-bg-2 p-6">
              <p className="eyebrow mb-3 text-accent-ink">Areas of Interest</p>
              <ul className="space-y-2 text-sm text-ink">
                {profile.interests.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-4">
              <div className="rounded-2xl border border-line bg-bg-2 p-6">
                <p className="eyebrow mb-3 text-accent-ink">Currently Exploring</p>
                <ul className="space-y-2 text-sm text-muted">
                  {profile.exploring.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                      <span className="text-ink">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-line bg-bg-2 p-6">
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
