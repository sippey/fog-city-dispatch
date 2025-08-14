'use client'

import { useState, useEffect, useCallback } from 'react'
// import { motion } from 'framer-motion' // Unused
import { cardsData } from '@/data/cards'
import { DispatchCard } from '@/types'
import { GameState, INITIAL_GAME_STATE } from './types'
import GameCard from './components/GameCard'
import StatusBar from './components/StatusBar'
import OutcomeDisplay from './components/OutcomeDisplay'
import GameResults from './components/GameResults'
import { getCardImageUrl } from '@/utils/unsplash'
import { initializeStoryProgress, updateStoryProgress } from './gameLogic'

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
  const [cardDeck, setCardDeck] = useState<DispatchCard[]>([])
  const [currentSwipeDirection, setCurrentSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null)
  const [isAnimatingSwipe, setIsAnimatingSwipe] = useState(false)

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
    setGameState(prev => ({
      ...prev,
      deckSize: shuffled.length
    }))
  }, [])

  // Game timer
  useEffect(() => {
    if (!gameState.isGameActive) return

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1
        
        if (newTimeRemaining <= 0) {
          return { ...prev, timeRemaining: 0, isGameActive: false, showResults: true }
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
  const backgroundImageUrl = currentCard ? getCardImageUrl(currentCard) : null

  const handleSwipe = (direction: 'left' | 'right' | 'up', isKeyboard: boolean = false) => {
    if (!currentCard || gameState.showOutcome) return

    const responseType = direction === 'left' ? 'ignore' : 
                        direction === 'right' ? 'basic' : 'maximum'
    
    const response = currentCard.responses[responseType]
    if (!response) return

    // Check if player can afford this response
    const cost = response.readiness
    if (gameState.readiness + cost < 0) return // Can't afford

    // For keyboard swipes, the card has already animated off screen
    // For drag swipes, the card disappears immediately
    if (isKeyboard) {
      // Small delay for smooth transition from card flying off to outcome appearing
      setTimeout(() => {
        setIsAnimatingSwipe(false)
      }, 50)
    }

    // Handle deck management based on response type
    if (responseType === 'ignore') {
      // For ignored cards: remove from current position and add to end
      setCardDeck(prev => {
        const newDeck = [...prev]
        // Remove from current position
        newDeck.splice(gameState.currentCardIndex, 1)
        // Add to end of deck
        newDeck.push(currentCard)
        console.log(`Card ignored: "${currentCard.headline}" - Moved to end of deck. Deck size: ${newDeck.length}`)
        return newDeck
      })
      // Deck size stays the same
    } else {
      // For basic/maximum responses: remove the card completely
      setCardDeck(prev => {
        const newDeck = [...prev]
        newDeck.splice(gameState.currentCardIndex, 1)
        console.log(`Card handled: "${currentCard.headline}" - Removed from deck. Deck size: ${newDeck.length}`)
        return newDeck
      })
    }

    // Update game state with outcome and story progress
    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + cost),
      score: prev.score + response.score,
      capacity: prev.capacity + response.capacity,
      cardsHandled: prev.cardsHandled + 1,
      showOutcome: true,
      currentOutcome: response.outcome,
      storyProgress: updateStoryProgress(currentCard, responseType, prev.storyProgress),
      // Update deck size based on response type
      deckSize: responseType === 'ignore' ? prev.deckSize : prev.deckSize - 1
    }))
  }

  const handleAcceptPowerup = () => {
    if (!currentCard?.isPowerup || !currentCard.responses.accept) return

    const response = currentCard.responses.accept

    // Remove powerup card from deck
    setCardDeck(prev => {
      const newDeck = [...prev]
      newDeck.splice(gameState.currentCardIndex, 1)
      console.log(`Powerup accepted: "${currentCard.headline}" - Removed from deck. Deck size: ${newDeck.length}`)
      return newDeck
    })

    // Update game state with powerup bonus
    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + response.readiness),
      cardsHandled: prev.cardsHandled + 1,
      showOutcome: true,
      currentOutcome: response.outcome,
      deckSize: prev.deckSize - 1
    }))
  }

  const handleStartGame = () => {
    setGameState(prev => ({
      ...prev,
      showIntro: false,
      isGameActive: true,
      storyProgress: initializeStoryProgress()
    }))
  }

  const handleOutcomeComplete = useCallback(() => {
    console.log('handleOutcomeComplete called')
    setGameState(prev => {
      // Since we've already modified the deck, the current index now points to the next card
      // (because we removed the current card or moved it to the end)
      console.log('Current index:', prev.currentCardIndex)
      console.log('Current deck size:', cardDeck.length)
      
      // Only end game if time runs out
      if (prev.timeRemaining <= 0) {
        console.log('Game ending - out of time')
        return { ...prev, showOutcome: false, isGameActive: false, showResults: true }
      }
      
      // Check if we've reached the end of the deck
      if (prev.currentCardIndex >= cardDeck.length) {
        console.log('No more cards in deck - all cards have been handled')
        return { ...prev, showOutcome: false, isGameActive: false, showResults: true }
      }
      
      console.log('Moving to next card')
      return {
        ...prev,
        // Don't increment index - it already points to the next card after deck modification
        currentCardIndex: prev.currentCardIndex,
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

  // Show results screen
  if (gameState.showResults) {
    return (
      <GameResults
        baseScore={gameState.score}
        cardsHandled={gameState.cardsHandled}
        storyProgress={gameState.storyProgress}
        onPlayAgain={() => {
          const shuffled = smartShuffle(cardsData)
          setCardDeck(shuffled)
          setGameState({
            ...INITIAL_GAME_STATE,
            deckSize: shuffled.length
          })
        }}
      />
    )
  }

  // Show intro screen
  if (gameState.showIntro) {
    return (
      <div className="min-h-screen text-gray-800 font-sans flex flex-col relative overflow-hidden">
        {/* Background image with blur and dark overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/images/cards/Confession%20Call%20Downtown.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(8px)',
            transform: 'scale(1.1)'
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        {/* Intro content */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 drop-shadow-2xl">
            Fog City Dispatch
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl leading-relaxed drop-shadow-lg">
            You&apos;re a 1970s San Francisco police dispatcher. Make split-second decisions on emergency calls—swipe left to ignore, right for basic response, or up for maximum response. Balance your readiness with the city&apos;s needs.
          </p>
          
          <button
            onClick={handleStartGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Start Dispatch
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen text-gray-800 font-sans flex flex-col relative overflow-hidden">
      {/* Background image with blur and dark overlay */}
      {backgroundImageUrl && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(4px)',
            transform: 'scale(1.05)' // Slight scale to hide blur edges
          }}
        />
      )}
      
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/15 z-10" />
      
      <StatusBar
        readiness={gameState.readiness}
        capacity={gameState.capacity}
        score={gameState.score}
        deckSize={gameState.deckSize}
        timeRemaining={gameState.timeRemaining}
      />
      
      {/* IGNORE tab - flush against left viewport edge */}
      <div className="absolute top-1/2 transform -translate-y-1/2 z-30" style={{ left: '-60px' }}>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <div className={`py-3 px-3 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[150px] text-center flex items-center justify-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-500 text-gray-300 opacity-40' 
              : `bg-green-500 text-white ${currentSwipeDirection === 'left' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">IGNORE</span>
          </div>
        </div>
      </div>

      {/* BASIC tab - flush against right viewport edge */}
      <div className="absolute top-1/2 transform -translate-y-1/2 z-30" style={{ right: '-60px' }}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <div className={`py-3 px-2 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[150px] text-center flex items-center justify-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-500 text-gray-300 opacity-40' 
              : `bg-blue-500 text-white ${currentSwipeDirection === 'right' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">BASIC</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col relative z-20">
        {/* Maximum label at top of card area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30">
          <div className={`px-2 py-2 rounded-b-lg shadow-lg transition-opacity duration-200 w-[150px] text-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-500 text-gray-300 opacity-40' 
              : `bg-red-500 text-white ${currentSwipeDirection === 'up' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">MAXIMUM</span>
          </div>
        </div>

        {/* Card area - fixed position to prevent jump on drag */}
        <div className="relative flex-1">
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '8rem' }}>
            {(!gameState.showOutcome || isAnimatingSwipe) && (
              <GameCard
                card={currentCard}
                onSwipe={handleSwipe}
                onAcceptPowerup={handleAcceptPowerup}
                onSwipeDirectionChange={setCurrentSwipeDirection}
                shouldStopAudio={gameState.showOutcome}
              />
            )}
          </div>
        </div>

        {/* Card description at bottom - fixed size with safe area padding */}
        {!gameState.showOutcome && currentCard && !currentSwipeDirection && (
          <div className="flex-shrink-0 px-8 pb-6 text-left safe-area-bottom">
            <div className="max-w-lg mx-auto bg-black/80 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-sm font-extrabold mb-2 text-white leading-tight">
                {currentCard.headline}
              </h2>
              <p className="text-gray-300 leading-relaxed font-medium text-sm">
                {currentCard.description}
              </p>
            </div>
          </div>
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