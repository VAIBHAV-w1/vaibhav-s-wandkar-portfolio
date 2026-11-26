import { useCallback, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../animations/gsap'

export function useLenis(enabled: boolean) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) {
      lenisRef.current?.destroy()
      lenisRef.current = null
      return
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    })

    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === 'string' && target.startsWith('#') ? -64 : 0 })
      return
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'auto' })
    } else if (typeof target === 'string') {
      if (target === '#top') {
        window.scrollTo({ top: 0, behavior: 'auto' })
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'auto' })
      }
    } else {
      target.scrollIntoView({ behavior: 'auto' })
    }
  }, [])

  const setPaused = useCallback((paused: boolean) => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (paused) lenis.stop()
    else lenis.start()
  }, [])

  return { scrollTo, setPaused }
}
