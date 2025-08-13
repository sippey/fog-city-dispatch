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
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 max-w-xs mx-4 shadow-2xl"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 25,
              opacity: { duration: 0.2 }
            }}
          >
            <motion.p 
              className="text-base font-bold text-gray-800 text-center leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}