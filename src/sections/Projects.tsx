import { useMemo, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { GithubIcon } from '../components/BrandIcons'
import { ProjectArt } from '../components/ProjectArt'
import { SectionHeader } from '../components/SectionHeader'
import { otherRepos, projectFilters, projects, type FilterId, type Project } from '../data/projects'

interface Props {
  reducedMotion: boolean
  onOpenProject: (project: Project) => void
}

function StatusBadge({ status }: { status?: Project['status'] }) {
  if (!status) return null
  return (
    <span className="rounded-full border border-line bg-bg/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
      {status}
    </span>
  )
}

export function Projects({ reducedMotion, onOpenProject }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [filter, setFilter] = useState<'all' | FilterId>('all')
  useSectionReveal(sectionRef, reducedMotion)

  const filtered = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.filters.includes(filter))),
    [filter],
  )

  const featuredList = filter === 'all' ? filtered.filter((p) => p.featured) : []
  const rest = filter === 'all' ? filtered.filter((p) => !p.featured) : filtered

  return (
    <section id="work" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="02"
          kicker="Selected Work"
          title={
            <>
              Backend architectures &amp;{' '}
              <span className="font-serif italic font-normal text-accent-ink">full-stack systems</span>
            </>
          }
          aside={
            <p>
              Ordered to highlight Python, Django and backend database applications first. Repository and live demo
              links are verified against GitHub.
            </p>
          }
        />

        {/* Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap items-center gap-2"
          data-reveal=""
        >
          {projectFilters.map((tab) => {
            const active = filter === tab.id
            const count =
              tab.id === 'all' ? projects.length : projects.filter((p) => p.filters.includes(tab.id as FilterId)).length
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-xs font-medium transition ${
                  active
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-line bg-bg-2 text-muted hover:border-line-strong hover:text-ink'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`font-mono text-[10px] ${active ? 'text-on-accent/80' : 'text-faint'}`}>{count}</span>
              </button>
            )
          })}
        </div>

        {/* Prioritized Featured Backend & Django Showcase (01 - 04) */}
        {featuredList.length > 0 ? (
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            {featuredList.map((project) => (
              <article
                key={project.slug}
                data-reveal=""
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-bg-2 transition hover:border-line-strong"
              >
                <div className="relative aspect-video overflow-hidden border-b border-line bg-surface">
                  {project.image ? (
                    <img
                      src={project.image.src}
                      srcSet={project.image.srcSet}
                      sizes="(max-width: 768px) 100vw, 48vw"
                      width={project.image.width}
                      height={project.image.height}
                      alt={project.image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6 text-ink">
                      <ProjectArt variant={project.art} />
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs text-accent-ink">
                        {project.index} · {project.category}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
                      {project.title}
                      {project.alias ? <span className="ml-2 font-serif italic font-normal text-muted">/ {project.alias}</span> : null}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 6).map((tech) => (
                        <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onOpenProject(project)}
                        data-cursor="Open"
                        className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-surface px-4 text-xs font-medium text-ink ring-1 ring-line transition hover:bg-accent hover:text-on-accent hover:ring-accent"
                      >
                        <span>Case Study</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                      {project.demo ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-xs font-medium text-ink transition hover:border-accent-ink"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex min-h-[40px] items-center gap-1.5 text-xs text-muted transition hover:text-ink"
                      >
                        <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>GitHub</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {/* Remaining / Filtered projects */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col justify-between rounded-3xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-accent-ink">{project.index}</span>
                  <StatusBadge status={project.status} />
                </div>

                <div className="mb-5 flex h-36 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface p-4 text-ink">
                  {project.image ? (
                    <img
                      src={project.image.src}
                      srcSet={project.image.srcSet}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      width={project.image.width}
                      height={project.image.height}
                      alt={project.image.alt}
                      loading="lazy"
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    <ProjectArt variant={project.art} />
                  )}
                </div>

                <p className="eyebrow mb-1.5 text-faint">{project.category}</p>
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {project.title}
                  {project.alias ? <span className="ml-1.5 font-serif italic font-normal text-muted">/ {project.alias}</span> : null}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-muted">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-2 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  data-cursor="Open"
                  className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-ink transition hover:text-accent-ink"
                >
                  <span>Inspect Project</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <div className="flex items-center gap-3">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-ink hover:underline"
                    >
                      Demo
                    </a>
                  ) : null}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${project.title} GitHub repository`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-faint">Local / Docs</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Additional verified GitHub repositories */}
        <div className="mt-12 rounded-3xl border border-line bg-bg-2 p-6 sm:p-8" data-reveal="">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow text-accent-ink">More on GitHub</p>
              <h3 className="mt-1 text-lg font-medium text-ink">Practice &amp; coursework repositories</h3>
            </div>
            <span className="font-mono text-xs text-faint">github.com/VAIBHAV-w1</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {otherRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex flex-col justify-between rounded-2xl border border-line bg-bg p-4 transition hover:border-line-strong"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-medium text-ink group-hover:text-accent-ink">{repo.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted" aria-hidden="true" />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{repo.note}</p>
                </div>
                <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{repo.language}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
