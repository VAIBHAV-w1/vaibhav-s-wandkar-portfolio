import { useCallback, useEffect, useState } from 'react'

export type RoutePath = '/' | '/privacy' | '/404'

function normalizePath(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/') return '/'
  if (clean === '/privacy') return '/privacy'
  return '/404'
}

export function useRouter() {
  const [route, setRoute] = useState<RoutePath>(() =>
    typeof window !== 'undefined' ? normalizePath(window.location.pathname) : '/',
  )

  useEffect(() => {
    const onPop = () => {
      setRoute(normalizePath(window.location.pathname))
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: RoutePath) => {
    const normalized = normalizePath(next)
    if (window.location.pathname !== normalized) {
      window.history.pushState({}, '', normalized)
    }
    setRoute(normalized)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return { route, navigate }
}
