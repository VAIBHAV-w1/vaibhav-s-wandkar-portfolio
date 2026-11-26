import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight, Database, Server } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { getProject, type Project } from '../data/projects'
import { primaryBackendGroup, skillGroups, type Skill } from '../data/skills'

interface Props {
  reducedMotion: boolean
  onOpenProject: (project: Project) => void
}

export function Skills({ reducedMotion, onOpenProject }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [selected, setSelected] = useState<{ groupLabel: string; skill: Skill }>(() => ({
    groupLabel: primaryBackendGroup.label,
    skill: primaryBackendGroup.skills[1], // Django highlighted by default
  }))
  useSectionReveal(sectionRef, reducedMotion)

  const linkedProjects = useMemo(
    () => (selected.skill.usedIn ?? []).map((slug) => getProject(slug)).filter((p): p is Project => Boolean(p)),
    [selected],
  )

  const primaryLanguages = primaryBackendGroup.skills.filter((s) => s.featured)
  const primaryDatastores = primaryBackendGroup.skills.filter((s) => !s.featured)

  return (
    <section id="skills" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="03"
          kicker="Technical Stack"
          title={
            <>
              Centered on{' '}
              <span className="font-serif italic font-normal text-accent-ink">Python &amp; Django</span>
            </>
          }
          aside={<p>Select any technology to inspect its role and jump directly into the projects where it is used.</p>}
        />

        {/* Primary Backend Spotlight + Interactive Cross-Link Inspector */}
        <div
          className="mb-8 grid gap-6 rounded-3xl border border-line-strong bg-bg-2 p-6 sm:p-8 lg:grid-cols-12"
          data-reveal=""
        >
          <div className="flex flex-col justify-between gap-6 lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2.5">
                <span className="pulse-dot h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                <p className="eyebrow text-accent-ink">{primaryBackendGroup.label}</p>
              </div>

              {/* Hero Python & Django tiles */}
              <div className="grid gap-3 sm:grid-cols-2">
                {primaryLanguages.map((skill) => {
                  const isSelected = selected.skill.name === skill.name
                  const count = skill.usedIn?.length ?? 0
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelected({ groupLabel: primaryBackendGroup.label, skill })}
                      aria-pressed={isSelected}
                      className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition duration-200 ${
                        isSelected
                          ? 'border-accent bg-accent text-on-accent'
                          : 'border-line-strong bg-bg text-ink hover:-translate-y-0.5 hover:border-accent-ink'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] opacity-80">
                          <Server className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Core Stack</span>
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                            isSelected ? 'bg-on-accent/12 text-on-accent' : 'bg-surface text-muted'
                          }`}
                        >
                          {count} projects
                        </span>
                      </div>
                      <p className="mt-4 text-3xl font-medium tracking-tight">{skill.name}</p>
                    </button>
                  )
                })}
              </div>

              {/* SQL / SQLite / MySQL primary data layer */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                  <Database className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                  <span>Data Layer</span>
                </span>
                {primaryDatastores.map((skill) => {
                  const isSelected = selected.skill.name === skill.name
                  return (
                    <button
                      key={skill.name}
                      type="button"
                      onClick={() => setSelected({ groupLabel: primaryBackendGroup.label, skill })}
                      aria-pressed={isSelected}
                      className={`inline-flex min-h-[38px] items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition ${
                        isSelected
                          ? 'border-accent bg-accent text-on-accent'
                          : 'border-line bg-bg text-ink hover:-translate-y-0.5 hover:border-line-strong'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {skill.usedIn?.length ? (
                        <span className={`font-mono text-[10px] ${isSelected ? 'text-on-accent/80' : 'text-faint'}`}>
                          {skill.usedIn.length}
                        </span>
                      ) : null}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Active Skill Cross-Link Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-bg p-6 lg:col-span-5">
            <div>
              <p className="eyebrow text-accent-ink">{selected.groupLabel}</p>
              <h3 className="mt-2 text-2xl font-medium tracking-tight text-ink sm:text-3xl">{selected.skill.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {selected.skill.note ??
                  (linkedProjects.length > 0
                    ? `Applied across ${linkedProjects.length} ${linkedProjects.length === 1 ? 'project' : 'projects'} in this portfolio.`
                    : 'Part of my verified engineering toolkit.')}
              </p>
            </div>

            <div className="mt-6 border-t border-line pt-4">
              <p className="eyebrow mb-2.5 text-faint">
                {linkedProjects.length > 0 ? 'Inspect Related Projects' : 'Verification'}
              </p>
              <div className="flex flex-wrap gap-2">
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
                ) : (
                  <span className="font-mono text-xs text-muted">Core technical stack</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Grouped Skill Matrix */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal="">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="rounded-3xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
            >
              <h3 className="eyebrow mb-4 text-muted">{group.label}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => {
                  const isSelected = selected.skill.name === skill.name
                  const count = skill.usedIn?.length
                  return (
                    <button
                      key={`${group.id}-${skill.name}`}
                      type="button"
                      onClick={() => setSelected({ groupLabel: group.label, skill })}
                      aria-pressed={isSelected}
                      className={`inline-flex min-h-[36px] items-center gap-1.5 rounded-full border px-3 text-xs transition ${
                        isSelected
                          ? 'border-accent bg-accent font-medium text-on-accent'
                          : 'border-line bg-bg text-ink hover:-translate-y-0.5 hover:border-line-strong'
                      }`}
                    >
                      <span>{skill.name}</span>
                      {count ? (
                        <span className={`font-mono text-[10px] ${isSelected ? 'text-on-accent/75' : 'text-faint'}`}>
                          {count}
                        </span>
                      ) : null}
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
