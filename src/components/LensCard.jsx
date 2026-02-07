import { motion } from 'framer-motion'

export default function LensCard({ lens, isSelected, onSelect, delay = 0 }) {
  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.08, type: 'spring', stiffness: 400 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onSelect(lens.id)}
      className={`
        relative p-4 rounded-duo border-2 text-left transition-all
        ${isSelected ? lens.activeColor : lens.color}
      `}
    >
      <div className="text-2xl mb-1">{lens.emoji}</div>
      <div className="font-extrabold text-gray-800 text-sm">{lens.title}</div>
      <div className="text-xs text-gray-500 font-bold mt-0.5 leading-tight">
        {lens.description}
      </div>

      {isSelected && (
        <motion.div
          layoutId="lens-check"
          className="absolute top-2 right-2 w-5 h-5 bg-duo-green rounded-full flex items-center justify-center"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  )
}
