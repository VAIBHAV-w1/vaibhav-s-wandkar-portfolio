import { useCallback, useEffect, useState } from 'react'

export type RoutePath = '/' | '/privacy'

function normalizePath(pathname: string): RoutePath {
  return pathname.replace(/\/+$/, '') === '/privacy' ? '/privacy' : '/'
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
