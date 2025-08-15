'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlyingScoreProps {
  score: number
  visible: boolean
  onComplete?: () => void
}

export default function FlyingScore({ score, visible, onComplete }: FlyingScoreProps) {
  useEffect(() => {
    if (visible && onComplete) {
      // Animation completes after 1.2 seconds
      const timer = setTimeout(() => {
        onComplete()
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [visible, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Main flying score */}
          <motion.div
            className={`fixed z-50 pointer-events-none font-extrabold ${
              score >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
            initial={{ 
              top: '45%', 
              left: '50%',
              x: '-50%',
              y: '-50%',
              scale: 2,
              opacity: 0,
              fontSize: '3rem'
            }}
            animate={{ 
              top: '2.5rem', // Position of score in status bar
              left: '17rem', // Updated position after moving score right of deck size
              x: 0,
              y: 0,
              scale: 1,
              opacity: [0, 1, 1, 0],
              fontSize: '1.5rem'
            }}
            transition={{ 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth arc
              opacity: { 
                times: [0, 0.1, 0.8, 1],
                duration: 1
              }
            }}
            style={{
              textShadow: score >= 0 
                ? '0 0 30px rgba(34, 197, 94, 1), 0 0 60px rgba(34, 197, 94, 0.6), 0 2px 4px rgba(0,0,0,0.8)' 
                : '0 0 30px rgba(239, 68, 68, 1), 0 0 60px rgba(239, 68, 68, 0.6), 0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {score >= 0 ? '+' : ''}{score}
          </motion.div>
          
          {/* Particle trail effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`score-particle-${i}`}
              className={`fixed z-40 pointer-events-none rounded-full ${
                score >= 0 ? 'bg-green-400' : 'bg-red-400'
              }`}
              initial={{ 
                top: '45%', 
                left: '50%',
                x: '-50%',
                y: '-50%',
                scale: 0.5,
                opacity: 0.8,
                width: '8px',
                height: '8px'
              }}
              animate={{ 
                top: '2.5rem',
                left: '17rem',
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              style={{
                filter: score >= 0 
                  ? 'blur(2px) drop-shadow(0 0 4px rgba(34, 197, 94, 0.8))' 
                  : 'blur(2px) drop-shadow(0 0 4px rgba(239, 68, 68, 0.8))'
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}