import { useState, useCallback } from 'react'
import PathScreen from './components/PathScreen'
import ExerciseScreen from './components/ExerciseScreen'
import QRCode from './components/QRCode'

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
      {screen === 'path' ? (
        <PathScreen onStartMission={handleStartMission} />
      ) : (
        <ExerciseScreen
          onComplete={handleExerciseComplete}
          onExit={handleExerciseExit}
        />
      )}
      {/* QR code — desktop only */}
      <QRCode />
    </div>
  )
}
