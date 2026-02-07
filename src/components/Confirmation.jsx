import { motion } from 'framer-motion'
import { lenses } from '../data/lenses'
import { exercisePreview } from '../data/exercises'
import Button from './Button'

export default function Confirmation({ selectedLens, onStart, onReset }) {
  const lens = lenses.find(l => l.id === selectedLens) || lenses[0]

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6">
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-20 h-20 bg-duo-green rounded-full flex items-center justify-center mb-4"
      >
        <span className="text-3xl">⭐</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="text-2xl font-black text-gray-800 text-center mb-1"
      >
        Mission: City Life
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-base font-bold text-gray-500 mb-8"
      >
        {lens.emoji} {lens.title} Focus
      </motion.p>

      {/* Exercise preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full bg-duo-gray-bg rounded-duo p-4 mb-8"
      >
        <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wide mb-3">
          Your next exercises
        </p>
        <div className="space-y-3">
          {exercisePreview.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-center gap-3 bg-white rounded-xl p-3 border-b-2 border-gray-100"
            >
              <div className="w-10 h-10 bg-duo-green/10 rounded-full flex items-center justify-center">
                <span className="text-lg">{ex.icon}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-extrabold text-gray-800">{ex.label}</p>
                <p className="text-xs font-bold text-gray-400">{ex.type}</p>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-200" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="w-full space-y-3">
        <Button onClick={onStart}>Let's Go!</Button>
        <button
          onClick={onReset}
          className="w-full py-3 text-sm font-bold text-gray-400"
        >
          ← Back to path
        </button>
      </div>
    </div>
  )
}
