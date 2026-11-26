import type { ArtVariant } from '../data/projects'

interface Props {
  variant: ArtVariant
  className?: string
}

export function ProjectArt({ variant, className = 'h-full w-full' }: Props) {
  switch (variant) {
    case 'vision':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <rect x="24" y="24" width="432" height="232" rx="12" stroke="currentColor" strokeOpacity="0.14" />
          <g stroke="var(--accent-ink)" strokeWidth="1.5">
            <path d="M56 76V52H80M424 76V52H400M56 204V228H80M424 204V228H400" />
            <rect x="150" y="78" width="128" height="112" rx="4" strokeDasharray="5 4" />
          </g>
          <circle cx="214" cy="134" r="24" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx="214" cy="134" r="4" fill="var(--accent-ink)" />
          <rect x="308" y="96" width="84" height="68" rx="4" stroke="currentColor" strokeOpacity="0.32" />
          <line x1="40" y1="140" x2="440" y2="140" stroke="currentColor" strokeOpacity="0.1" />
        </svg>
      )

    case 'shield':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <path
            d="M240 36L350 78V148C350 205 303 243 240 258C177 243 130 205 130 148V78L240 36Z"
            stroke="currentColor"
            strokeOpacity="0.24"
            strokeWidth="1.5"
          />
          <path
            d="M240 62L322 94V146C322 188 286 218 240 230C194 218 158 188 158 146V94L240 62Z"
            stroke="var(--accent-ink)"
            strokeWidth="1.5"
          />
          <path d="M214 146L232 164L268 124" stroke="var(--accent-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )

    case 'field':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <path d="M36 212C116 164 198 152 296 178C366 196 410 176 444 152" stroke="var(--accent-ink)" strokeWidth="1.8" />
          <path d="M36 232C122 186 212 180 304 202C370 218 412 204 444 184" stroke="currentColor" strokeOpacity="0.28" />
          <path d="M36 190C114 136 192 126 286 154C356 174 408 150 444 124" stroke="currentColor" strokeOpacity="0.18" />
          <circle cx="148" cy="112" r="34" stroke="var(--accent-ink)" strokeOpacity="0.55" strokeDasharray="4 4" />
          <circle cx="148" cy="112" r="14" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx="348" cy="94" r="5" fill="var(--accent-ink)" />
          <line x1="348" y1="94" x2="348" y2="176" stroke="currentColor" strokeOpacity="0.22" strokeDasharray="3 4" />
        </svg>
      )

    case 'vote':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          {/* Linked ledger blocks + verified ballot mark */}
          <rect x="46" y="98" width="96" height="84" rx="12" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1.5" />
          <rect x="192" y="82" width="96" height="116" rx="14" stroke="var(--accent-ink)" strokeWidth="1.8" />
          <rect x="338" y="98" width="96" height="84" rx="12" stroke="currentColor" strokeOpacity="0.26" strokeWidth="1.5" />
          <line x1="142" y1="140" x2="192" y2="140" stroke="var(--accent-ink)" strokeWidth="1.6" strokeDasharray="4 4" />
          <line x1="288" y1="140" x2="338" y2="140" stroke="var(--accent-ink)" strokeWidth="1.6" strokeDasharray="4 4" />
          <path d="M220 142L235 157L264 124" stroke="var(--accent-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="94" cy="140" r="14" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx="386" cy="140" r="14" stroke="currentColor" strokeOpacity="0.3" />
        </svg>
      )

    case 'retino':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          {/* Retinal fundus concentric scan + grading stages */}
          <circle cx="170" cy="140" r="84" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.5" />
          <circle cx="170" cy="140" r="56" stroke="var(--accent-ink)" strokeOpacity="0.7" strokeWidth="1.6" strokeDasharray="5 4" />
          <circle cx="170" cy="140" r="24" stroke="currentColor" strokeOpacity="0.4" />
          <circle cx="170" cy="140" r="5" fill="var(--accent-ink)" />
          <path d="M254 140H314" stroke="var(--accent-ink)" strokeWidth="1.6" strokeDasharray="3 3" />
          {[74, 114, 154, 194].map((y, i) => (
            <g key={y}>
              <rect x="314" y={y} width="112" height="22" rx="6" stroke={i === 1 ? 'var(--accent-ink)' : 'currentColor'} strokeOpacity={i === 1 ? 0.9 : 0.24} />
              <line x1="330" y1={y + 11} x2={360 + i * 12} y2={y + 11} stroke={i === 1 ? 'var(--accent-ink)' : 'currentColor'} strokeOpacity={i === 1 ? 1 : 0.35} strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
        </svg>
      )

    case 'map':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <g stroke="currentColor" strokeOpacity="0.14">
            <line x1="60" y1="60" x2="420" y2="220" />
            <line x1="60" y1="200" x2="420" y2="90" />
            <line x1="140" y1="32" x2="190" y2="248" />
            <line x1="310" y1="32" x2="280" y2="248" />
          </g>
          <circle cx="240" cy="140" r="76" stroke="var(--accent-ink)" strokeOpacity="0.4" strokeDasharray="5 5" />
          <circle cx="240" cy="140" r="36" stroke="currentColor" strokeOpacity="0.28" />
          <path
            d="M240 96C222 96 208 110 208 128C208 152 240 184 240 184C240 184 272 152 272 128C272 110 258 96 240 96Z"
            stroke="var(--accent-ink)"
            strokeWidth="1.8"
          />
          <circle cx="240" cy="128" r="8" fill="var(--accent-ink)" />
        </svg>
      )

    case 'document':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <rect x="78" y="42" width="142" height="196" rx="10" stroke="currentColor" strokeOpacity="0.28" />
          <rect x="260" y="42" width="142" height="196" rx="10" stroke="var(--accent-ink)" strokeOpacity="0.65" />
          <line x1="102" y1="80" x2="196" y2="80" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" />
          <line x1="102" y1="106" x2="176" y2="106" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          <line x1="102" y1="132" x2="190" y2="132" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
          <line x1="284" y1="80" x2="378" y2="80" stroke="var(--accent-ink)" strokeWidth="2" />
          <line x1="284" y1="106" x2="358" y2="106" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
          <line x1="284" y1="132" x2="372" y2="132" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M220 140H260" stroke="var(--accent-ink)" strokeWidth="1.8" strokeDasharray="3 3" />
          <circle cx="240" cy="140" r="14" fill="var(--bg)" stroke="var(--accent-ink)" strokeWidth="1.5" />
          <path d="M235 140L239 144L246 136" stroke="var(--accent-ink)" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )

    case 'pulse':
      return (
        <svg viewBox="0 0 480 280" fill="none" className={className} aria-hidden="true">
          <rect x="52" y="48" width="376" height="184" rx="14" stroke="currentColor" strokeOpacity="0.18" />
          <path
            d="M72 148H146L172 96L204 196L236 74L268 176L292 148H408"
            stroke="var(--accent-ink)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="408" cy="148" r="5" fill="var(--accent-ink)" />
        </svg>
      )
  }
}
