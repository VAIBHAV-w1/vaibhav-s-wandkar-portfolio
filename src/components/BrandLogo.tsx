interface Props {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-9 w-12 rounded-xl',
  md: 'h-10 w-14 rounded-xl',
  lg: 'h-12 w-16 rounded-2xl',
} as const

/**
 * Geometric VSW monogram with balanced, non-overlapping strokes that remain
 * crisp from 16px favicons up to hero/footer marks in both dark and light themes.
 */
export function BrandLogo({ size = 'md', className = '' }: Props) {
  return (
    <span
      className={`group/logo relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-line-strong bg-surface transition-colors duration-300 group-hover:border-accent-ink ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 64 40"
        fill="none"
        aria-hidden="true"
        className="h-[74%] w-[82%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
      >
        {/* V */}
        <path
          d="M6.5 9.5L13 30.5L19.5 9.5"
          className="stroke-ink"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* S */}
        <path
          d="M36.5 12C36.5 10.3 34.9 9.5 32.4 9.5H28.8C26.5 9.5 25 10.9 25 13C25 15.6 26.8 16.9 31.1 18.2C35.2 19.4 37 20.9 37 24.4C37 28 34.8 30.5 30.2 30.5H24.8"
          className="stroke-accent-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[0.6px]"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* W */}
        <path
          d="M41.8 9.5L45.4 30.5L49.8 16L54.2 30.5L57.8 9.5"
          className="stroke-ink"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
