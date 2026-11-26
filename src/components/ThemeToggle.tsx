import { Moon, Sun } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface Props {
  theme: Theme
  onToggle: (origin?: { x: number; y: number }) => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDark = theme === 'dark'

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onToggle({
      x: e.clientX || rect.left + rect.width / 2,
      y: e.clientY || rect.top + rect.height / 2,
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-line px-3.5 text-xs font-medium text-ink transition hover:border-line-strong hover:bg-surface"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? <Sun className="h-3.5 w-3.5 text-accent-ink" /> : <Moon className="h-3.5 w-3.5 text-accent-ink" />}
      </span>
      <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:inline">
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  )
}
