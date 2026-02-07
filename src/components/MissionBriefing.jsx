import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lenses } from '../data/lenses'
import LensCard from './LensCard'
import Button from './Button'

export default function MissionBriefing({ onClose, onStartMission }) {
  const [selectedLens, setSelectedLens] = useState(null)

  const handleStart = () => {
    if (selectedLens) {
      onStartMission(selectedLens)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-40"
        style={{ maxWidth: 430, margin: '0 auto' }}
      />

      {/* Bottom sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[88dvh] overflow-y-auto"
        style={{ maxWidth: 430, margin: '0 auto' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="px-6 pb-8">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="text-3xl mb-2">⭐</div>
            <h2 className="text-xl font-black text-gray-800">Mission: City Life</h2>
            <p className="text-sm text-gray-500 font-bold mt-1">Choose how you want to learn</p>
          </div>

          {/* Grounding section */}
          <div className="bg-duo-gray-bg rounded-duo p-4 mb-5">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">Mastered</p>
                <p className="text-sm font-bold text-gray-700">
                  Basic nouns, present tense, ser vs estar
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-duo-blue rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs">→</span>
              </div>
              <div>
                <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wide">Horizon</p>
                <p className="text-sm font-bold text-gray-700">
                  Present progressive (estar + gerund)
                </p>
              </div>
            </div>
          </div>

          {/* Lens description */}
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
            Pick your focus
          </p>

          {/* Lens cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {lenses.map((lens, i) => (
              <LensCard
                key={lens.id}
                lens={lens}
                isSelected={selectedLens === lens.id}
                onSelect={setSelectedLens}
                delay={i}
              />
            ))}
          </div>

          {/* Selected lens description */}
          <AnimatePresence>
            {selectedLens && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <p className="text-center text-sm text-gray-500 font-bold">
                  Same grammar goal. Your vocabulary gets themed to{' '}
                  <span className="text-gray-800">
                    {lenses.find(l => l.id === selectedLens)?.title.toLowerCase()}
                  </span>{' '}
                  situations.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Start button */}
          <Button
            onClick={handleStart}
            disabled={!selectedLens}
            variant={selectedLens ? 'green' : 'gray'}
          >
            Start Mission
          </Button>
        </div>
      </motion.div>
    </>
  )
}
