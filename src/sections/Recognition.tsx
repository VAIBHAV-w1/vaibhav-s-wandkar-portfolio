import { useRef } from 'react'
import { Award, Trophy } from 'lucide-react'
import { useSectionReveal } from '../animations/gsap'
import { SectionHeader } from '../components/SectionHeader'
import { achievements, certifications } from '../data/experience'

interface Props {
  reducedMotion: boolean
}

export function Recognition({ reducedMotion }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null)
  useSectionReveal(sectionRef, reducedMotion)

  return (
    <section id="recognition" ref={sectionRef} className="section-y border-t border-line">
      <div className="container-x">
        <SectionHeader
          index="06"
          kicker="Credentials"
          title="Certifications & Achievements"
          aside={<p>Program certificates and hackathon participation.</p>}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12" data-reveal="">
          <div className="lg:col-span-6">
            <h3 className="eyebrow mb-4 flex items-center gap-2 text-accent-ink">
              <Award className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Certifications</span>
            </h3>
            <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-bg-2">
              {certifications.map((cert) => (
                <div
                  key={`${cert.title}-${cert.issuer}`}
                  className="flex items-start justify-between gap-4 px-5 py-4"
                >
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">
                      {cert.credentialType}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-ink">{cert.title}</p>
                    <p className="text-xs text-muted">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-faint">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <h3 className="eyebrow mb-4 flex items-center gap-2 text-accent-ink">
              <Trophy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Hackathons &amp; Project Recognition</span>
            </h3>
            <div className="space-y-3">
              {achievements.map((item) => (
                <div
                  key={`${item.event}-${item.year}`}
                  className="flex flex-col justify-between gap-2 rounded-2xl border border-line bg-bg-2 px-5 py-3.5 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{item.event}</p>
                    <p className="text-xs text-muted">{item.result}</p>
                  </div>
                  <span className="self-start rounded-full border border-line-strong bg-surface px-2.5 py-0.5 font-mono text-[11px] text-accent-ink sm:self-center">
                    {item.year}
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
