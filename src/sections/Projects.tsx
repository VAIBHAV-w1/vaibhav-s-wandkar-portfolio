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

function ProjectCard({ project, onOpenProject, featured = false }: { project: Project; onOpenProject: (p: Project) => void; featured?: boolean }) {
  return (
    <article
      data-reveal=""
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-2 transition duration-300 hover:border-line-strong"
    >
      <div className="relative aspect-video overflow-hidden border-b border-line bg-surface">
        {project.image ? (
          <img
            src={project.image.src}
            srcSet={project.image.srcSet}
            sizes={featured ? '(max-width: 1024px) 100vw, 48vw' : '(max-width: 768px) 100vw, 33vw'}
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
        <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-line bg-bg/85 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted backdrop-blur-xs">
          {project.visualType === 'screenshot' ? 'UI Screenshot' : 'Architecture Illustration'}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-accent-ink">
              {project.index} · {project.category}
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.period ? (
                <span className="font-mono text-[10px] text-faint">{project.period}</span>
              ) : null}
              <span className="rounded-full border border-line bg-bg/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                {project.status}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-medium tracking-tight text-ink sm:text-2xl">
            {project.title}
            {project.alias ? <span className="ml-2 font-serif italic font-normal text-muted">/ {project.alias}</span> : null}
          </h3>
          <p className="mt-1 font-mono text-[11px] text-faint">{project.ownership}</p>
          <p className="mt-2.5 text-sm leading-relaxed text-muted">{project.summary}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, featured ? 7 : 5).map((tech) => (
              <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] text-muted">
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
                rel="noopener noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-xs font-medium text-ink transition hover:border-accent-ink"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
              </a>
            ) : null}
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} GitHub repository`}
            className="inline-flex min-h-[40px] items-center gap-1.5 text-xs text-muted transition hover:text-ink"
          >
            <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
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

  // Preserve exact 01 -> 08 sequence in every view
  const lead = filter === 'all' ? filtered[0] : undefined // 01 DeepVision
  const pairOne = filter === 'all' ? filtered.slice(1, 3) : [] // 02 CyberShield, 03 Cropify
  const pairTwo = filter === 'all' ? filtered.slice(3, 5) : [] // 04 Decentralized Voting, 05 Retino
  const triad = filter === 'all' ? filtered.slice(5, 8) : filtered // 06 Lost & Found, 07 Resume Screening, 08 Hospital Management

  return (
    <section id="work" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="02"
          kicker="Selected Work"
          title={
            <>
              Eight verified{' '}
              <span className="font-serif italic font-normal text-accent-ink">engineering builds</span>
            </>
          }
          aside={
            <p>
              Ordered 01 through 08 across AI surveillance, cybersecurity, agricultural ML, blockchain voting,
              medical imaging, Django portals and NLP. Every stack and link is verified against its repository.
            </p>
          }
        />

        {/* Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-7 flex flex-wrap items-center gap-2"
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

        {/* 01 — Flagship Full-Width Showcase (DeepVision) */}
        {lead ? (
          <article
            data-reveal=""
            className="group mb-6 overflow-hidden rounded-2xl border border-line bg-bg-2 transition duration-300 hover:border-line-strong"
          >
            <div className="grid lg:grid-cols-12">
              <div className="relative overflow-hidden border-b border-line bg-surface lg:col-span-7 lg:border-r lg:border-b-0">
                {lead.image ? (
                  <img
                    src={lead.image.src}
                    srcSet={lead.image.srcSet}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    width={lead.image.width}
                    height={lead.image.height}
                    alt={lead.image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <ProjectArt variant={lead.art} />
                )}
                <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-line bg-bg/85 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted backdrop-blur-xs">
                  UI Screenshot
                </span>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5">
                <div>
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs text-accent-ink">
                      {lead.index} · {lead.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {lead.period ? <span className="font-mono text-[10px] text-faint">{lead.period}</span> : null}
                      <span className="rounded-full border border-line bg-bg/70 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                        {lead.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">{lead.title}</h3>
                  <p className="mt-1 font-mono text-[11px] text-faint">{lead.ownership}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">{lead.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {lead.stack.slice(0, 9).map((tech) => (
                      <span key={tech} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                  <button
                    type="button"
                    onClick={() => onOpenProject(lead)}
                    data-cursor="Open"
                    className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-ink px-4 text-xs font-semibold text-bg transition hover:bg-accent hover:text-on-accent"
                  >
                    <span>Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  {lead.demo ? (
                    <a
                      href={lead.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-line-strong px-4 text-xs font-medium text-ink transition hover:border-accent-ink"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-accent-ink" aria-hidden="true" />
                    </a>
                  ) : null}
                  <a
                    href={lead.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${lead.title} GitHub repository`}
                    className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-full border border-line text-muted transition hover:border-line-strong hover:text-ink"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ) : null}

        {/* 02 & 03 */}
        {pairOne.length > 0 ? (
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            {pairOne.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpenProject={onOpenProject} featured />
            ))}
          </div>
        ) : null}

        {/* 04 & 05 */}
        {pairTwo.length > 0 ? (
          <div className="mb-6 grid gap-6 md:grid-cols-2">
            {pairTwo.map((project) => (
              <ProjectCard key={project.slug} project={project} onOpenProject={onOpenProject} featured />
            ))}
          </div>
        ) : null}

        {/* 06, 07, 08 (or all matching filtered results in strict 01->08 order) */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {triad.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpenProject={onOpenProject} />
          ))}
        </div>

        {/* Additional verified GitHub repositories */}
        <div className="mt-9 rounded-2xl border border-line bg-bg-2 p-5 sm:p-6" data-reveal="">
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
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-xl border border-line bg-bg p-4 transition hover:border-line-strong"
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
