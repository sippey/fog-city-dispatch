'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { DispatchCard } from '@/types'

interface GameCardProps {
  card: DispatchCard
  onSwipe: (direction: 'left' | 'right' | 'up') => void
  onAcceptPowerup?: () => void
  onSwipeDirectionChange?: (direction: 'left' | 'right' | 'up' | null) => void
}

export default function GameCard({ card, onSwipe, onAcceptPowerup, onSwipeDirectionChange }: GameCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for smooth animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Transform motion values to determine swipe direction and visual feedback
  const rotateZ = useTransform(x, [-150, 0, 150], [-10, 0, 10])
  const opacity = useTransform([x, y], (values: number[]) => {
    const [xVal, yVal] = values
    const distance = Math.sqrt(xVal * xVal + yVal * yVal)
    return Math.max(0.7, 1 - distance / 200)
  })

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

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative w-full max-w-sm mx-auto px-8">
        

        {/* Draggable Card */}
        <motion.div
          ref={cardRef}
          className="relative bg-white rounded-2xl p-4 shadow-xl border-0 h-[24rem] flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
          style={{ 
            x, 
            y, 
            rotateZ,
            background: card.storyArc !== 'Random' 
              ? 'linear-gradient(to bottom right, #ffffff, #fef7cd)' 
              : 'linear-gradient(to bottom right, #ffffff, #dbeafe)'
          }}
          drag={!isPowerupCard}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragElastic={1}
          dragSnapToOrigin={true}
          whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {/* Location - top right */}
          <div className="absolute top-3 right-3">
            <div className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium text-gray-600">
              📍 {card.location}
            </div>
          </div>
          
          {/* Card Content */}
          {isPowerupCard ? (
            /* Powerup Card - Compact Layout */
            <div className="flex-1 flex flex-col justify-center text-center space-y-4 mt-8">
              <h2 className="text-lg font-extrabold text-gray-800 leading-tight pr-20">
                {card.headline}
              </h2>
              
              <p className="text-gray-600 leading-relaxed font-medium text-sm px-2">
                {card.description}
              </p>

              {/* Readiness Bonus Display */}
              <div className="space-y-1">
                <div className="text-3xl font-extrabold text-green-500">
                  +{card.powerupValue}
                </div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Readiness
                </div>
              </div>

              {/* Accept Button */}
              <button
                onClick={onAcceptPowerup}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl text-base uppercase tracking-wide shadow-lg transition-all duration-200 transform hover:scale-105 whitespace-nowrap"
              >
                Accept Bonus
              </button>
            </div>
          ) : !currentDirection ? (
            <div className="flex-1 flex flex-col justify-end text-left px-2 pb-4 overflow-hidden">
              <h2 className="text-lg md:text-xl font-extrabold mb-2 text-gray-800 leading-tight line-clamp-2">
                {card.headline}
              </h2>
              
              <p className="text-gray-600 leading-relaxed font-medium text-xs md:text-sm line-clamp-6 overflow-hidden">
                {card.description}
              </p>
            </div>
          ) : (
            /* Dramatic Score Display */
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
              <div className="text-2xl font-black text-gray-700 uppercase tracking-widest">
                {currentDirection === 'left' ? 'Ignoring Call' : 
                 currentDirection === 'right' ? 'Basic Response' : 
                 'Maximum Response'}
              </div>
              
              {activeResponse && (
                <>
                  <div className="space-y-6">
                    <div className={`text-6xl font-extrabold ${activeResponse.readiness < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {activeResponse.readiness > 0 ? '+' : ''}{activeResponse.readiness}
                    </div>
                    <div className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                      Readiness
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-extrabold text-emerald-500">
                      +{activeResponse.score}
                    </div>
                    <div className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                      Points
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}