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
          aside={<p>Verified internships, industry certifications, hackathons and project recognition.</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Internships Vertical Timeline */}
          <div className="lg:col-span-7" data-reveal="">
            <h3 className="eyebrow mb-5 text-faint">Internships</h3>
            <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-7">
              {experience.map((item, idx) => {
                const related = item.relatedProject ? getProject(item.relatedProject) : undefined
                return (
                  <li
                    key={`${item.role}-${item.org}-${item.period}`}
                    className="relative rounded-2xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-bg sm:-left-[35px] ${
                        idx === 0 ? 'bg-accent' : 'bg-line-strong'
                      }`}
                    />
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-ink sm:text-xl">{item.role}</h4>
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
                            className="inline-flex min-h-[32px] items-center gap-1 rounded-full border border-line-strong px-3 text-xs font-medium text-ink transition hover:border-accent-ink"
                          >
                            <span>{related.title}</span>
                            <ArrowUpRight className="h-3 w-3 text-accent-ink" aria-hidden="true" />
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-ink">{item.summary}</p>
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
