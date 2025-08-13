'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion'
import { DispatchCard } from '@/types'
import { getCardImageUrl } from '@/utils/unsplash'

interface GameCardProps {
  card: DispatchCard
  onSwipe: (direction: 'left' | 'right' | 'up') => void
  onAcceptPowerup?: () => void
  onSwipeDirectionChange?: (direction: 'left' | 'right' | 'up' | null) => void
}

export default function GameCard({ card, onSwipe, onAcceptPowerup, onSwipeDirectionChange }: GameCardProps) {
  const [, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for smooth animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Transform motion values to determine swipe direction and visual feedback
  const rotateZ = useTransform(x, [-150, 0, 150], [-10, 0, 10])
  
  // Determine current swipe direction and show appropriate feedback
  const getSwipeDirection = (offsetX: number, offsetY: number) => {
    const threshold = 2 // Extremely low threshold for immediate preview
    
    if (Math.abs(offsetY) > threshold && Math.abs(offsetY) > Math.abs(offsetX)) {
      return offsetY < 0 ? 'up' : null
    } else if (Math.abs(offsetX) > threshold) {
      return offsetX < 0 ? 'left' : 'right'
    }
    return null
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    
    const { offset, velocity } = info
    const swipeThreshold = 100
    const swipeVelocity = 500
    
    // Check for swipe based on distance OR velocity
    const shouldSwipe = Math.abs(offset.x) > swipeThreshold || 
                       Math.abs(offset.y) > swipeThreshold ||
                       Math.abs(velocity.x) > swipeVelocity ||
                       Math.abs(velocity.y) > swipeVelocity
    
    if (shouldSwipe) {
      // Determine swipe direction
      if (Math.abs(offset.y) > Math.abs(offset.x) && offset.y < 0) {
        onSwipe('up') // Maximum response
      } else if (Math.abs(offset.x) > Math.abs(offset.y)) {
        onSwipe(offset.x < 0 ? 'left' : 'right') // Ignore or Basic
      }
    } else {
      // Reset direction immediately if not swiping
      onSwipeDirectionChange?.(null)
      // Smoothly animate back to origin
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 })
      animate(y, 0, { type: 'spring', stiffness: 400, damping: 30 })
    }
  }

  const currentDirection = getSwipeDirection(x.get(), y.get())
  
  // Notify parent of direction changes
  useEffect(() => {
    onSwipeDirectionChange?.(currentDirection)
  }, [currentDirection, onSwipeDirectionChange])

  // Get response based on current direction for preview
  const getActiveResponse = () => {
    switch(currentDirection) {
      case 'left': return card.responses.ignore
      case 'right': return card.responses.basic
      case 'up': return card.responses.maximum
      default: return null
    }
  }

  const activeResponse = getActiveResponse()

  const isPowerupCard = card.isPowerup === true
  const backgroundImageUrl = getCardImageUrl(card)
  
  // Debug: log URL only when card changes
  useEffect(() => {
    console.log(`Card ${card.id} (${card.headline}): ${backgroundImageUrl}`)
  }, [card.id, backgroundImageUrl])

  return (
    <div className="relative" style={{ width: 'min(60vw, 280px)' }}>
      {/* Draggable Card */}
      <motion.div
        ref={cardRef}
        className="rounded-2xl p-4 border border-gray-700 flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ 
          height: 'min(70vh, 400px)',
          width: 'min(60vw, 280px)',
          aspectRatio: '6 / 7',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
          x, 
          y, 
          rotateZ,
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        drag={!isPowerupCard}
        dragElastic={0.8}
        dragMomentum={false}
        whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Location - top right */}
        <div className="absolute top-3 right-3">
          <div className="bg-black/80 px-2 py-1 rounded-full text-xs font-medium text-gray-300">
            📍 {card.location}
          </div>
        </div>
        
        {/* Card Content */}
        {isPowerupCard ? (
          /* Powerup Card - Clean with button */
          <div className="flex-1 flex flex-col justify-center items-center">
            <button
              onClick={onAcceptPowerup}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg uppercase tracking-wide shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
            >
              Accept Bonus
            </button>
          </div>
        ) : !currentDirection ? (
          /* Just show location badge - text moved below card */
          <div className="flex-1 flex flex-col justify-start">
            {/* Location badge will be positioned by the absolute div above */}
          </div>
        ) : (
          /* Dramatic Score Display */
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
            <div className="text-2xl font-black text-white uppercase tracking-widest drop-shadow-lg">
              {currentDirection === 'left' ? 'Ignoring Call' : 
               currentDirection === 'right' ? 'Basic Response' : 
               'Maximum Response'}
            </div>
            
            {activeResponse && (
              <>
                <div className="space-y-6">
                  <div className={`text-6xl font-extrabold drop-shadow-lg ${activeResponse.readiness < 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {activeResponse.readiness > 0 ? '+' : ''}{activeResponse.readiness}
                  </div>
                  <div className="text-lg font-bold text-white uppercase tracking-wide drop-shadow-md">
                    Readiness
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-extrabold text-emerald-400 drop-shadow-lg">
                    +{activeResponse.score}
                  </div>
                  <div className="text-lg font-bold text-white uppercase tracking-wide drop-shadow-md">
                    Points
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}