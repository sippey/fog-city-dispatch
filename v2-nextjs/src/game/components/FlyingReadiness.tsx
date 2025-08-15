'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FlyingReadinessProps {
  readiness: number
  visible: boolean
  onComplete?: () => void
  targetPosition?: DOMRect | null
  isMobileLayout?: boolean
}

export default function FlyingReadiness({ readiness, visible, onComplete, targetPosition, isMobileLayout = false }: FlyingReadinessProps) {
  // Calculate target position from DOMRect or use fallback
  const getTargetPosition = () => {
    // Check if we have a valid DOM position (not empty rect)
    if (targetPosition && targetPosition.width > 0 && targetPosition.height > 0) {
      return {
        top: `${targetPosition.top + targetPosition.height / 2}px`,
        left: `${targetPosition.left + targetPosition.width / 2}px`
      }
    }
    // Fallback to original hardcoded positions based on layout
    const fallbackPosition = isMobileLayout ? {
      top: '4.5rem', // Bottom row in mobile (readiness bar area)
      left: '15%'     // Left side where "Readiness" label is
    } : {
      top: '2.5rem',
      left: '80%' // Desktop position
    }
    
    
    return fallbackPosition
  }
  
  const target = getTargetPosition()
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
          {/* Main flying readiness */}
          <motion.div
            className={`fixed z-50 pointer-events-none font-extrabold ${
              readiness >= 0 ? 'text-blue-400' : 'text-red-400'
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
              top: target.top,
              left: target.left,
              x: '-50%',
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
              textShadow: readiness >= 0 
                ? '0 0 30px rgba(59, 130, 246, 1), 0 0 60px rgba(59, 130, 246, 0.6), 0 2px 4px rgba(0,0,0,0.8)' 
                : '0 0 30px rgba(239, 68, 68, 1), 0 0 60px rgba(239, 68, 68, 0.6), 0 2px 4px rgba(0,0,0,0.8)'
            }}
          >
            {readiness >= 0 ? '+' : ''}{readiness}
          </motion.div>
          
          {/* Particle trail effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`readiness-particle-${i}`}
              className={`fixed z-40 pointer-events-none rounded-full ${
                readiness >= 0 ? 'bg-blue-400' : 'bg-red-400'
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
                top: target.top,
                left: target.left,
                x: '-50%',
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
                filter: readiness >= 0 
                  ? 'blur(2px) drop-shadow(0 0 4px rgba(59, 130, 246, 0.8))' 
                  : 'blur(2px) drop-shadow(0 0 4px rgba(239, 68, 68, 0.8))'
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}