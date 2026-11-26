import { useEffect, useRef, useState } from 'react'

interface Props {
  reducedMotion: boolean
}

export function CustomCursor({ reducedMotion }: Props) {
  const ringRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [interactive, setInteractive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      document.documentElement.classList.remove('has-cursor')
      setEnabled(false)
      return
    }

    const finePointer = window.matchMedia('(pointer: fine) and (hover: hover)')
    const sync = () => {
      const ok = finePointer.matches
      setEnabled(ok)
      document.documentElement.classList.toggle('has-cursor', ok)
    }
    sync()
    finePointer.addEventListener('change', sync)

    return () => {
      finePointer.removeEventListener('change', sync)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled) return

    let targetX = -100
    let targetY = -100
    let currentX = -100
    let currentY = -100
    let raf = 0

    const loop = () => {
      currentX += (targetX - currentX) * 0.18
      currentY += (targetY - currentY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      }
      raf = window.requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!visible) setVisible(true)

      const target = e.target as HTMLElement | null
      const labeled = target?.closest<HTMLElement>('[data-cursor]')
      setLabel(labeled?.dataset.cursor ?? '')

      const clickable = target?.closest('a, button, [role="button"], input, textarea, select')
      setInteractive(Boolean(clickable))
    }

    const onLeave = () => setVisible(false)
    const onPointerDown = () => setLabel('')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled, visible])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border transition-[width,height,border-color,background-color,opacity] duration-200 ease-out ${
          !visible ? 'opacity-0' : 'opacity-100'
        } ${
          label
            ? 'h-16 w-16 border-accent bg-accent text-on-accent'
            : interactive
              ? 'h-10 w-10 border-accent-ink bg-accent/10'
              : 'h-7 w-7 border-line-strong bg-transparent'
        }`}
      >
        {label ? <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">{label}</span> : null}
      </div>
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-150 ${
          !visible || label ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}
