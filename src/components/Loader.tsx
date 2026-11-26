import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data/profile'

interface Props {
  reducedMotion: boolean
  onDone?: () => void
}

const SEEN_KEY = 'vsw-intro-seen'

export function Loader({ reducedMotion, onDone }: Props) {
  const [visible, setVisible] = useState(() => {
    if (reducedMotion || typeof window === 'undefined') return false
    try {
      return sessionStorage.getItem(SEEN_KEY) !== '1'
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!visible) {
      onDone?.()
      return
    }
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        // ignore
      }
      setVisible(false)
      onDone?.()
    }, 680)
    return () => window.clearTimeout(timer)
  }, [visible, onDone])

  if (reducedMotion) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-bg px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-5"
          >
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-sm tracking-[0.28em] text-ink">{profile.initials}</span>
            </div>
            <div className="h-[1px] w-36 overflow-hidden bg-line">
              <div className="loader-line h-full w-full bg-accent" />
            </div>
            <p className="eyebrow text-faint">{profile.name}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
