import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { projects, type Project } from '../data/projects'
import { GithubIcon } from './BrandIcons'
import { ProjectArt } from './ProjectArt'

interface Props {
  project: Project | null
  onClose: () => void
  onSelect: (project: Project) => void
  onModalChange: (open: boolean) => void
}

export function ProjectModal({ project, onClose, onSelect, onModalChange }: Props) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const open = Boolean(project)
    onModalChange(open)
    if (!open) return

    scrollAreaRef.current?.scrollTo({ top: 0 })
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight' && project) {
        const idx = projects.findIndex((p) => p.slug === project.slug)
        if (idx >= 0) onSelect(projects[(idx + 1) % projects.length])
      } else if (e.key === 'ArrowLeft' && project) {
        const idx = projects.findIndex((p) => p.slug === project.slug)
        if (idx >= 0) onSelect(projects[(idx - 1 + projects.length) % projects.length])
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose, onSelect, onModalChange])

  const currentIdx = project ? projects.findIndex((p) => p.slug === project.slug) : -1
  const prevProject = currentIdx >= 0 ? projects[(currentIdx - 1 + projects.length) % projects.length] : null
  const nextProject = currentIdx >= 0 ? projects[(currentIdx + 1) % projects.length] : null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        >
          <motion.div
            key={project.slug}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            ref={scrollAreaRef}
            className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border border-line-strong bg-bg text-ink shadow-2xl sm:rounded-3xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-bg/95 px-6 py-4 backdrop-blur-sm sm:px-7">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs text-accent-ink">{project.index}</span>
                <span aria-hidden="true" className="text-faint">/</span>
                <span className="eyebrow text-muted">{project.category}</span>
                <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                  {project.status}
                </span>
                {project.period ? <span className="font-mono text-[11px] text-faint">{project.period}</span> : null}
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition hover:border-line-strong hover:bg-surface"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6 p-5 sm:p-7">
              <div>
                <h2 id="modal-project-title" className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">
                  {project.title}
                  {project.alias ? <span className="ml-2 font-serif italic font-normal text-muted">/ {project.alias}</span> : null}
                </h2>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.14em] text-accent-ink">{project.ownership}</p>
              </div>

              {project.image ? (
                <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <img
                    src={project.image.src}
                    srcSet={project.image.srcSet}
                    sizes="(max-width: 768px) 100vw, 840px"
                    width={project.image.width}
                    height={project.image.height}
                    alt={project.image.alt}
                    className="aspect-video w-full object-cover"
                  />
                  <figcaption className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
                    {project.image.caption}
                  </figcaption>
                </figure>
              ) : (
                <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
                  <div className="flex h-40 items-center justify-center p-5 text-ink">
                    <ProjectArt variant={project.art} className="h-full max-h-32 w-auto" />
                  </div>
                  <figcaption className="border-t border-line px-4 py-2 font-mono text-[11px] text-muted">
                    Architecture illustration — {project.title} overview.
                  </figcaption>
                </figure>
              )}

              <div className="flex flex-wrap items-center gap-3">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-accent px-5 text-sm font-medium text-on-accent transition hover:opacity-90"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                ) : null}
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-ink transition hover:border-accent-ink hover:bg-surface"
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  <span>View Repository</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
                </a>
                {project.linkNote ? <p className="text-xs text-muted">{project.linkNote}</p> : null}
              </div>

              <div className="grid gap-6 md:grid-cols-12">
                <div className="space-y-4 md:col-span-6">
                  <div className="rounded-2xl border border-line bg-bg-2 p-5">
                    <h3 className="eyebrow mb-2 text-accent-ink">Problem Addressed</h3>
                    <p className="text-sm leading-relaxed text-ink">{project.problem}</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-bg-2 p-5">
                    <h3 className="eyebrow mb-2 text-accent-ink">Contribution</h3>
                    <p className="text-sm leading-relaxed text-muted">{project.contribution}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-line bg-surface p-5 md:col-span-6">
                  <h3 className="eyebrow mb-3 text-accent-ink">What Was Implemented</h3>
                  <ul className="space-y-2.5 text-sm leading-relaxed text-ink">
                    {project.implemented.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-line pt-5">
                <p className="eyebrow mb-3 text-faint">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs text-ink"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {prevProject && nextProject ? (
                <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
                  <button
                    type="button"
                    onClick={() => onSelect(prevProject)}
                    className="group inline-flex min-h-[42px] items-center gap-2 text-left text-sm text-muted transition hover:text-ink"
                  >
                    <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                    <span className="max-w-[160px] truncate sm:max-w-xs">
                      {prevProject.index} · {prevProject.title}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelect(nextProject)}
                    className="group inline-flex min-h-[42px] items-center gap-2 text-right text-sm text-muted transition hover:text-ink"
                  >
                    <span className="max-w-[160px] truncate sm:max-w-xs">
                      {nextProject.index} · {nextProject.title}
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
