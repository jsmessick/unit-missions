import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { exercises } from '../data/exercises'
import Button from './Button'

const tabs = ['travel', 'social', 'professional']

export default function ExerciseComparison({ selectedLens, onContinue }) {
  const initialTab = tabs.includes(selectedLens) ? selectedLens : 'travel'
  const [activeTab, setActiveTab] = useState(initialTab)
  const ex = exercises[activeTab]

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 pt-4 pb-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-black text-gray-800">How Lenses Work</h2>
          <span className="text-xs font-bold text-gray-400 bg-duo-gray-bg px-2 py-1 rounded-full">
            {ex.grammar}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const t = exercises[tab]
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 py-2.5 text-sm font-extrabold rounded-t-xl transition-all
                  ${isActive
                    ? 'bg-duo-green text-white'
                    : 'bg-duo-gray-bg text-gray-400 hover:text-gray-600'
                  }
                `}
              >
                {t.emoji} {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Exercise content */}
      <div className="flex-1 px-6 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Exercise prompt */}
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">
              {ex.prompt}
            </p>
            <p className="text-xl font-black text-gray-800 mb-6 leading-tight">
              {ex.sentence}
            </p>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2 mb-6">
              {ex.words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl
                    text-sm font-extrabold text-gray-700 border-b-4"
                >
                  {word}
                </motion.span>
              ))}
            </div>

            {/* Answer preview */}
            <div className="bg-duo-green/10 rounded-duo p-4 border border-duo-green/20">
              <p className="text-xs font-bold text-duo-green-dark uppercase tracking-wide mb-1">
                Answer
              </p>
              <p className="text-base font-extrabold text-gray-800">{ex.answer}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Annotation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2">
            <span className="text-yellow-600 text-sm">💡</span>
            <span className="text-sm font-extrabold text-yellow-700">
              Same grammar. Different world.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Continue button */}
      <div className="px-6 pb-8 pt-4">
        <Button onClick={onContinue}>Continue</Button>
      </div>
    </div>
  )
}
