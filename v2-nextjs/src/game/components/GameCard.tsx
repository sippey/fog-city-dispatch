'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, PanInfo, useMotionValue, useTransform, animate } from 'framer-motion'
import { DispatchCard } from '@/types'
import { getCardImageUrl } from '@/utils/cardImages'
import { getCardAudioUrl, preloadAudio } from '@/utils/audio'

interface GameCardProps {
  card: DispatchCard
  onSwipe: (direction: 'left' | 'right' | 'up', isKeyboard?: boolean) => void
  onAcceptPowerup?: () => void
  onSwipeDirectionChange?: (direction: 'left' | 'right' | 'up' | null) => void
  shouldStopAudio?: boolean // Signal from parent to stop audio
}

export default function GameCard({ card, onSwipe, onAcceptPowerup, onSwipeDirectionChange, shouldStopAudio }: GameCardProps) {
  const [, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  
  // Motion values for smooth animations
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Reset position when card changes (for new cards after keyboard swipe)
  useEffect(() => {
    x.set(0)
    y.set(0)
  }, [card.id, x, y])

  // Audio handling - load and play audio when card appears
  useEffect(() => {
    const audioUrl = getCardAudioUrl(card)
    
    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    
    // Load and play new audio if available
    if (audioUrl) {
      console.log(`Loading audio for card: ${card.headline}`)
      const audio = preloadAudio(audioUrl)
      audioRef.current = audio
      
      // Set up event listeners
      audio.onplay = () => setIsAudioPlaying(true)
      audio.onpause = () => setIsAudioPlaying(false)
      audio.onended = () => setIsAudioPlaying(false)
      
      // Auto-play with error handling
      audio.play().catch(error => {
        console.log('Auto-play blocked or failed:', error)
        setIsAudioPlaying(false)
      })
    }
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [card])

  // Stop audio when parent signals (e.g., when outcome is triggered)
  useEffect(() => {
    if (shouldStopAudio && audioRef.current) {
      console.log('Stopping audio due to parent signal')
      audioRef.current.pause()
      setIsAudioPlaying(false)
    }
  }, [shouldStopAudio])
  
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
    const swipeThreshold = 80
    const swipeVelocity = 400
    
    // Check for swipe based on distance OR velocity
    const shouldSwipe = Math.abs(offset.x) > swipeThreshold || 
                       Math.abs(offset.y) > swipeThreshold ||
                       Math.abs(velocity.x) > swipeVelocity ||
                       Math.abs(velocity.y) > swipeVelocity
    
    if (shouldSwipe) {
      // Determine swipe direction - prioritize the larger movement
      if (Math.abs(offset.y) > Math.abs(offset.x) && offset.y < 0) {
        onSwipe('up') // Maximum response
      } else if (Math.abs(offset.x) > Math.abs(offset.y)) {
        onSwipe(offset.x < 0 ? 'left' : 'right') // Ignore or Basic
      } else {
        // If unclear direction, reset card
        resetCard()
      }
    } else {
      // No swipe detected, reset card
      resetCard()
    }
  }

  const resetCard = useCallback(() => {
    // Clear any existing timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
      resetTimeoutRef.current = null
    }
    
    // Reset direction immediately
    onSwipeDirectionChange?.(null)
    // Force reset position with stronger spring
    animate(x, 0, { type: 'spring', stiffness: 600, damping: 40 })
    animate(y, 0, { type: 'spring', stiffness: 600, damping: 40 })
  }, [x, y, onSwipeDirectionChange])

  // Animate card swipe for keyboard controls
  const animateSwipe = useCallback((direction: 'left' | 'right' | 'up') => {
    if (isAnimating) return
    setIsAnimating(true)
    
    const animations = {
      left: { x: -window.innerWidth, y: 50, rotate: -25 },
      right: { x: window.innerWidth, y: 50, rotate: 25 },
      up: { x: 0, y: -window.innerHeight, rotate: 5 }
    }
    
    const target = animations[direction]
    
    // Animate the card flying completely off screen
    Promise.all([
      animate(x, target.x, { duration: 0.35, ease: [0.4, 0, 1, 1] }), // Custom easing for acceleration
      animate(y, target.y, { duration: 0.35, ease: [0.4, 0, 1, 1] })
    ]).then(() => {
      // Card is now completely off screen
      // Trigger the swipe and let the outcome show
      onSwipe(direction, true)
      
      // Don't reset position - card stays off screen
      // The next card will start fresh at 0,0
      setIsAnimating(false)
    })
  }, [x, y, onSwipe, isAnimating])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent keyboard controls while animating
      if (isAnimating) return
      
      const isPowerupCard = card.isPowerup === true
      
      if (isPowerupCard) {
        // For powerup cards, any arrow key, space, or enter accepts the bonus
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', ' '].includes(e.key)) {
          e.preventDefault()
          onAcceptPowerup?.()
        }
      } else {
        // For regular cards, arrow keys trigger swipes
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            animateSwipe('left')
            break
          case 'ArrowRight':
            e.preventDefault()
            animateSwipe('right')
            break
          case 'ArrowUp':
            e.preventDefault()
            animateSwipe('up')
            break
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [card.isPowerup, animateSwipe, onAcceptPowerup, isAnimating])


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
  }, [card.id, card.headline, backgroundImageUrl])

  return (
    <div className="relative" style={{ width: 'min(calc(100vw - 10rem), 400px)', maxWidth: '400px' }}>
      {/* Draggable Card */}
      <motion.div
        ref={cardRef}
        className="rounded-2xl p-4 border border-gray-700 flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing"
        style={{ 
          aspectRatio: '6 / 7',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
          filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
          x, 
          y, 
          rotateZ,
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        drag={!isPowerupCard && !isAnimating}
        dragElastic={0.2}
        dragMomentum={false}
        dragConstraints={{ 
          left: -200, 
          right: 200, 
          top: -200, 
          bottom: 100 
        }}
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
          /* Powerup Card - Clean design with bonus info and button */
          <div className="flex-1 flex flex-col justify-center items-center space-y-6 p-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                Bonus Card
              </div>
              <div className="text-6xl font-extrabold text-green-400 drop-shadow-lg">
                +{card.powerupValue}
              </div>
              <div className="text-lg font-bold text-white uppercase tracking-wide drop-shadow-md">
                Readiness
              </div>
            </div>
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

        {/* Audio Visualization Overlay */}
        {isAudioPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4">
            <div className="flex items-end space-x-1">
              {/* Animated waveform bars */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/80 rounded-full"
                  style={{
                    width: '3px',
                    height: '8px',
                    animation: `audioWave 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Audio playing indicator */}
            <div className="absolute bottom-2 right-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-xs font-bold uppercase tracking-wide">
                Audio
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}