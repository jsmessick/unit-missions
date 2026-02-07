import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PathScreen from './components/PathScreen'
import MissionBriefing from './components/MissionBriefing'
import ExerciseComparison from './components/ExerciseComparison'
import Confirmation from './components/Confirmation'

const pageVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut',
}

// Screens: path → briefing (overlay) → exercise → confirmation
// "briefing" is an overlay on "path", so we handle it separately

export default function App() {
  const [screen, setScreen] = useState('path') // path | exercise | confirmation
  const [showBriefing, setShowBriefing] = useState(false)
  const [selectedLens, setSelectedLens] = useState(null)

  const handleOpenBriefing = useCallback(() => {
    setShowBriefing(true)
  }, [])

  const handleCloseBriefing = useCallback(() => {
    setShowBriefing(false)
  }, [])

  const handleStartMission = useCallback((lensId) => {
    setSelectedLens(lensId)
    setShowBriefing(false)
    setScreen('exercise')
  }, [])

  const handleContinue = useCallback(() => {
    setScreen('confirmation')
  }, [])

  const handleLetsGo = useCallback(() => {
    // In a real app this would start the exercises
    // For the prototype, loop back to path
    setScreen('path')
    setSelectedLens(null)
  }, [])

  const handleReset = useCallback(() => {
    setScreen('path')
    setSelectedLens(null)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {screen === 'path' && (
          <motion.div
            key="path"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <PathScreen onStartMission={handleOpenBriefing} />
          </motion.div>
        )}

        {screen === 'exercise' && (
          <motion.div
            key="exercise"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <ExerciseComparison
              selectedLens={selectedLens}
              onContinue={handleContinue}
            />
          </motion.div>
        )}

        {screen === 'confirmation' && (
          <motion.div
            key="confirmation"
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
          >
            <Confirmation
              selectedLens={selectedLens}
              onStart={handleLetsGo}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mission briefing overlay */}
      <AnimatePresence>
        {showBriefing && (
          <MissionBriefing
            onClose={handleCloseBriefing}
            onStartMission={handleStartMission}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
