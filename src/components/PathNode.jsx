import { motion } from 'framer-motion'

export default function PathNode({ index, status, label, onClick, delay = 0 }) {
  const isCompleted = status === 'completed'
  const isMission = status === 'mission'
  const isLocked = status === 'locked'

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.1, type: 'spring', stiffness: 300 }}
      className="relative flex flex-col items-center"
      onClick={isMission ? onClick : undefined}
    >
      {/* Pulse ring for mission node */}
      {isMission && (
        <div className="absolute w-[72px] h-[72px] rounded-full bg-duo-green/30 pulse-ring" />
      )}

      {/* Node circle */}
      <div
        className={`
          relative w-[60px] h-[60px] rounded-full flex items-center justify-center
          border-b-4 transition-all
          ${isCompleted
            ? 'bg-duo-green border-duo-green-dark'
            : isMission
              ? 'bg-duo-green border-duo-green-dark cursor-pointer'
              : 'bg-duo-gray-light border-duo-gray'
          }
        `}
      >
        {isCompleted && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {isMission && (
          <span className="text-white text-lg">⭐</span>
        )}
        {isLocked && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" fill="#AFAFAF" />
            <path d="M8 11V7a4 4 0 018 0v4" stroke="#AFAFAF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Label */}
      {label && (
        <span className={`
          mt-1.5 text-xs font-extrabold uppercase tracking-wide
          ${isMission ? 'text-duo-green' : isCompleted ? 'text-gray-400' : 'text-gray-300'}
        `}>
          {label}
        </span>
      )}
    </motion.div>
  )
}
