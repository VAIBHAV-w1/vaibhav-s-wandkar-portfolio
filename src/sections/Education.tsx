import { useRef } from 'react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { education } from '../data/education'

interface Props {
  reducedMotion: boolean
}

export function Education({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  return (
    <section id="education" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="05"
          kicker="Education"
          title={
            <>
              Academic{' '}
              <span className="font-serif italic font-normal text-accent-ink">foundation</span>
            </>
          }
          aside={<p>Academic qualifications, institutions and study timelines.</p>}
        />

        <div className="grid gap-6 md:grid-cols-3" data-reveal="">
          {education.map((item) => (
            <article
              key={item.qualification}
              className="flex flex-col justify-between rounded-2xl border border-line bg-bg-2 p-6 transition hover:border-line-strong"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5">
                  <span className="eyebrow inline-flex items-center gap-2 text-accent-ink">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${item.current ? 'bg-accent' : 'bg-line-strong'}`}
                    />
                    {item.stage}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{item.period}</span>
                </div>

                <h3 className="mt-4 text-xl font-medium tracking-tight text-ink">{item.qualification}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.institution}</p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">{item.place}</span>
                {item.affiliation ? (
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink">
                    {item.affiliation}
                  </span>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
