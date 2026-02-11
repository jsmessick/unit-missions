import { motion } from 'framer-motion'
import { lenses } from '../data/lenses'

export default function MissionComplete({ onContinue, lensId = 'travel' }) {
  const lens = lenses.find(l => l.id === lensId) || lenses[0]

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
        onClick={onContinue}
        className="w-full py-3.5 rounded-2xl font-black text-base uppercase tracking-wide
          bg-duo-green border-b-4 border-duo-green-dark text-white"
      >
        Continue
      </motion.button>
    </div>
  )
}
