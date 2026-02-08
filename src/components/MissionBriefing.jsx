import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { lenses } from '../data/lenses'
import LensCard from './LensCard'

export default function MissionBriefing({ onClose, onStartMission, onSkip }) {
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
        className="fixed inset-0 bg-black/60 z-40"
        style={{ maxWidth: 430, margin: '0 auto' }}
      />

      {/* Dark bottom sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 bg-duo-dark-card rounded-t-3xl z-50 max-h-[85dvh] overflow-y-auto"
        style={{ maxWidth: 430, margin: '0 auto' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-600 rounded-full" />
        </div>

        <div className="px-5 pt-3 pb-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">⭐</span>
              <h2 className="text-xl font-black text-white">Mission: City Life</h2>
            </div>
          </div>

          {/* In this mission — communicative context */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-extrabold mb-2">
              In this mission
            </p>
            <p className="text-sm text-gray-300 font-bold leading-snug mb-3">
              Ask for directions, order at restaurants, and describe what's happening around you
            </p>
            <div className="bg-duo-dark rounded-xl p-3 space-y-3">
              <div>
                <p className="text-sm text-white font-bold">"Estoy buscando la estación de tren"</p>
                <p className="text-xs text-gray-400 mt-0.5">I am looking for the train station</p>
              </div>
              <div>
                <p className="text-sm text-white font-bold">"Ella está esperando el autobús"</p>
                <p className="text-xs text-gray-400 mt-0.5">She is waiting for the bus</p>
              </div>
            </div>
          </div>

          {/* Lens picker label */}
          <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">
            Choose your focus
          </p>

          {/* Lens cards — vertical list */}
          <div className="space-y-2.5 mb-5">
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

          {/* START button */}
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
                  onClick={handleStart}
                  className="w-full py-3.5 rounded-2xl font-black text-base uppercase tracking-wide
                    bg-duo-green border-b-4 border-duo-green-dark text-white cursor-pointer mb-3"
                >
                  Start Mission
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Skip link */}
          <button
            onClick={onSkip}
            className="w-full py-2 text-sm font-bold text-gray-500"
          >
            Skip — surprise me
          </button>
        </div>
      </motion.div>
    </>
  )
}
