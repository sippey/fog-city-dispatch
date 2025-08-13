'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cardsData } from '@/data/cards'
import { DispatchCard } from '@/types'
import { GameState, INITIAL_GAME_STATE } from './types'
import GameCard from './components/GameCard'
import StatusBar from './components/StatusBar'
import OutcomeDisplay from './components/OutcomeDisplay'

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
  const [cardDeck, setCardDeck] = useState<DispatchCard[]>([])
  const [currentSwipeDirection, setCurrentSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null)

  // Smart shuffle function that maintains story order
  const smartShuffle = (cards: DispatchCard[]): DispatchCard[] => {
    // Group cards by type
    const randomCards = cards.filter(card => card.storyArc === 'Random')
    const powerupCards = cards.filter(card => card.isPowerup === true)
    
    // Group story cards by arc and sort by arcNumber within each arc
    const storyArcs = new Map<string, DispatchCard[]>()
    cards.filter(card => card.storyArc !== 'Random' && !card.isPowerup).forEach(card => {
      if (!storyArcs.has(card.storyArc)) {
        storyArcs.set(card.storyArc, [])
      }
      storyArcs.get(card.storyArc)!.push(card)
    })
    
    // Sort each story arc by arcNumber
    storyArcs.forEach(arc => {
      arc.sort((a, b) => {
        const aNum = parseInt(a.arcNumber || '0')
        const bNum = parseInt(b.arcNumber || '0') 
        return aNum - bNum
      })
    })
    
    // Shuffle random cards and powerup cards
    const shuffledRandom = [...randomCards].sort(() => Math.random() - 0.5)
    const shuffledPowerups = [...powerupCards].sort(() => Math.random() - 0.5)
    
    // Convert story arcs to array and shuffle the order of arcs
    const shuffledStoryArcs = Array.from(storyArcs.values()).sort(() => Math.random() - 0.5)
    
    // Interleave all cards
    const result: DispatchCard[] = []
    const allSources = [shuffledRandom, shuffledPowerups, ...shuffledStoryArcs]
    const indices = new Array(allSources.length).fill(0)
    
    while (result.length < cards.length) {
      // Pick a random source that still has cards
      const availableSources = allSources
        .map((source, i) => ({ source, index: i }))
        .filter(({ source, index }) => indices[index] < source.length)
      
      if (availableSources.length === 0) break
      
      const chosen = availableSources[Math.floor(Math.random() * availableSources.length)]
      result.push(chosen.source[indices[chosen.index]])
      indices[chosen.index]++
    }
    
    return result
  }

  // Initialize game
  useEffect(() => {
    const shuffled = smartShuffle(cardsData)
    setCardDeck(shuffled)
  }, [])

  // Game timer
  useEffect(() => {
    if (!gameState.isGameActive) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1
        
        if (newTimeRemaining <= 0) {
          return { ...prev, timeRemaining: 0, isGameActive: false }
        }
        
        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          readiness: Math.min(prev.capacity, prev.readiness + 1) // +1 readiness every second
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.isGameActive])

  const currentCard = cardDeck[gameState.currentCardIndex]

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    if (!currentCard || gameState.showOutcome) return

    const responseType = direction === 'left' ? 'ignore' : 
                        direction === 'right' ? 'basic' : 'maximum'
    
    const response = currentCard.responses[responseType]
    if (!response) return

    // Check if player can afford this response
    const cost = response.readiness
    if (gameState.readiness + cost < 0) return // Can't afford

    // Update game state with outcome
    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + cost),
      score: prev.score + response.score,
      capacity: prev.capacity + response.capacity,
      cardsHandled: prev.cardsHandled + 1,
      showOutcome: true,
      currentOutcome: response.outcome
    }))
  }

  const handleAcceptPowerup = () => {
    if (!currentCard?.isPowerup || !currentCard.responses.accept) return

    const response = currentCard.responses.accept

    // Update game state with powerup bonus
    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + response.readiness),
      cardsHandled: prev.cardsHandled + 1,
      showOutcome: true,
      currentOutcome: response.outcome
    }))
  }

  const handleOutcomeComplete = useCallback(() => {
    console.log('handleOutcomeComplete called')
    setGameState(prev => {
      const nextIndex = prev.currentCardIndex + 1
      console.log('Current index:', prev.currentCardIndex, 'Next index:', nextIndex)
      
      // Check if we've run out of cards or time
      if (nextIndex >= cardDeck.length || prev.timeRemaining <= 0) {
        console.log('Game ending - out of cards or time')
        return { ...prev, showOutcome: false, isGameActive: false }
      }
      
      console.log('Moving to next card')
      return {
        ...prev,
        currentCardIndex: nextIndex,
        showOutcome: false,
        currentOutcome: ''
      }
    })
  }, [cardDeck.length])

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading game...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-sans flex flex-col relative overflow-hidden">
      <StatusBar
        readiness={gameState.readiness}
        capacity={gameState.capacity}
        score={gameState.score}
        timeRemaining={gameState.timeRemaining}
      />
      
      {/* IGNORE tab - flush against left viewport edge */}
      <div className="absolute top-1/2 transform -translate-y-1/2 z-20" style={{ left: '-60px' }}>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <div className={`py-3 px-3 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[150px] text-center flex items-center justify-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-400 text-gray-200 opacity-40' 
              : `bg-green-500 text-white ${currentSwipeDirection === 'left' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">IGNORE</span>
          </div>
        </div>
      </div>

      {/* BASIC tab - flush against right viewport edge */}
      <div className="absolute top-1/2 transform -translate-y-1/2 z-20" style={{ right: '-60px' }}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <div className={`py-3 px-2 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[150px] text-center flex items-center justify-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-400 text-gray-200 opacity-40' 
              : `bg-blue-500 text-white ${currentSwipeDirection === 'right' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">BASIC</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center p-8 relative">
        {/* Maximum label at top of card area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`px-2 py-2 rounded-b-lg shadow-lg transition-opacity duration-200 w-[150px] text-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-400 text-gray-200 opacity-40' 
              : `bg-red-500 text-white ${currentSwipeDirection === 'up' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">MAXIMUM</span>
          </div>
        </div>

        {!gameState.showOutcome && (
          <GameCard
            card={currentCard}
            onSwipe={handleSwipe}
            onAcceptPowerup={handleAcceptPowerup}
            onSwipeDirectionChange={setCurrentSwipeDirection}
          />
        )}
      </div>
      
      <OutcomeDisplay
        message={gameState.currentOutcome}
        visible={gameState.showOutcome}
        onComplete={handleOutcomeComplete}
      />
    </div>
  )
}