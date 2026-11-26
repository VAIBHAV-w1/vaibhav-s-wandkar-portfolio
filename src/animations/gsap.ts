import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Animates `[data-reveal]` descendants inside `scopeRef` as they enter the viewport.
 * Elements are immediately visible when `reducedMotion` is true.
 */
export function useSectionReveal(scopeRef: RefObject<HTMLElement | null>, reducedMotion: boolean) {
  useEffect(() => {
    const scope = scopeRef.current
    if (!scope || reducedMotion) return

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]', scope)
      if (targets.length === 0) return

      gsap.set(targets, { y: 24, opacity: 0 })
      ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.72,
            ease: 'power3.out',
            stagger: 0.06,
            clearProps: 'transform,opacity',
          })
        },
      })
    }, scope)

    return () => ctx.revert()
  }, [scopeRef, reducedMotion])
}
