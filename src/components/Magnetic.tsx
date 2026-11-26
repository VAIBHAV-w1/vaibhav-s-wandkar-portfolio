import { useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  strength?: number
  className?: string
  reducedMotion?: boolean
}

export function Magnetic({ children, strength = 0.24, className = '', reducedMotion = false }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`
  }

  const handleLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate3d(0, 0, 0)'
    }
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
