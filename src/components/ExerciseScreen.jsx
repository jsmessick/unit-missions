import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { exercises } from '../data/exercises'
import { lenses } from '../data/lenses'

// Fisher-Yates shuffle
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function shuffledWords(words) {
  return shuffle(words.map((w, i) => ({ word: w, id: i })))
}

export default function ExerciseScreen({ onComplete, onExit }) {
  // Phase: compass (lesson 1/5) → exercise (lessons 2-5)
  const [phase, setPhase] = useState('compass')
  const [selectedLens, setSelectedLens] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWords, setSelectedWords] = useState([])
  const [availableWords, setAvailableWords] = useState([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const exList = selectedLens ? (exercises[selectedLens] || exercises.travel) : []
  const total = 5 // 1 compass + 4 exercises
  const ex = exList[currentIndex]

  // Progress: compass = 0/5, then exercises fill 1-4/5, feedback on last = 5/5
  const progress = phase === 'compass'
    ? 0
    : ((currentIndex + 1 + (showFeedback ? 1 : 0)) / total) * 100

  const handleLensSelect = useCallback((lensId) => {
    setSelectedLens(lensId)
  }, [])

  const handleCompassContinue = useCallback(() => {
    if (!selectedLens) return
    const list = exercises[selectedLens] || exercises.travel
    setAvailableWords(shuffledWords(list[0].words))
    setPhase('exercise')
  }, [selectedLens])

  const handleSkip = useCallback(() => {
    const options = ['travel', 'social', 'professional']
    const random = options[Math.floor(Math.random() * options.length)]
    setSelectedLens(random)
    const list = exercises[random] || exercises.travel
    setAvailableWords(shuffledWords(list[0].words))
    setPhase('exercise')
  }, [])

  const handleWordTap = useCallback((wordObj) => {
    setSelectedWords(prev => [...prev, wordObj])
    setAvailableWords(prev => prev.filter(w => w.id !== wordObj.id))
  }, [])

  const handleRemoveWord = useCallback((wordObj) => {
    setSelectedWords(prev => prev.filter(w => w.id !== wordObj.id))
    setAvailableWords(prev => [...prev, wordObj])
  }, [])

  const handleCheck = useCallback(() => {
    const userAnswer = selectedWords.map(w => w.word).join(' ')
    // Strip trailing period from correct answer for comparison
    const correctAnswer = ex.answer.replace(/\.$/, '')
    setIsCorrect(userAnswer === correctAnswer)
    setShowFeedback(true)
  }, [selectedWords, ex])

  const handleNext = useCallback(() => {
    if (currentIndex < exList.length - 1) {
      const nextIndex = currentIndex + 1
      const nextEx = exList[nextIndex]
      setCurrentIndex(nextIndex)
      setSelectedWords([])
      setAvailableWords(shuffledWords(nextEx.words))
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      setIsDone(true)
    }
  }, [currentIndex, exList])

  // Completion screen
  if (isDone) {
    const lens = lenses.find(l => l.id === selectedLens) || lenses[0]
    return (
      <div className="min-h-[100dvh] bg-duo-dark flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-24 h-24 bg-duo-orange rounded-full flex items-center justify-center mb-6"
        >
          <span className="text-4xl">⭐</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-2xl font-black text-white text-center mb-2"
        >
          Mission Complete!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-base font-bold text-gray-400 mb-2"
        >
          {lens.emoji} {lens.title} Focus
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 bg-duo-orange/20 rounded-full px-4 py-2 mb-10"
        >
          <span className="text-duo-orange font-black text-lg">+75 XP</span>
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          whileTap={{ y: 2 }}
          onClick={onComplete}
          className="w-full py-3.5 rounded-2xl font-black text-base uppercase tracking-wide
            bg-duo-green border-b-4 border-duo-green-dark text-white"
        >
          Continue
        </motion.button>
      </div>
    )
  }

  // Compass phase — lesson 1 of 5
  if (phase === 'compass') {
    return (
      <div className="min-h-[100dvh] bg-duo-dark flex flex-col">
        {/* Top bar: X + progress */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-2">
          <button onClick={onExit} className="text-gray-500 p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex-1 h-3 bg-duo-dark-lighter rounded-full overflow-hidden">
            <div className="h-full bg-duo-green rounded-full" style={{ width: 0 }} />
          </div>
          <span className="text-xs font-bold text-gray-500 min-w-[28px] text-right">
            1/{total}
          </span>
        </div>

        {/* Compass content */}
        <div className="flex-1 px-5 pt-4 overflow-y-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">🧭</span>
              <h2 className="text-xl font-black text-white">Unit Mission</h2>
            </div>
          </motion.div>

          {/* In this unit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-5"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wider font-extrabold mb-2">
              In this unit
            </p>
            <p className="text-sm text-gray-300 font-bold leading-snug mb-3">
              Navigate city life — find the train station, order at a café, and describe what you see
            </p>
            <div className="bg-duo-dark-card rounded-xl p-3 space-y-3">
              <div>
                <p className="text-sm text-white font-bold">"Estoy buscando la estación de tren"</p>
                <p className="text-xs text-gray-400 mt-0.5">I am looking for the train station</p>
              </div>
              <div>
                <p className="text-sm text-white font-bold">"Ella está esperando el autobús"</p>
                <p className="text-xs text-gray-400 mt-0.5">She is waiting for the bus</p>
              </div>
            </div>
          </motion.div>

          {/* Lens picker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">
              Pick your focus
            </p>
            <p className="text-xs font-bold text-gray-500 mb-3">
              Commit to 2 focused lessons
            </p>
            <div className="space-y-2.5 mb-5">
              {lenses.map((lens, i) => (
                <motion.button
                  key={lens.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleLensSelect(lens.id)}
                  className={`
                    w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all border-2
                    ${selectedLens === lens.id
                      ? 'bg-duo-dark-lighter border-duo-green'
                      : 'bg-duo-dark-card border-duo-dark-lighter'
                    }
                  `}
                >
                  <span className="text-2xl flex-shrink-0">{lens.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-extrabold text-sm ${selectedLens === lens.id ? 'text-white' : 'text-gray-300'}`}>
                      {lens.title}
                    </div>
                    <div className="text-xs font-bold text-gray-500 leading-tight mt-0.5">
                      {lens.description}
                    </div>
                  </div>
                  {selectedLens === lens.id && (
                    <motion.div
                      layoutId="lens-check"
                      className="w-6 h-6 bg-duo-green rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom: Start / Skip */}
        <div className="px-5 pb-8 pt-4">
          <AnimatePresence>
            {selectedLens && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <motion.button
                  whileTap={{ y: 2 }}
                  onClick={handleCompassContinue}
                  className="w-full py-3.5 rounded-2xl font-black text-base uppercase tracking-wide
                    bg-duo-green border-b-4 border-duo-green-dark text-white cursor-pointer mb-3"
                >
                  Start
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={handleSkip}
            className="w-full py-2 text-sm font-bold text-gray-500"
          >
            Skip — surprise me
          </button>
        </div>
      </div>
    )
  }

  // Exercise phase — lessons 2-5
  return (
    <div className="min-h-[100dvh] bg-duo-dark flex flex-col">
      {/* Top bar: X + progress */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={onExit} className="text-gray-500 p-1">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex-1 h-3 bg-duo-dark-lighter rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-duo-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs font-bold text-gray-500 min-w-[28px] text-right">
          {currentIndex + 2}/{total}
        </span>
      </div>

      {/* Exercise content */}
      <div className="flex-1 px-5 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {/* Prompt */}
            <p className="text-lg font-bold text-white mb-2">
              {ex.prompt}
            </p>
            <p className="text-xl font-black text-white mb-6 leading-tight">
              {ex.sentence}
            </p>

            {/* Answer area */}
            <div className="min-h-[56px] border-b-2 border-duo-dark-lighter mb-6 flex flex-wrap gap-2 pb-2">
              {selectedWords.map((wordObj) => (
                <motion.button
                  key={wordObj.id}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !showFeedback && handleRemoveWord(wordObj)}
                  className="px-3.5 py-2 bg-duo-dark-card border-2 border-duo-dark-lighter rounded-xl
                    text-sm font-extrabold text-white border-b-4"
                >
                  {wordObj.word}
                </motion.button>
              ))}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2">
              {availableWords.map((wordObj, i) => (
                <motion.button
                  key={wordObj.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !showFeedback && handleWordTap(wordObj)}
                  className="px-3.5 py-2 bg-duo-dark-card border-2 border-duo-dark-lighter rounded-xl
                    text-sm font-extrabold text-gray-300 border-b-4 active:border-b-[2px] active:mt-[2px]"
                >
                  {wordObj.word}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom: Check / Feedback */}
      <AnimatePresence mode="wait">
        {showFeedback ? (
          isCorrect ? (
            <motion.div
              key="correct"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-duo-green px-5 py-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#58CC02" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-lg font-black text-white">Correct!</span>
              </div>
              <p className="text-sm font-bold text-white/80 mb-4">{ex.answer}</p>
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-2xl font-black text-base uppercase tracking-wide
                  bg-white text-duo-green border-b-4 border-gray-200"
              >
                {currentIndex < exList.length - 1 ? 'Continue' : 'Finish'}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="incorrect"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className="bg-red-500 px-5 py-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-lg font-black text-white">Incorrect</span>
              </div>
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Correct answer:</p>
              <p className="text-sm font-bold text-white mb-4">{ex.answer}</p>
              <button
                onClick={handleNext}
                className="w-full py-3 rounded-2xl font-black text-base uppercase tracking-wide
                  bg-white text-red-500 border-b-4 border-gray-200"
              >
                {currentIndex < exList.length - 1 ? 'Continue' : 'Finish'}
              </button>
            </motion.div>
          )
        ) : (
          <motion.div
            key="check"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-5 pb-8 pt-4"
          >
            <button
              onClick={handleCheck}
              disabled={selectedWords.length === 0}
              className={`
                w-full py-3.5 rounded-2xl font-black text-base uppercase tracking-wide
                border-b-4 transition-all
                ${selectedWords.length > 0
                  ? 'bg-duo-green border-duo-green-dark text-white'
                  : 'bg-duo-dark-lighter border-duo-dark-card text-gray-600 cursor-not-allowed'
                }
              `}
            >
              Check
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
