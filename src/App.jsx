import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PathScreen from './components/PathScreen'
import ExerciseScreen from './components/ExerciseScreen'
import QRCode from './components/QRCode'

const pageVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
}

const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut',
}

// Flow: path → exercise screen (compass phase → exercises) → path

export default function App() {
  const [screen, setScreen] = useState('path')

  const handleStartMission = useCallback(() => {
    setScreen('exercise')
  }, [])

  const handleExerciseComplete = useCallback(() => {
    setScreen('path')
  }, [])

  const handleExerciseExit = useCallback(() => {
    setScreen('path')
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
            <PathScreen onStartMission={handleStartMission} />
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
            <ExerciseScreen
              onComplete={handleExerciseComplete}
              onExit={handleExerciseExit}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* QR code — desktop only */}
      <QRCode />
    </div>
  )
}
