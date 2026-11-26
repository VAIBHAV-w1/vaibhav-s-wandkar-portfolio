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
          aside={<p>Academic credentials and verified scores.</p>}
        />

        <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8" data-reveal="">
          {education.map((item) => (
            <li key={item.qualification} className="relative rounded-3xl border border-line bg-bg-2 p-6 sm:p-7">
              <span
                aria-hidden="true"
                className={`absolute -left-[31px] top-8 h-3 w-3 rounded-full border-2 border-bg sm:-left-[39px] ${
                  item.current ? 'bg-accent' : 'bg-line-strong'
                }`}
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="eyebrow text-accent-ink">{item.stage}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-line bg-surface px-3 py-0.5 font-mono text-[11px] text-ink">
                    {item.period}
                  </span>
                  <span className="rounded-full border border-line-strong bg-bg px-3 py-0.5 font-mono text-[11px] font-medium text-accent-ink">
                    {item.score}
                  </span>
                </div>
              </div>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-ink sm:text-2xl">{item.qualification}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.institution}
                {item.affiliation ? ` · ${item.affiliation}` : ''}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
