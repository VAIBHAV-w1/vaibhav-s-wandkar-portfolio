import { useRef } from 'react'
import { ArrowUpRight, Award, Trophy } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { achievements, certifications, experience } from '../data/experience'
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
          kicker="Experience & Recognition"
          title={
            <>
              Internships, certifications &amp;{' '}
              <span className="font-serif italic font-normal text-accent-ink">milestones</span>
            </>
          }
          aside={<p>Verified industry internships, technical certifications, hackathons and engineering achievements.</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Internships */}
          <div className="lg:col-span-7" data-reveal="">
            <h3 className="eyebrow mb-4 text-faint">Internships</h3>
            <div className="divide-y divide-line border-y border-line">
              {experience.map((item) => {
                const related = item.relatedProject ? getProject(item.relatedProject) : undefined
                return (
                  <article key={`${item.role}-${item.org}-${item.period}`} className="py-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-ink sm:text-xl">{item.role}</h4>
                        <p className="text-sm font-medium text-muted">{item.org}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-line bg-bg-2 px-3 py-1 font-mono text-[11px] text-accent-ink">
                          {item.period}
                        </span>
                        {related ? (
                          <button
                            type="button"
                            onClick={() => onOpenProject(related)}
                            className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-line-strong px-3 text-xs font-medium text-ink transition hover:border-accent-ink"
                          >
                            <span>{related.title}</span>
                            <ArrowUpRight className="h-3 w-3 text-accent-ink" aria-hidden="true" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                      {item.highlights.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Hackathons, Achievements & Certifications */}
          <div className="space-y-8 lg:col-span-5" data-reveal="">
            <div>
              <h3 className="eyebrow mb-4 flex items-center gap-2 text-faint">
                <Trophy className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                <span>Hackathons &amp; Achievements</span>
              </h3>
              <div className="space-y-3">
                {achievements.map((item) => (
                  <div
                    key={`${item.event}-${item.year}`}
                    className="flex flex-col justify-between gap-2 rounded-2xl border border-line bg-bg-2 p-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <p className="text-sm font-medium text-ink sm:text-base">{item.event}</p>
                      <p className="text-xs text-muted">{item.result}</p>
                    </div>
                    <span className="self-start rounded-full border border-line-strong bg-surface px-2.5 py-0.5 font-mono text-[11px] text-accent-ink sm:self-center">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="eyebrow mb-4 flex items-center gap-2 text-faint">
                <Award className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                <span>Certifications</span>
              </h3>
              <div className="divide-y divide-line rounded-2xl border border-line bg-bg-2 px-5">
                {certifications.map((cert) => (
                  <div key={`${cert.title}-${cert.issuer}`} className="flex items-center justify-between gap-3 py-4">
                    <div>
                      <p className="text-sm font-medium text-ink">{cert.title}</p>
                      <p className="text-xs text-muted">{cert.issuer}</p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-faint">{cert.year}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
