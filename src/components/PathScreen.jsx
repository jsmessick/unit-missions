import { motion } from 'framer-motion'
import PathNode from './PathNode'

const nodes = [
  { status: 'completed', icon: 'star' },
  { status: 'completed', icon: 'book' },
  { status: 'completed', icon: 'headphones' },
  { status: 'completed', icon: 'mic' },
  { status: 'mission', icon: 'star' },
  { status: 'locked', icon: 'lock' },
]

// Zigzag X offsets
const offsets = [0, 55, 0, -55, 0, 55]

export default function PathScreen({ onStartMission }) {
  return (
    <div className="min-h-[100dvh] bg-duo-dark flex flex-col">
      {/* Unit header — orange banner */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-duo-orange text-white text-center py-3.5 px-6 rounded-b-2xl mx-3 mt-1"
      >
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">Section 3, Unit 4</p>
        <h1 className="text-lg font-black">City Life</h1>
      </motion.div>

      {/* Path */}
      <div className="flex-1 flex flex-col items-center pt-10 pb-24 relative">
        {/* Connecting lines */}
        <svg
          className="absolute top-10 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {nodes.slice(0, -1).map((_, i) => {
            const centerX = 215
            const x1 = centerX + offsets[i]
            const x2 = centerX + offsets[i + 1]
            const y1 = 30 + i * 95 + 31
            const y2 = 30 + (i + 1) * 95 + 31
            const nextIsLocked = nodes[i + 1].status === 'locked'
            return (
              <line
                key={i}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
                stroke={nextIsLocked ? '#233A42' : '#E08600'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={nextIsLocked ? '8 8' : 'none'}
                opacity={nextIsLocked ? 0.5 : 0.4}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => (
          <div
            key={i}
            className="relative z-10"
            style={{
              transform: `translateX(${offsets[i]}px)`,
              marginBottom: i < nodes.length - 1 ? '33px' : 0,
            }}
          >
            <PathNode
              status={node.status}
              icon={node.icon}
              onClick={node.status === 'mission' ? onStartMission : undefined}
              delay={i}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
