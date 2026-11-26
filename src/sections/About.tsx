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
              Thoughtful systems,{' '}
              <span className="font-serif italic font-normal text-accent-ink">dependable code</span>
            </>
          }
          aside={<p>{profile.education.institution} · {profile.education.university}</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Editorial narrative */}
          <div className="space-y-5 lg:col-span-6" data-reveal="">
            <p className="text-xl leading-snug tracking-tight text-ink sm:text-2xl md:text-[1.65rem]">
              {profile.about.statement}
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{profile.about.background}</p>
            <p className="text-sm leading-relaxed text-muted sm:text-base">{profile.about.approach}</p>
          </div>

          {/* Profile Ledger */}
          <div className="divide-y divide-line rounded-2xl border border-line bg-bg-2 px-6 lg:col-span-6" data-reveal="">
            <div className="py-6">
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

            <div className="grid gap-6 py-6 sm:grid-cols-2">
              <div>
                <p className="eyebrow mb-2.5 text-accent-ink">Currently Exploring</p>
                <ul className="space-y-1.5 text-sm text-muted">
                  {profile.exploring.map((item) => (
                    <li key={item} className="text-ink">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="eyebrow mb-1.5 text-faint">Languages</p>
                  <p className="text-sm font-medium text-ink">{profile.languages.join(' · ')}</p>
                </div>
                <div>
                  <p className="eyebrow mb-1.5 text-faint">Current Degree</p>
                  <p className="text-sm font-medium text-ink">{profile.education.degree}</p>
                  <p className="font-mono text-xs text-accent-ink">{profile.education.period} · {profile.education.score}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
