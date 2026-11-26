interface Props {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'h-9 w-9 rounded-xl',
  md: 'h-10 w-10 rounded-xl',
  lg: 'h-12 w-12 rounded-2xl',
} as const

export function BrandLogo({ size = 'sm', className = '' }: Props) {
  return (
    <span
      className={`group/logo relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-line-strong bg-surface transition-colors duration-300 group-hover:border-accent-ink ${sizeClasses[size]} ${className}`}
    >
      <svg
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="h-[72%] w-[72%] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
      >
        <path
          d="M5.5 11.5L12 29L18.5 11.5"
          className="stroke-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-[0.5px]"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.5 11.5L22.5 29L27 16.5L31.5 29L36.5 11.5"
          className="stroke-accent-ink transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-[0.5px]"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
