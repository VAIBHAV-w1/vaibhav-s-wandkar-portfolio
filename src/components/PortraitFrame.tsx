import { useState } from 'react'
import { profile } from '../data/profile'
import { BrandLogo } from './BrandLogo'

interface Props {
  className?: string
}

export function PortraitFrame({ className = '' }: Props) {
  const [errored, setErrored] = useState(false)

  return (
    <figure
      className={`relative overflow-hidden rounded-3xl border border-line-strong bg-bg-2 ${className}`}
    >
      {/* Top technical frame bar */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
        <span className="inline-flex items-center gap-2">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          <span>V. S. WANDKAR</span>
        </span>
        <span className="text-accent-ink">PYTHON · DJANGO</span>
      </div>

      {/* Portrait surface */}
      <div className="p-2.5">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface">
          {!errored ? (
            <>
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/vaibhav-portrait-480.webp 480w, /images/vaibhav-portrait-800.webp 800w"
                  sizes="(max-width: 1024px) 90vw, 420px"
                />
                <img
                  src="/images/vaibhav-portrait-800.jpg"
                  width={800}
                  height={1000}
                  alt={`Portrait of ${profile.name}`}
                  fetchPriority="high"
                  decoding="async"
                  onError={() => setErrored(true)}
                  className="h-full w-full object-cover object-top transition duration-700 ease-out hover:scale-[1.02]"
                />
              </picture>
              {/* Subtle edge vignette to harmonize light studio backdrop with dark & light surfaces */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5"
              />
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
              <BrandLogo size="lg" />
              <p className="font-mono text-xs text-muted">{profile.name}</p>
            </div>
          )}

          {/* Corner framing marks */}
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-accent-ink/70" />
          <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-accent-ink/70" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-accent-ink/70" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-accent-ink/70" />
        </div>
      </div>

      {/* Factual caption footer */}
      <figcaption className="flex items-center justify-between border-t border-line px-4 py-3 text-xs text-muted">
        <span>{profile.name}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">BIET · Davangere</span>
      </figcaption>
    </figure>
  )
}
