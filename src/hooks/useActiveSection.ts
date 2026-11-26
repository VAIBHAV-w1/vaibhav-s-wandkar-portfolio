import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[], enabled = true): string {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    if (!enabled || ids.length === 0) return

    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const ratios = new Map<string, number>()

    const syncTop = () => {
      if (window.scrollY < 180) {
        setActive('')
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        if (window.scrollY < 180) {
          setActive('')
          return
        }
        let bestId = ''
        let bestRatio = 0
        for (const id of ids) {
          const r = ratios.get(id) ?? 0
          if (r > bestRatio) {
            bestRatio = r
            bestId = id
          }
        }
        if (bestId) setActive(bestId)
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      },
    )

    for (const el of elements) observer.observe(el)
    window.addEventListener('scroll', syncTop, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', syncTop)
    }
  }, [ids, enabled])

  return active
}
