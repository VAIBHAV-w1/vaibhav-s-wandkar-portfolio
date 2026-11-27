interface Props {
  variant?: 'full' | 'compact'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const fullSizes = {
  sm: 'h-11 w-11',
  md: 'h-14 w-14',
  lg: 'h-16 w-16 sm:h-20 sm:w-20',
  xl: 'h-16 w-16 sm:h-24 sm:w-24',
} as const

/**
 * Renders the official Vaibhav S. Wandkar circular gold-and-silver VSW logo (`full`)
 * or its compact cropped central VSW emblem (`compact`) for tight navigation bars.
 */
export function BrandLogo({ variant = 'full', size = 'md', className = '' }: Props) {
  if (variant === 'compact') {
    return (
      <span
        className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-accent/45 bg-[#0a0b09] px-2.5 py-1 shadow-xs transition-colors duration-300 group-hover:border-accent ${className}`}
      >
        <img
          src="/images/vsw-navbar-emblem.webp"
          width={360}
          height={188}
          alt="VSW"
          decoding="async"
          className="h-7 w-auto object-contain select-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
        />
      </span>
    )
  }

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-full ${fullSizes[size]} ${className}`}
    >
      <img
        src="/images/vsw-official-logo.webp"
        width={446}
        height={446}
        alt="VSW — Vaibhav S. Wandkar official logo"
        decoding="async"
        className="h-full w-full rounded-full object-contain select-none"
      />
    </span>
  )
}
