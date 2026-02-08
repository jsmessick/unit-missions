import { motion } from 'framer-motion'

const nodeIcons = {
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15zM6.5 4a.5.5 0 00-.5.5v13.034A2.5 2.5 0 016.5 17H18V4H6.5z"/>
    </svg>
  ),
  headphones: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M12 3a9 9 0 00-9 9v4a3 3 0 003 3h1a1 1 0 001-1v-5a1 1 0 00-1-1H5v-1a7 7 0 0114 0v1h-2a1 1 0 00-1 1v5a1 1 0 001 1h1a3 3 0 003-3v-4a9 9 0 00-9-9z"/>
    </svg>
  ),
  mic: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M12 1a4 4 0 00-4 4v6a4 4 0 008 0V5a4 4 0 00-4-4zm-6 10a6 6 0 0012 0h2a8 8 0 01-7 7.93V22h-2v-3.07A8 8 0 014 11h2z"/>
    </svg>
  ),
  star: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
      <path d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.56 5.82 22 7 14.41l-5-5.14 7.1-1.01L12 2z"/>
    </svg>
  ),
  lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#3C5A64">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="#3C5A64" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  compass: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
      <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" fill="white" />
    </svg>
  ),
}

export default function PathNode({ status, icon = 'star', onClick, delay = 0, badge }) {
  const isCompleted = status === 'completed'
  const isMission = status === 'mission'
  const isLocked = status === 'locked'
  const isCompass = status === 'compass'
  const isCompassDone = status === 'compass-done'
  const isTappable = isMission || isCompass || isCompassDone

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.1, type: 'spring', stiffness: 300 }}
      className="relative flex flex-col items-center"
      onClick={isTappable ? onClick : undefined}
    >
      {/* Purple orbiting ring for mission node */}
      {isMission && (
        <>
          <div className="absolute w-[76px] h-[76px] rounded-full border-[3px] border-duo-purple/40" />
          <div className="absolute w-[76px] h-[76px] orbit-ring">
            <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-duo-purple" />
            <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-duo-purple/60" />
            <div className="absolute top-1/2 -right-[4px] -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-duo-purple/40" />
          </div>
          <div className="absolute w-[86px] h-[86px] rounded-full bg-duo-purple/20 pulse-ring" />
        </>
      )}

      {/* Teal orbiting ring for compass node (active, no lenses done) */}
      {isCompass && (
        <>
          <div className="absolute w-[76px] h-[76px] rounded-full border-[3px] border-teal-400/40" />
          <div className="absolute w-[76px] h-[76px] orbit-ring">
            <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] rounded-full bg-teal-400" />
            <div className="absolute -bottom-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-teal-400/60" />
            <div className="absolute top-1/2 -right-[4px] -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-teal-400/40" />
          </div>
          <div className="absolute w-[86px] h-[86px] rounded-full bg-teal-400/20 pulse-ring" />
        </>
      )}

      {/* Node circle */}
      <div
        className={`
          relative w-[62px] h-[62px] rounded-full flex items-center justify-center
          border-b-[5px] transition-all
          ${isCompleted || isCompassDone
            ? 'bg-duo-orange border-duo-orange-dark'
            : isMission || isCompass
              ? 'bg-duo-orange border-duo-orange-dark cursor-pointer'
              : 'bg-duo-dark-card border-duo-dark-lighter'
          }
          ${isCompassDone ? 'cursor-pointer' : ''}
        `}
      >
        {isCompleted && nodeIcons[icon]}
        {isMission && nodeIcons.star}
        {(isCompass || isCompassDone) && nodeIcons.compass}
        {isLocked && nodeIcons.lock}
      </div>

      {/* Badge below compass-done node showing remaining lenses */}
      {isCompassDone && badge && (
        <p className="text-xs text-gray-400 font-bold mt-1.5">{badge}</p>
      )}
    </motion.div>
  )
}
