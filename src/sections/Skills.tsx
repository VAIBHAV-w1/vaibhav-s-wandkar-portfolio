import { useRef } from 'react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { skillGroups } from '../data/skills'

interface Props {
  reducedMotion: boolean
}

export function Skills({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  return (
    <section id="skills" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="03"
          kicker="Skills"
          title="Technical Skills"
          aside={<p>Technologies used across projects, coursework and internships.</p>}
        />

        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg-2" data-reveal="">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid items-baseline gap-3 px-5 py-4 sm:grid-cols-12 sm:gap-6 sm:px-7 sm:py-5"
            >
              <h3 className="eyebrow text-accent-ink sm:col-span-4 lg:col-span-3">{group.label}</h3>
              <div className="flex flex-wrap gap-2 sm:col-span-8 lg:col-span-9">
                {group.skills.map((skill) => (
                  <span
                    key={`${group.id}-${skill}`}
                    className="inline-flex items-center rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-medium text-ink"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
