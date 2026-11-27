import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { experience } from '../data/experience'
import { getProject, type Project } from '../data/projects'

interface Props {
  reducedMotion: boolean
  onOpenProject: (project: Project) => void
}

export function Experience({ reducedMotion, onOpenProject }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  return (
    <section id="experience" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="04"
          kicker="Experience"
          title="Internships"
          aside={<p>Four completed internships across mobile UI, cloud setup, AI and web security.</p>}
        />

        <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-7">
          {experience.map((item, idx) => {
            const related = item.relatedProject ? getProject(item.relatedProject) : undefined
            return (
              <li
                key={`${item.role}-${item.org}-${item.period}`}
                data-reveal=""
                className="group relative rounded-2xl border border-line bg-bg-2 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -left-[30px] top-6 h-3 w-3 rounded-full border-2 border-bg transition-colors duration-200 group-hover:bg-accent sm:-left-[34px] ${
                    idx === 0 ? 'bg-accent' : 'bg-line-strong'
                  }`}
                />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-ink sm:text-xl">{item.role}</h3>
                    <p className="text-sm font-medium text-muted">{item.org}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-line bg-bg px-3 py-1 font-mono text-[11px] text-accent-ink">
                      {item.period}
                    </span>
                    {related ? (
                      <button
                        type="button"
                        onClick={() => onOpenProject(related)}
                        className="group/btn inline-flex min-h-[32px] items-center gap-1 rounded-full border border-line-strong px-3 text-xs font-medium text-ink transition duration-200 hover:border-accent-ink active:scale-[0.97]"
                      >
                        <span>{related.title}</span>
                        <ArrowUpRight
                          className="h-3 w-3 text-accent-ink transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </button>
                    ) : null}
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                  {item.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
