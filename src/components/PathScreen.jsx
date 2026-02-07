import { motion } from 'framer-motion'
import PathNode from './PathNode'

const nodes = [
  { status: 'completed', label: 'Greetings' },
  { status: 'completed', label: 'Phrases' },
  { status: 'completed', label: 'Travel' },
  { status: 'completed', label: 'Family' },
  { status: 'mission', label: 'Mission' },
  { status: 'locked', label: null },
]

// Zigzag X offsets for the path
const offsets = [0, 60, 0, -60, 0, 60]

export default function PathScreen({ onStartMission }) {
  return (
    <div className="min-h-[100dvh] bg-white flex flex-col">
      {/* Unit header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-duo-green text-white text-center py-4 px-6"
      >
        <p className="text-sm font-bold uppercase tracking-wider opacity-80">Unit 5</p>
        <h1 className="text-2xl font-black">City Life</h1>
        <p className="text-sm font-bold opacity-80 mt-0.5">Navigate your city in Spanish</p>
      </motion.div>

      {/* Path */}
      <div className="flex-1 flex flex-col items-center pt-10 pb-20 relative">
        {/* Connecting line SVG */}
        <svg
          className="absolute top-10 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0 }}
        >
          {nodes.slice(0, -1).map((_, i) => {
            const centerX = 215
            const x1 = centerX + offsets[i]
            const x2 = centerX + offsets[i + 1]
            const y1 = 30 + i * 100 + 30
            const y2 = 30 + (i + 1) * 100 + 30
            const isCompleted = nodes[i].status === 'completed' && nodes[i + 1].status !== 'locked'
            return (
              <line
                key={i}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
                stroke={isCompleted ? '#58CC02' : '#E5E5E5'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={isCompleted ? 'none' : '8 8'}
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
              marginBottom: i < nodes.length - 1 ? '40px' : 0,
            }}
          >
            <PathNode
              index={i}
              status={node.status}
              label={node.label}
              onClick={node.status === 'mission' ? onStartMission : undefined}
              delay={i}
            />
          </div>
        ))}
      </div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-3 text-center"
        style={{ maxWidth: 430, margin: '0 auto' }}
      >
        <p className="text-sm text-gray-400 font-bold">
          Tap the ⭐ Mission node to begin
        </p>
      </motion.div>
    </div>
  )
}
