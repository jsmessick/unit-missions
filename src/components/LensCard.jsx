import { motion } from 'framer-motion'

export default function LensCard({ lens, isSelected, onSelect, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.06 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(lens.id)}
      className={`
        w-full flex items-center gap-3.5 p-3.5 rounded-xl text-left transition-all border-2
        ${isSelected
          ? 'bg-duo-dark-lighter border-duo-green'
          : 'bg-duo-dark border-duo-dark-lighter'
        }
      `}
    >
      <span className="text-2xl flex-shrink-0">{lens.emoji}</span>
      <div className="flex-1 min-w-0">
        <div className={`font-extrabold text-sm ${isSelected ? 'text-white' : 'text-gray-300'}`}>
          {lens.title}
        </div>
        <div className="text-xs font-bold text-gray-500 leading-tight mt-0.5">
          {lens.description}
        </div>
      </div>
      {isSelected && (
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
  )
}
