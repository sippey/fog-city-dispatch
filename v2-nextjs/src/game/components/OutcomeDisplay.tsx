'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface OutcomeDisplayProps {
  message: string
  visible: boolean
  onComplete: () => void
}

export default function OutcomeDisplay({ message, visible, onComplete }: OutcomeDisplayProps) {
  useEffect(() => {
    console.log('OutcomeDisplay useEffect - visible:', visible)
    if (visible) {
      console.log('Setting timer to hide outcome in 1 second')
      const timer = setTimeout(() => {
        console.log('Timer fired - calling onComplete')
        onComplete()
      }, 1000) // Show for 1 second
      return () => {
        console.log('Cleaning up timer')
        clearTimeout(timer)
      }
    }
  }, [visible, onComplete])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ 
            type: 'spring', 
            stiffness: 260, 
            damping: 20,
            duration: 0.3
          }}
        >
          <div className="bg-black/90 backdrop-blur-md rounded-2xl px-8 py-5 max-w-sm shadow-2xl border border-white/20">
            <motion.p 
              className="text-white text-center font-semibold text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.25 }}
              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
              {message}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}