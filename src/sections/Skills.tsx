import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { getProject, type Project } from '../data/projects'
import { skillGroups, type Skill } from '../data/skills'

interface Props {
  reducedMotion: boolean
  onOpenProject: (project: Project) => void
}

export function Skills({ reducedMotion, onOpenProject }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [selected, setSelected] = useState<{ groupLabel: string; skill: Skill }>(() => ({
    groupLabel: skillGroups[0].label,
    skill: skillGroups[0].skills[0],
  }))
  useSectionReveal(sectionRef, reducedMotion)

  const linkedProjects = useMemo(
    () => (selected.skill.usedIn ?? []).map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p)),
    [selected],
  )

  return (
    <section id="skills" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="03"
          kicker="Capabilities"
          title={
            <>
              Technical <span className="font-serif italic font-normal text-accent-ink">stack</span>
            </>
          }
          aside={<p>Select any skill to inspect where it appears across repositories and projects.</p>}
        />

        {/* Selected skill spotlight */}
        <div
          className="mb-10 flex flex-col justify-between gap-4 rounded-3xl border border-line bg-bg-2 p-6 sm:flex-row sm:items-center sm:p-7"
          data-reveal=""
        >
          <div>
            <p className="eyebrow text-accent-ink">{selected.groupLabel}</p>
            <h3 className="mt-1 text-2xl font-medium tracking-tight text-ink">{selected.skill.name}</h3>
            {selected.skill.note ? <p className="mt-1.5 text-sm text-muted">{selected.skill.note}</p> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {linkedProjects.length > 0 ? (
              linkedProjects.map((proj) => (
                <button
                  key={proj.slug}
                  type="button"
                  onClick={() => onOpenProject(proj)}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full border border-line-strong bg-surface px-3.5 text-xs font-medium text-ink transition hover:border-accent-ink"
                >
                  <span>{proj.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                </button>
              ))
            ) : !selected.skill.note ? (
              <span className="font-mono text-xs text-faint">Core technical stack</span>
            ) : null}
          </div>
        </div>

        {/* Grouped skill matrix */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal="">
          {skillGroups.map((group) => (
            <div key={group.id} className="rounded-3xl border border-line bg-bg-2 p-6">
              <h3 className="eyebrow mb-4 text-muted">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isSelected = selected.skill.name === skill.name
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelected({ groupLabel: group.label, skill })}
                      aria-pressed={isSelected}
                      className={`inline-flex min-h-[36px] items-center rounded-full border px-3 text-xs transition ${
                        isSelected
                          ? 'border-accent bg-accent font-medium text-on-accent'
                          : 'border-line bg-bg text-ink hover:border-line-strong'
                      }`}
                    >
                      {skill.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
