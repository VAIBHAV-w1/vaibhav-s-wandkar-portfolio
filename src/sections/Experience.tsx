import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { achievements, experience } from '../data/experience'
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
              Hands-on{' '}
              <span className="font-serif italic font-normal text-accent-ink">practice</span>
            </>
          }
          aside={<p>Internships, technical training programs and hackathon milestones.</p>}
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Internships & Programs */}
          <div className="lg:col-span-7" data-reveal="">
            <h3 className="eyebrow mb-4 text-faint">Internships &amp; Programs</h3>
            <div className="divide-y divide-line border-y border-line">
              {experience.map((item) => {
                const related = item.relatedProject ? getProject(item.relatedProject) : undefined
                return (
                  <div key={`${item.role}-${item.org}`} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-lg font-medium text-ink">{item.role}</p>
                      <p className="text-sm text-muted">{item.org}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {item.period ? (
                        <span className="rounded-full border border-line bg-bg-2 px-3 py-1 font-mono text-[11px] text-accent-ink">
                          {item.period}
                        </span>
                      ) : item.kind ? (
                        <span className="rounded-full border border-line bg-bg-2 px-3 py-1 font-mono text-[11px] text-muted">
                          {item.kind}
                        </span>
                      ) : null}
                      {related ? (
                        <button
                          type="button"
                          onClick={() => onOpenProject(related)}
                          className="inline-flex min-h-[34px] items-center gap-1 rounded-full border border-line-strong px-3 text-xs text-ink transition hover:border-accent-ink"
                        >
                          <span>{related.title}</span>
                          <ArrowUpRight className="h-3 w-3 text-accent-ink" aria-hidden="true" />
                        </button>
                      ) : null}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Hackathons & Achievements */}
          <div className="lg:col-span-5" data-reveal="">
            <h3 className="eyebrow mb-4 text-faint">Hackathons &amp; Events</h3>
            <div className="space-y-4">
              {achievements.map((item) => (
                <div
                  key={item.event}
                  className="flex items-center justify-between rounded-2xl border border-line bg-bg-2 p-5"
                >
                  <p className="text-base font-medium text-ink">{item.event}</p>
                  <span className="rounded-full border border-line-strong bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink">
                    {item.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
