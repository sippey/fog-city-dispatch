'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
// import { motion } from 'framer-motion' // Unused
import { cardsData } from '@/data/cards'
import { DispatchCard } from '@/types'
import { GameState, INITIAL_GAME_STATE } from './types'
import GameCard from './components/GameCard'
import StatusBar from './components/StatusBar'
import OutcomeDisplay from './components/OutcomeDisplay'
import GameResults from './components/GameResults'
import FlyingScore from './components/FlyingScore'
import FlyingReadiness from './components/FlyingReadiness'
import { initializeStoryProgress, updateStoryProgress } from './gameLogic'

interface GameConfig {
  deckSize: number
  gameTime: number // in seconds
  startingReadiness: number
  recycleIgnoredCards: boolean
  readinessGainPerSecond: number
}

const DEFAULT_CONFIG: GameConfig = {
  deckSize: 50, // Default to 50 cards
  gameTime: 300, // 5 minutes
  startingReadiness: 100,
  recycleIgnoredCards: true,
  readinessGainPerSecond: 1
}

export default function Game() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
  const [cardDeck, setCardDeck] = useState<DispatchCard[]>([])
  const [currentSwipeDirection, setCurrentSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null)
  const [isAnimatingSwipe, setIsAnimatingSwipe] = useState(false)
  const [gameConfig, setGameConfig] = useState<GameConfig>(DEFAULT_CONFIG)
  const [flyingScore, setFlyingScore] = useState<{ score: number; visible: boolean; key: number }>({ score: 0, visible: false, key: 0 })
  const [flyingReadiness, setFlyingReadiness] = useState<{ readiness: number; visible: boolean; key: number }>({ readiness: 0, visible: false, key: 0 })

  // Select cards based on configuration
  const selectCards = (allCards: DispatchCard[], targetCount: number): DispatchCard[] => {
    // If we want all cards, just return them
    if (targetCount >= allCards.length) {
      return allCards
    }

    // Group cards by type
    const zodiacCards = allCards.filter(card => card.storyArc === 'Zodiac')
    const powerupCards = allCards.filter(card => card.isPowerup === true)
    const otherCards = allCards.filter(card => 
      card.storyArc !== 'Zodiac' && !card.isPowerup
    )

    // Start with all Zodiac cards (8 cards) and at least 1 powerup
    const selectedCards: DispatchCard[] = []
    
    // Add all Zodiac cards
    selectedCards.push(...zodiacCards)
    
    // Add at least one powerup if available
    if (powerupCards.length > 0) {
      selectedCards.push(powerupCards[Math.floor(Math.random() * powerupCards.length)])
    }
    
    // Calculate how many more cards we need
    const remainingSlots = targetCount - selectedCards.length
    
    if (remainingSlots > 0) {
      // Combine remaining powerups and other cards
      const remainingPowerups = powerupCards.filter(p => !selectedCards.includes(p))
      const availableCards = [...remainingPowerups, ...otherCards]
      
      // Shuffle and select random cards to fill remaining slots
      const shuffled = availableCards.sort(() => Math.random() - 0.5)
      selectedCards.push(...shuffled.slice(0, remainingSlots))
    }
    
    return selectedCards
  }

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
    const selectedCards = selectCards(cardsData, gameConfig.deckSize)
    const shuffled = smartShuffle(selectedCards)
    setCardDeck(shuffled)
    setGameState(prev => ({
      ...prev,
      deckSize: shuffled.length
    }))
  }, [gameConfig.deckSize])

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
          readiness: Math.min(prev.capacity, prev.readiness + gameConfig.readinessGainPerSecond)
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameState.isGameActive, gameConfig.readinessGainPerSecond])

  const currentCard = cardDeck[gameState.currentCardIndex]

  // Check which actions are affordable based on readiness
  const canAffordIgnore = !currentCard || currentCard.isPowerup || (currentCard.responses.ignore && gameState.readiness + currentCard.responses.ignore.readiness >= 0)
  const canAffordBasic = !currentCard || currentCard.isPowerup || (currentCard.responses.basic && gameState.readiness + currentCard.responses.basic.readiness >= 0)
  const canAffordMaximum = !currentCard || currentCard.isPowerup || (currentCard.responses.maximum && gameState.readiness + currentCard.responses.maximum.readiness >= 0)

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
      if (gameConfig.recycleIgnoredCards) {
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
        // Remove the card completely if not recycling
        setCardDeck(prev => {
          const newDeck = [...prev]
          newDeck.splice(gameState.currentCardIndex, 1)
          console.log(`Card ignored: "${currentCard.headline}" - Removed from deck. Deck size: ${newDeck.length}`)
          return newDeck
        })
      }
    } else {
      // For basic/maximum responses: remove the card completely
      setCardDeck(prev => {
        const newDeck = [...prev]
        newDeck.splice(gameState.currentCardIndex, 1)
        console.log(`Card handled: "${currentCard.headline}" - Removed from deck. Deck size: ${newDeck.length}`)
        return newDeck
      })
    }

    // Show flying score animation
    if (response.score !== 0) {
      // Trigger the new animation with unique key to force re-render
      setFlyingScore(prev => ({ 
        score: response.score, 
        visible: true, 
        key: prev.key + 1 
      }))
    }

    // Show flying readiness animation
    if (response.readiness !== 0) {
      setFlyingReadiness(prev => ({ 
        readiness: response.readiness, 
        visible: true, 
        key: prev.key + 1 
      }))
    }

    // Update game state with outcome and story progress, but delay score/readiness updates
    setGameState(prev => {
      const newDeckSize = responseType === 'ignore' && gameConfig.recycleIgnoredCards 
        ? prev.deckSize 
        : prev.deckSize - 1
      
      // Check if this will be the last card after this action
      const isLastCard = newDeckSize === 0

      console.log(`Processing card: ${currentCard.headline}, current deck size: ${prev.deckSize}, new deck size: ${newDeckSize}, is last card: ${isLastCard}`)

      return {
        ...prev,
        // Don't update readiness and score immediately - let animations "deliver" them
        capacity: prev.capacity + response.capacity,
        cardsHandled: prev.cardsHandled + 1,
        showOutcome: true,
        currentOutcome: response.outcome,
        storyProgress: updateStoryProgress(currentCard, responseType, prev.storyProgress),
        deckSize: newDeckSize,
        // If this was the last card, end the game immediately after outcome
        isGameActive: !isLastCard
      }
    })

    // Delay the actual score and readiness updates until animations "arrive" (1 second)
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        readiness: Math.min(prev.capacity, prev.readiness + cost),
        score: prev.score + response.score
      }))
    }, 1000)
  }

  const handleAcceptPowerup = () => {
    if (!currentCard?.isPowerup || !currentCard.responses.accept) return

    const response = currentCard.responses.accept

    // Powerup cards don't affect score, only readiness - no flying score animation needed
    // Show flying readiness animation for powerups
    if (response.readiness !== 0) {
      setFlyingReadiness(prev => ({ 
        readiness: response.readiness, 
        visible: true, 
        key: prev.key + 1 
      }))
    }

    // Remove powerup card from deck
    setCardDeck(prev => {
      const newDeck = [...prev]
      newDeck.splice(gameState.currentCardIndex, 1)
      console.log(`Powerup accepted: "${currentCard.headline}" - Removed from deck. Deck size: ${newDeck.length}`)
      return newDeck
    })

    // Update game state with powerup bonus, but delay readiness update
    setGameState(prev => {
      const newDeckSize = prev.deckSize - 1
      const isLastCard = newDeckSize === 0

      console.log(`Processing powerup: ${currentCard.headline}, current deck size: ${prev.deckSize}, new deck size: ${newDeckSize}, is last card: ${isLastCard}`)

      return {
        ...prev,
        // Don't update readiness immediately - let animation "deliver" it
        cardsHandled: prev.cardsHandled + 1,
        showOutcome: true,
        currentOutcome: response.outcome,
        deckSize: newDeckSize,
        // If this was the last card, end the game immediately after outcome
        isGameActive: !isLastCard
      }
    })

    // Delay the actual readiness update until animation "arrives" (1 second)
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        readiness: Math.min(prev.capacity, prev.readiness + response.readiness)
      }))
    }, 1000)
  }

  const handleStartGame = () => {
    // Apply configuration and start game
    const selectedCards = selectCards(cardsData, gameConfig.deckSize)
    const shuffled = smartShuffle(selectedCards)
    setCardDeck(shuffled)
    
    setGameState(prev => ({
      ...prev,
      showIntro: false,
      isGameActive: true,
      storyProgress: initializeStoryProgress(),
      readiness: gameConfig.startingReadiness,
      timeRemaining: gameConfig.gameTime,
      deckSize: shuffled.length
    }))
  }

  const handleOutcomeComplete = useCallback(() => {
    console.log('handleOutcomeComplete called')
    setGameState(prev => {
      console.log('Current index:', prev.currentCardIndex)
      console.log('Deck size in state:', prev.deckSize)
      console.log('Is game active:', prev.isGameActive)
      
      // Check if game should end (time out or no more cards)
      if (prev.timeRemaining <= 0 || !prev.isGameActive) {
        console.log('Game ending - time out or no cards left')
        return { 
          ...prev, 
          showOutcome: false, 
          isGameActive: false, 
          showResults: true
        }
      }
      
      console.log('Moving to next card')
      return {
        ...prev,
        currentCardIndex: prev.currentCardIndex,
        showOutcome: false,
        currentOutcome: ''
      }
    })
  }, [])

  // Show results screen (check this before checking currentCard)
  if (gameState.showResults) {
    return (
      <GameResults
        baseScore={gameState.score}
        cardsHandled={gameState.cardsHandled}
        storyProgress={gameState.storyProgress}
        onPlayAgain={() => {
          // Reset to defaults
          setGameConfig(DEFAULT_CONFIG)
          const shuffled = smartShuffle(cardsData)
          setCardDeck(shuffled)
          setGameState({
            ...INITIAL_GAME_STATE,
            deckSize: shuffled.length
          })
          // Reset flying score and readiness state
          setFlyingScore({ score: 0, visible: false, key: 0 })
          setFlyingReadiness({ readiness: 0, visible: false, key: 0 })
        }}
      />
    )
  }

  if (!currentCard && !gameState.showOutcome) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading game...</div>
      </div>
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
          
          {/* Game Configuration Options */}
          <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Game Settings</h2>
              <Link 
                href="/card-browser"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
              >
                📚 Browse All Cards
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deck Size */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Number of Cards
                </label>
                <select
                  value={gameConfig.deckSize}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, deckSize: Number(e.target.value) }))}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {(() => {
                    const maxCards = cardsData.length
                    const options = []
                    // Generate options from 10 to max in increments of 10
                    for (let i = 10; i <= Math.floor(maxCards / 10) * 10; i += 10) {
                      options.push(i)
                    }
                    // Add the actual max if it's not already included
                    if (!options.includes(maxCards)) {
                      options.push(maxCards)
                    }
                    return options.map(size => (
                      <option key={size} value={size}>
                        {size === maxCards ? `${size} (All cards)` : size}
                      </option>
                    ))
                  })()}
                </select>
              </div>

              {/* Game Time */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Time to Play
                </label>
                <select
                  value={gameConfig.gameTime}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, gameTime: Number(e.target.value) }))}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value={60}>1 minute</option>
                  <option value={120}>2 minutes</option>
                  <option value={180}>3 minutes</option>
                  <option value={240}>4 minutes</option>
                  <option value={300}>5 minutes</option>
                </select>
              </div>

              {/* Starting Readiness */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Starting Readiness
                </label>
                <select
                  value={gameConfig.startingReadiness}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, startingReadiness: Number(e.target.value) }))}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {Array.from({ length: 21 }, (_, i) => i * 10).map(readiness => (
                    <option key={readiness} value={readiness}>
                      {readiness}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recycle Ignored Cards */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Recycle Ignored Cards
                </label>
                <select
                  value={gameConfig.recycleIgnoredCards ? 'yes' : 'no'}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, recycleIgnoredCards: e.target.value === 'yes' }))}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="yes">Yes - Return to deck</option>
                  <option value="no">No - Remove from game</option>
                </select>
              </div>

              {/* Readiness Gain Per Second */}
              <div className="text-left">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Readiness Gain Per Second
                </label>
                <select
                  value={gameConfig.readinessGainPerSecond}
                  onChange={(e) => setGameConfig(prev => ({ ...prev, readinessGainPerSecond: Number(e.target.value) }))}
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map(gain => (
                    <option key={gain} value={gain}>
                      {gain} {gain === 1 ? 'point' : 'points'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
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
    <div className="min-h-screen text-gray-800 font-sans flex flex-col relative overflow-hidden" style={{ backgroundColor: '#666666' }}>
      
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
              : !canAffordIgnore
              ? 'bg-gray-500 text-gray-400 opacity-50'
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
              : !canAffordBasic
              ? 'bg-gray-500 text-gray-400 opacity-50'
              : `bg-blue-500 text-white ${currentSwipeDirection === 'right' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">DISPATCH</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col relative z-20">
        {/* Priority Dispatch label at top of card area */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30">
          <div className={`px-3 py-2 rounded-b-lg shadow-lg transition-opacity duration-200 w-[180px] text-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-500 text-gray-300 opacity-40' 
              : !canAffordMaximum
              ? 'bg-gray-500 text-gray-400 opacity-50'
              : `bg-red-500 text-white ${currentSwipeDirection === 'up' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">PRIORITY DISPATCH</span>
          </div>
        </div>

        {/* Card area with description below */}
        <div className="relative flex-1">
          <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '8rem' }}>
            {(!gameState.showOutcome || isAnimatingSwipe) && currentCard && (
              <div className="flex flex-col items-center">
                <GameCard
                  card={currentCard}
                  currentReadiness={gameState.readiness}
                  onSwipe={handleSwipe}
                  onAcceptPowerup={handleAcceptPowerup}
                  onSwipeDirectionChange={setCurrentSwipeDirection}
                  shouldStopAudio={gameState.showOutcome}
                />
                
                {/* Card description right below card */}
                {!gameState.showOutcome && !currentSwipeDirection && (
                  <div className="mt-5" style={{ width: 'min(calc(100vw - 10rem), 400px)', maxWidth: '400px' }}>
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
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
            )}
          </div>
        </div>
      </div>
      
      <OutcomeDisplay
        message={gameState.currentOutcome}
        visible={gameState.showOutcome}
        onComplete={handleOutcomeComplete}
      />
      
      <FlyingScore
        key={`score-${flyingScore.key}`}
        score={flyingScore.score}
        visible={flyingScore.visible}
        onComplete={() => setFlyingScore(prev => ({ score: 0, visible: false, key: prev.key }))}
      />
      
      <FlyingReadiness
        key={`readiness-${flyingReadiness.key}`}
        readiness={flyingReadiness.readiness}
        visible={flyingReadiness.visible}
        onComplete={() => setFlyingReadiness(prev => ({ readiness: 0, visible: false, key: prev.key }))}
      />
    </div>
  )
}