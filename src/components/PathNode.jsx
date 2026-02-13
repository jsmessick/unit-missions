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
      {/* Lesson indicator arcs on right side of mission node */}
      {isMission && (
        <>
          <svg
            className="absolute pointer-events-none"
            width="82" height="82"
            viewBox="0 0 82 82"
            style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {[0, 1, 2, 3, 4].map((i) => {
              const cx = 41, cy = 41, r = 37
              const gapDeg = 18
              const segDeg = (360 - 5 * gapDeg) / 5
              const startAngle = -90 + i * (segDeg + gapDeg)
              const endAngle = startAngle + segDeg
              const rad = Math.PI / 180
              const x1 = cx + r * Math.cos(startAngle * rad)
              const y1 = cy + r * Math.sin(startAngle * rad)
              const x2 = cx + r * Math.cos(endAngle * rad)
              const y2 = cy + r * Math.sin(endAngle * rad)
              const d = `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`
              const isSpecial = i < 5
              return isSpecial ? (
                <g key={i}>
                  <path d={d} stroke="#E08600" strokeWidth={7} strokeLinecap="round" fill="none" />
                  <path d={d} stroke="#1A2E35" strokeWidth={3} strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <path key={i} d={d} stroke="#3C5A64" strokeWidth={5} strokeLinecap="round" fill="none" />
              )
            })}
          </svg>
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
