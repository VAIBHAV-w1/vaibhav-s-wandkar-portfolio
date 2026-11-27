import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { CustomCursor } from './components/CustomCursor'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Loader } from './components/Loader'
import { Navbar } from './components/Navbar'
import { ProjectModal } from './components/ProjectModal'
import { ScrollProgress } from './components/ScrollProgress'
import { navItems } from './data/navigation'
import type { Project } from './data/projects'
import { useActiveSection } from './hooks/useActiveSection'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useRouter } from './hooks/useRouter'
import { useTheme } from './hooks/useTheme'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { About } from './sections/About'
import { Contact } from './sections/Contact'
import { Education } from './sections/Education'
import { Experience } from './sections/Experience'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Projects } from './sections/Projects'
import { Recognition } from './sections/Recognition'
import { Skills } from './sections/Skills'

export default function App() {
  const reducedMotion = useReducedMotion()
  const { theme, toggleTheme } = useTheme(reducedMotion)
  const { route, navigate } = useRouter()
  const { scrollTo, setPaused } = useLenis(!reducedMotion && route === '/')

  const sectionIds = useMemo(() => navItems.map((n) => n.id), [])
  const activeSection = useActiveSection(sectionIds, route === '/')

  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setPaused(modalOpen || drawerOpen)
  }, [modalOpen, drawerOpen, setPaused])

  const handleCloseProject = useCallback(() => {
    setActiveProject(null)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <Loader reducedMotion={reducedMotion} />
        <ScrollProgress />
        <CustomCursor reducedMotion={reducedMotion} />

        <div className="flex min-h-svh flex-col bg-bg text-ink">
          <Navbar
            theme={theme}
            onToggleTheme={toggleTheme}
            activeSection={activeSection}
            route={route}
            onNavigate={navigate}
            onScrollTo={scrollTo}
            onDrawerChange={setDrawerOpen}
          />

          <main id="main" className="flex-1">
            <AnimatePresence mode="wait">
              {route === '/privacy' ? (
                <motion.div
                  key="privacy"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <PrivacyPage onNavigate={navigate} />
                </motion.div>
              ) : route === '/404' ? (
                <motion.div
                  key="not-found"
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                >
                  <NotFoundPage onNavigate={navigate} />
                </motion.div>
              ) : (
                <motion.div
                  key="home"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Hero reducedMotion={reducedMotion} onScrollTo={scrollTo} />
                  <About reducedMotion={reducedMotion} />
                  <Projects reducedMotion={reducedMotion} onOpenProject={setActiveProject} />
                  <Skills reducedMotion={reducedMotion} />
                  <Experience reducedMotion={reducedMotion} onOpenProject={setActiveProject} />
                  <Education reducedMotion={reducedMotion} />
                  <Recognition reducedMotion={reducedMotion} />
                  <Contact reducedMotion={reducedMotion} onNavigate={navigate} />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          <Footer route={route} onNavigate={navigate} onScrollTo={scrollTo} />
        </div>

        <ProjectModal
          project={activeProject}
          onClose={handleCloseProject}
          onSelect={setActiveProject}
          onModalChange={setModalOpen}
        />
      </ErrorBoundary>
    </MotionConfig>
  )
}
