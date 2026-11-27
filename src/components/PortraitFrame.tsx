import { useState } from 'react'
import { profile } from '../data/profile'
import { BrandLogo } from './BrandLogo'

interface Props {
  className?: string
}

export function PortraitFrame({ className = '' }: Props) {
  const [errored, setErrored] = useState(false)

  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-line-strong bg-bg-2 ${className}`}>
      {/* Minimal VSW studio header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-semibold text-ink">{profile.initials}</span>
        </span>
        <span className="text-accent-ink">PYTHON · DJANGO</span>
      </div>

      {/* Dedicated unobstructed portrait surface — preserves natural 782:1024 proportions & white studio backdrop */}
      <div className="p-3">
        <div className="relative aspect-[782/1024] w-full overflow-hidden rounded-xl border border-line bg-white">
          {!errored ? (
            <picture>
              <source
                type="image/webp"
                srcSet="/images/vaibhav-portrait-480.webp 480w, /images/vaibhav-portrait-782.webp 782w"
                sizes="(max-width: 1024px) 90vw, 400px"
              />
              <img
                src="/images/vaibhav-portrait-original.jpg"
                width={782}
                height={1024}
                alt={`Studio portrait of ${profile.name}`}
                fetchPriority="high"
                decoding="async"
                onError={() => setErrored(true)}
                className="h-full w-full object-cover object-top"
              />
            </picture>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-surface p-6 text-center">
              <BrandLogo variant="full" size="lg" />
              <p className="font-mono text-xs text-muted">{profile.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Factual caption footer */}
      <figcaption className="flex items-center justify-between border-t border-line px-5 py-3.5 text-xs text-muted">
        <span className="font-medium text-ink">{profile.name}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-faint">BIET · Davangere</span>
      </figcaption>
    </figure>
  )
}
