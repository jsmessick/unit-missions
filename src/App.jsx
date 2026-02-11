import { useState, useCallback } from 'react'
import PathScreen from './components/PathScreen'
import ExerciseScreen from './components/ExerciseScreen'
import MissionComplete from './components/MissionComplete'
import QRCode from './components/QRCode'

// Flow: path → exercise screen (compass phase → exercises) → complete → path

export default function App() {
  const [screen, setScreen] = useState('path')

  const handleStartMission = useCallback(() => {
    setScreen('exercise')
  }, [])

  const handleExerciseComplete = useCallback(() => {
    setScreen('complete')
  }, [])

  const handleExerciseExit = useCallback(() => {
    setScreen('path')
  }, [])

  const handleShowComplete = useCallback(() => {
    setScreen('complete')
  }, [])

  const handleCompleteFinish = useCallback(() => {
    setScreen('path')
  }, [])

  return (
    <div className="relative">
      {screen === 'path' ? (
        <PathScreen onStartMission={handleStartMission} />
      ) : screen === 'exercise' ? (
        <ExerciseScreen
          onComplete={handleExerciseComplete}
          onExit={handleExerciseExit}
        />
      ) : (
        <MissionComplete onContinue={handleCompleteFinish} />
      )}
      {/* QR code + demo shortcuts — desktop only */}
      <QRCode onShowComplete={handleShowComplete} />
    </div>
  )
}
