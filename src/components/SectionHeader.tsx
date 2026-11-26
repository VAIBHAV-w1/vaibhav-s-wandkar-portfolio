import type { ReactNode } from 'react'

interface Props {
  index: string
  kicker: string
  title: ReactNode
  aside?: ReactNode
}

export function SectionHeader({ index, kicker, title, aside }: Props) {
  return (
    <div className="mb-12 border-t border-line pt-8 md:mb-16 md:pt-10" data-reveal="">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3 flex items-center gap-2.5 text-muted">
            <span className="font-mono text-accent-ink">{index}</span>
            <span aria-hidden="true" className="text-faint">/</span>
            <span>{kicker}</span>
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3.75rem)] font-medium leading-[1.03] tracking-[-0.03em] text-ink">
            {title}
          </h2>
        </div>
        {aside ? <div className="max-w-md text-sm leading-relaxed text-muted md:text-right">{aside}</div> : null}
      </div>
    </div>
  )
}
