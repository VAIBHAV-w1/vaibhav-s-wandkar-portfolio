import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'vsw-theme'

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore storage access issues
  }
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyThemeToDocument(theme: Theme) {
  document.documentElement.dataset.theme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) {
    meta.setAttribute('content', theme === 'light' ? '#f2efe6' : '#0d0e0c')
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore storage access issues
  }
}

export function useTheme(reducedMotion: boolean) {
  const [theme, setTheme] = useState<Theme>(readInitialTheme)

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'dark' ? 'light' : 'dark'
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => { ready: Promise<void> }
      }

      if (!doc.startViewTransition || reducedMotion || !origin) {
        setTheme(next)
        applyThemeToDocument(next)
        return
      }

      const maxRadius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      )

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setTheme(next)
        })
        applyThemeToDocument(next)
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${maxRadius}px at ${origin.x}px ${origin.y}px)`],
            },
            {
              duration: 560,
              easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
              pseudoElement: '::view-transition-new(root)',
            },
          )
        })
        .catch(() => {
          // fallback already applied
        })
    },
    [theme, reducedMotion],
  )

  return { theme, toggleTheme }
}
