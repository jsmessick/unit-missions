import { motion } from 'framer-motion'

const variants = {
  green: {
    bg: 'bg-duo-green',
    shadow: 'border-duo-green-dark',
    text: 'text-white',
  },
  blue: {
    bg: 'bg-duo-blue',
    shadow: 'border-duo-blue-dark',
    text: 'text-white',
  },
  gray: {
    bg: 'bg-duo-gray-light',
    shadow: 'border-duo-gray',
    text: 'text-gray-500',
  },
  white: {
    bg: 'bg-white',
    shadow: 'border-duo-gray-light',
    text: 'text-gray-700',
  },
}

export default function Button({ children, onClick, variant = 'green', disabled, className = '' }) {
  const style = variants[variant]

  return (
    <motion.button
      whileTap={{ y: 3 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-3.5 rounded-2xl font-extrabold text-base tracking-wide uppercase
        border-b-4 ${style.bg} ${style.shadow} ${style.text}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:border-b-[1px]'}
        transition-all ${className}
      `}
    >
      {children}
    </motion.button>
  )
}
