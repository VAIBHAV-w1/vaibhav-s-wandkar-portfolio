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
          title="Background & Focus"
          aside={<p>{profile.education.degree} · {profile.education.institution}</p>}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-5 lg:col-span-6" data-reveal="">
            <p className="text-base leading-relaxed text-ink sm:text-lg">{profile.about}</p>
            <div className="flex items-center gap-3.5 pt-1">
              <BrandLogo variant="full" size="md" />
              <div>
                <p className="text-sm font-medium text-ink">{profile.name}</p>
                <p className="text-xs text-muted">Languages: {profile.languages.join(' · ')}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-bg-2 p-6 lg:col-span-6" data-reveal="">
            <p className="eyebrow mb-4 text-accent-ink">Areas of Interest</p>
            <ul className="grid gap-x-6 gap-y-2.5 text-sm text-ink sm:grid-cols-2">
              {profile.interests.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
