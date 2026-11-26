import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { Theme } from '../hooks/useTheme'

interface Props {
  theme: Theme
  reducedMotion: boolean
}

function getScenePalette(theme: Theme) {
  if (theme === 'light') {
    return {
      ink: '#1b1c18',
      accent: '#5c7d00',
      outerOpacity: 0.44,
      ringOpacity: 0.28,
    }
  }
  return {
    ink: '#ece8dc',
    accent: '#c8f34a',
    outerOpacity: 0.34,
    ringOpacity: 0.2,
  }
}

function FallbackDiagram() {
  return (
    <svg viewBox="0 0 360 360" fill="none" className="h-full w-full max-w-[340px]" aria-hidden="true">
      <circle cx="180" cy="180" r="142" stroke="currentColor" strokeOpacity="0.16" strokeDasharray="4 6" />
      <circle cx="180" cy="180" r="98" stroke="var(--accent-ink)" strokeOpacity="0.55" strokeWidth="1.25" />
      <polygon points="180,52 292,180 180,308 68,180" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.2" />
      <polygon points="180,96 248,180 180,264 112,180" stroke="var(--accent-ink)" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="180" cy="180" r="5" fill="var(--accent-ink)" />
      <circle cx="180" cy="52" r="3" fill="currentColor" fillOpacity="0.6" />
      <circle cx="292" cy="180" r="3" fill="currentColor" fillOpacity="0.6" />
      <circle cx="180" cy="308" r="3" fill="currentColor" fillOpacity="0.6" />
      <circle cx="68" cy="180" r="3" fill="currentColor" fillOpacity="0.6" />
    </svg>
  )
}

export default function HeroScene({ theme, reducedMotion }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const [fallback, setFallback] = useState(reducedMotion)
  const themeRef = useRef<Theme>(theme)
  themeRef.current = theme

  const colorsRef = useRef<{
    outerMat?: THREE.LineBasicMaterial
    innerMat?: THREE.MeshBasicMaterial
    pointsMat?: THREE.PointsMaterial
    ringMat?: THREE.LineBasicMaterial
  }>({})

  useEffect(() => {
    if (reducedMotion) {
      setFallback(true)
      return
    }
    setFallback(false)
  }, [reducedMotion])

  useEffect(() => {
    const { ink, accent, outerOpacity, ringOpacity } = getScenePalette(theme)
    const c = colorsRef.current
    if (c.outerMat) {
      c.outerMat.color.set(ink)
      c.outerMat.opacity = outerOpacity
      c.outerMat.needsUpdate = true
    }
    if (c.innerMat) {
      c.innerMat.color.set(accent)
      c.innerMat.needsUpdate = true
    }
    if (c.pointsMat) {
      c.pointsMat.color.set(accent)
      c.pointsMat.needsUpdate = true
    }
    if (c.ringMat) {
      c.ringMat.color.set(ink)
      c.ringMat.opacity = ringOpacity
      c.ringMat.needsUpdate = true
    }
  }, [theme])

  useEffect(() => {
    if (reducedMotion) return
    const host = hostRef.current
    if (!host) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      setFallback(true)
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setPixelRatio(dpr)
    renderer.setClearColor(0x000000, 0)

    const width = Math.max(host.clientWidth, 280)
    const height = Math.max(host.clientHeight, 280)
    renderer.setSize(width, height)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100)
    camera.position.z = 5.4

    const group = new THREE.Group()
    scene.add(group)

    const { ink, accent, outerOpacity, ringOpacity } = getScenePalette(themeRef.current)

    const outerGeo = new THREE.IcosahedronGeometry(1.65, 1)
    const outerEdges = new THREE.EdgesGeometry(outerGeo)
    const outerMat = new THREE.LineBasicMaterial({ color: new THREE.Color(ink), transparent: true, opacity: outerOpacity })
    const outerWire = new THREE.LineSegments(outerEdges, outerMat)
    group.add(outerWire)

    const innerGeo = new THREE.OctahedronGeometry(0.95, 0)
    const innerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(accent), wireframe: true, transparent: true, opacity: 0.72 })
    const innerMesh = new THREE.Mesh(innerGeo, innerMat)
    group.add(innerMesh)

    const ringCurve = new THREE.EllipseCurve(0, 0, 2.18, 2.18, 0, Math.PI * 2, false, 0)
    const ringPts = ringCurve.getPoints(96).map((p) => new THREE.Vector3(p.x, p.y, 0))
    const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPts)
    const ringMat = new THREE.LineBasicMaterial({ color: new THREE.Color(ink), transparent: true, opacity: ringOpacity })
    const ring = new THREE.LineLoop(ringGeo, ringMat)
    ring.rotation.x = Math.PI * 0.36
    ring.rotation.y = Math.PI * 0.12
    group.add(ring)

    const posAttr = outerGeo.getAttribute('position')
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', posAttr.clone())
    const pointsMat = new THREE.PointsMaterial({ color: new THREE.Color(accent), size: 0.06, transparent: true, opacity: 0.85 })
    const nodes = new THREE.Points(pointsGeo, pointsMat)
    group.add(nodes)

    colorsRef.current = { outerMat, innerMat, pointsMat, ringMat }

    let pointerX = 0
    let pointerY = 0
    const onPointerMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      pointerX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      pointerY = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const w = Math.max(entry.contentRect.width, 200)
      const h = Math.max(entry.contentRect.height, 200)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    })
    ro.observe(host)

    let inView = true
    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.05 },
    )
    io.observe(host)

    let raf = 0
    const clock = new THREE.Clock()

    const renderFrame = () => {
      raf = window.requestAnimationFrame(renderFrame)
      if (!inView || document.hidden) return
      const elapsed = clock.getElapsedTime()
      group.rotation.y = elapsed * 0.16 + pointerX * 0.25
      group.rotation.x = Math.sin(elapsed * 0.3) * 0.12 + pointerY * 0.18
      innerMesh.rotation.y = -elapsed * 0.28
      innerMesh.rotation.z = elapsed * 0.14
      ring.rotation.z = elapsed * 0.08
      renderer.render(scene, camera)
    }
    renderFrame()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      ro.disconnect()
      io.disconnect()
      outerGeo.dispose()
      outerEdges.dispose()
      outerMat.dispose()
      innerGeo.dispose()
      innerMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      pointsGeo.dispose()
      pointsMat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement)
      }
      colorsRef.current = {}
    }
  }, [reducedMotion])

  return (
    <div
      ref={hostRef}
      className="relative flex h-[280px] w-full items-center justify-center text-ink sm:h-[340px] lg:h-[420px]"
      aria-hidden="true"
    >
      {fallback ? <FallbackDiagram /> : null}
    </div>
  )
}
