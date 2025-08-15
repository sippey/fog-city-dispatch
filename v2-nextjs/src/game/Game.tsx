'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cardsData } from '@/data/cards'
import { DispatchCard } from '@/types'
import { GameState, INITIAL_GAME_STATE, TutorialPhase } from './types'
import { isTutorialCompleted, markTutorialCompleted, tutorialCards, getTutorialCardIndex, getNextTutorialPhase } from './tutorialData'
import GameCard from './components/GameCard'
import StatusBar, { StatusBarRef } from './components/StatusBar'
import OutcomeDisplay from './components/OutcomeDisplay'
import GameResults from './components/GameResults'
import FlyingScore from './components/FlyingScore'
import FlyingReadiness from './components/FlyingReadiness'
import { initializeStoryProgress, updateStoryProgress } from './gameLogic'
import { preloadSwipeSounds, playSwipeSound } from '@/utils/soundEffects'

interface GameConfig {
  deckSize: number
  gameTime: number // in seconds
  startingReadiness: number
  startingCapacity: number
  recycleIgnoredCards: boolean
  readinessGainPerSecond: number
}

const DEFAULT_CONFIG: GameConfig = {
  deckSize: 50,
  gameTime: 180, // 3 minutes
  startingReadiness: 50,
  startingCapacity: 100,
  recycleIgnoredCards: true,
  readinessGainPerSecond: 1
}

export default function Game() {
  // Always use default config for root route - clear any custom settings
  const getInitialConfig = (): GameConfig => {
    if (typeof window !== 'undefined') {
      // Clear any custom game config when accessing root route directly
      sessionStorage.removeItem('gameConfig')
    }
    return DEFAULT_CONFIG
  }

  const [gameConfig] = useState<GameConfig>(getInitialConfig)
  const [isHydrated, setIsHydrated] = useState(false)
  const statusBarRef = useRef<StatusBarRef>(null)
  
  // Initialize game state with custom starting values
  const getInitialGameState = (): GameState => {
    return {
      ...INITIAL_GAME_STATE,
      showIntro: true, // Show intro screen
      isGameActive: false, // Don't start until user clicks play
      readiness: gameConfig.startingReadiness,
      capacity: gameConfig.startingCapacity,
      timeRemaining: gameConfig.gameTime,
      tutorialPhase: 'intro', // Always start with intro, will update after hydration
      storyProgress: initializeStoryProgress()
    }
  }
  
  const [gameState, setGameState] = useState<GameState>(getInitialGameState)
  const [cardDeck, setCardDeck] = useState<DispatchCard[]>([])
  const [currentSwipeDirection, setCurrentSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null)
  const [isAnimatingSwipe, setIsAnimatingSwipe] = useState(false)
  const [flyingScore, setFlyingScore] = useState<{ score: number; visible: boolean; key: number }>({ score: 0, visible: false, key: 0 })
  const [flyingReadiness, setFlyingReadiness] = useState<{ readiness: number; visible: boolean; key: number }>({ readiness: 0, visible: false, key: 0 })

  // Handle hydration and tutorial state
  useEffect(() => {
    setIsHydrated(true)
    const tutorialCompleted = isTutorialCompleted()
    if (tutorialCompleted) {
      setGameState(prev => ({
        ...prev,
        tutorialPhase: null
      }))
    }
  }, [])

  // Apply no-scroll class to body when game is mounted and preload sounds
  useEffect(() => {
    document.body.classList.add('no-scroll')
    
    // Preload swipe sounds for instant playback
    preloadSwipeSounds().catch(error => {
      console.log('Could not preload some swipe sounds:', error)
    })
    
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  // Select cards based on configuration
  const selectCards = (allCards: DispatchCard[], targetCount: number): DispatchCard[] => {
    // If we want all cards, just return them
    if (targetCount >= allCards.length) {
      return allCards
    }

    // Group cards by type
    const zodiacCards = allCards.filter(card => card.storyArc === 'Zodiac')
    const powerupCards = allCards.filter(card => card.isPowerup === true)
    const randomCards = allCards.filter(card => 
      card.storyArc === 'Random'
    )

    // Calculate how many of each type we need
    const powerupCount = Math.floor(targetCount * 0.1) // 10% powerups
    const zodiacCount = zodiacCards.length // All Zodiac cards
    const randomCount = targetCount - powerupCount - zodiacCount // Rest are random
    
    const selectedCards: DispatchCard[] = []
    
    // Add all Zodiac cards (sorted by arcNumber to maintain order)
    const sortedZodiacCards = [...zodiacCards].sort((a, b) => {
      const aNum = parseInt(a.arcNumber || '0')
      const bNum = parseInt(b.arcNumber || '0') 
      return aNum - bNum
    })
    selectedCards.push(...sortedZodiacCards)
    
    // Add random selection of powerup cards
    const shuffledPowerups = [...powerupCards].sort(() => Math.random() - 0.5)
    selectedCards.push(...shuffledPowerups.slice(0, powerupCount))
    
    // Add random selection of random cards
    const shuffledRandomCards = [...randomCards].sort(() => Math.random() - 0.5)
    selectedCards.push(...shuffledRandomCards.slice(0, randomCount))
    
    return selectedCards
  }

  // Smart shuffle function that maintains Zodiac order and distributes powerups
  const smartShuffle = (cards: DispatchCard[]): DispatchCard[] => {
    // Separate cards by type
    const zodiacCards = cards.filter(card => card.storyArc === 'Zodiac')
    const powerupCards = cards.filter(card => card.isPowerup === true)
    const randomCards = cards.filter(card => card.storyArc === 'Random')
    
    // Zodiac cards should already be sorted from selectCards, but ensure order
    const sortedZodiacCards = [...zodiacCards].sort((a, b) => {
      const aNum = parseInt(a.arcNumber || '0')
      const bNum = parseInt(b.arcNumber || '0') 
      return aNum - bNum
    })
    
    // Create base deck with evenly distributed Zodiac cards
    const result: DispatchCard[] = new Array(cards.length)
    
    // Calculate positions for Zodiac cards (evenly distributed)
    const zodiacPositions: number[] = []
    if (sortedZodiacCards.length > 0) {
      const spacing = Math.floor(cards.length / sortedZodiacCards.length)
      for (let i = 0; i < sortedZodiacCards.length; i++) {
        zodiacPositions.push(Math.floor(spacing * i + spacing / 2))
      }
    }
    
    // Place Zodiac cards in their calculated positions
    sortedZodiacCards.forEach((card, index) => {
      result[zodiacPositions[index]] = card
    })
    
    // Get available positions (not occupied by Zodiac cards)
    const availablePositions = []
    for (let i = 0; i < cards.length; i++) {
      if (!result[i]) {
        availablePositions.push(i)
      }
    }
    
    // Shuffle available positions
    availablePositions.sort(() => Math.random() - 0.5)
    
    // Create combined pool of random and powerup cards
    const nonZodiacCards = [...randomCards, ...powerupCards]
    nonZodiacCards.sort(() => Math.random() - 0.5)
    
    // Place cards ensuring no consecutive powerups and no powerup at start
    let placedCards = 0
    for (const position of availablePositions) {
      if (placedCards >= nonZodiacCards.length) break
      
      const card = nonZodiacCards[placedCards]
      
      // Check constraints
      const isPowerup = card.isPowerup
      const isFirstPosition = position === 0
      const prevCard = position > 0 ? result[position - 1] : null
      const nextCard = position < result.length - 1 ? result[position + 1] : null
      
      // Skip if this would violate constraints
      if ((isPowerup && isFirstPosition) || 
          (isPowerup && prevCard?.isPowerup) ||
          (isPowerup && nextCard?.isPowerup)) {
        // Try to find a non-powerup card to place here
        let swapIndex = -1
        for (let i = placedCards + 1; i < nonZodiacCards.length; i++) {
          const swapCard = nonZodiacCards[i]
          if (!swapCard.isPowerup || 
              (!isFirstPosition && !prevCard?.isPowerup && !nextCard?.isPowerup)) {
            swapIndex = i
            break
          }
        }
        
        if (swapIndex !== -1) {
          // Swap cards
          const temp = nonZodiacCards[placedCards]
          nonZodiacCards[placedCards] = nonZodiacCards[swapIndex]
          nonZodiacCards[swapIndex] = temp
        }
      }
      
      result[position] = nonZodiacCards[placedCards]
      placedCards++
    }
    
    // Fill any remaining empty slots
    for (let i = 0; i < result.length; i++) {
      if (!result[i] && placedCards < nonZodiacCards.length) {
        result[i] = nonZodiacCards[placedCards]
        placedCards++
      }
    }
    
    return result.filter(card => card !== undefined)
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

  // Get current card (tutorial or game card)
  const getTutorialCard = () => {
    if (!gameState.tutorialPhase || gameState.tutorialPhase === 'intro' || gameState.tutorialPhase === 'ready') {
      return null
    }
    const cardIndex = getTutorialCardIndex(gameState.tutorialPhase)
    return cardIndex >= 0 ? tutorialCards[cardIndex] : null
  }
  
  const currentCard = gameState.tutorialPhase && gameState.tutorialPhase !== 'ready' 
    ? getTutorialCard()
    : cardDeck[gameState.currentCardIndex]

  // Check which actions are affordable based on readiness (use tutorial readiness in tutorial mode)
  const currentReadiness = gameState.tutorialPhase ? gameState.tutorialReadiness : gameState.readiness
  const canAffordIgnore = !currentCard || currentCard.isPowerup || (currentCard.responses.ignore && currentReadiness + currentCard.responses.ignore.readiness >= 0)
  const canAffordBasic = !currentCard || currentCard.isPowerup || (currentCard.responses.basic && currentReadiness + currentCard.responses.basic.readiness >= 0)
  const canAffordMaximum = !currentCard || currentCard.isPowerup || (currentCard.responses.maximum && currentReadiness + currentCard.responses.maximum.readiness >= 0)

  const handleSwipe = (direction: 'left' | 'right' | 'up', isKeyboard: boolean = false) => {
    if (!currentCard || gameState.showOutcome) return

    const responseType = direction === 'left' ? 'ignore' : 
                        direction === 'right' ? 'basic' : 'maximum'
    
    const response = currentCard.responses[responseType]
    if (!response) return
    
    // Play swipe sound immediately when action completes
    playSwipeSound(responseType)

    // Tutorial mode - use tutorial readiness and score, handle progression
    if (gameState.tutorialPhase && gameState.tutorialPhase !== 'ready') {
      const cost = response.readiness
      if (gameState.tutorialReadiness + cost < 0) return // Can't afford
      
      // Show flying animations for tutorial
      if (response.score !== 0) {
        setFlyingScore(prev => ({ 
          score: response.score, 
          visible: true, 
          key: prev.key + 1 
        }))
      }
      
      if (response.readiness !== 0) {
        setFlyingReadiness(prev => ({ 
          readiness: response.readiness, 
          visible: true, 
          key: prev.key + 1 
        }))
      }
      
      // Update tutorial state but don't update score/readiness immediately
      setGameState(prev => ({
        ...prev,
        showOutcome: true,
        currentOutcome: response.outcome
      }))
      
      // Delay the actual score and readiness updates until animations "arrive" (1 second)
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          tutorialReadiness: prev.tutorialReadiness + cost,
          tutorialScore: prev.tutorialScore + response.score
        }))
      }, 1000)
      
      return // Exit early for tutorial mode
    }

    // Regular game mode
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
    
    // Play powerup sound immediately when accepted
    playSwipeSound('powerup')
    
    // Tutorial mode - handle powerup tutorial
    if (gameState.tutorialPhase === 'powerup') {
      // Show flying readiness animation
      if (response.readiness !== 0) {
        setFlyingReadiness(prev => ({ 
          readiness: response.readiness, 
          visible: true, 
          key: prev.key + 1 
        }))
      }
      
      // Update tutorial state with outcome
      setGameState(prev => ({
        ...prev,
        showOutcome: true,
        currentOutcome: response.outcome
      }))
      
      // Delay the actual readiness update until animation "arrives" (1 second)
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          tutorialReadiness: prev.tutorialReadiness + response.readiness
        }))
      }, 1000)
      
      return // Exit early for tutorial mode
    }

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
    if (gameState.tutorialPhase === 'intro') {
      // Start tutorial
      setGameState(prev => ({
        ...prev,
        showIntro: false,
        tutorialPhase: 'card1',
        isGameActive: false // Don't start game until tutorial is complete
      }))
    } else {
      // Skip tutorial, start game
      setGameState(prev => ({
        ...prev,
        showIntro: false,
        isGameActive: true,
        tutorialPhase: null
      }))
    }
  }

  const handleStartTutorial = () => {
    setGameState(prev => ({
      ...prev,
      showIntro: false,
      tutorialPhase: 'card1',
      isGameActive: false
    }))
  }

  const handleOutcomeComplete = useCallback(() => {
    console.log('handleOutcomeComplete called')
    setGameState(prev => {
      // Tutorial mode progression
      if (prev.tutorialPhase && prev.tutorialPhase !== 'ready') {
        const nextPhase = getNextTutorialPhase(prev.tutorialPhase) as TutorialPhase
        console.log('Tutorial progressing from', prev.tutorialPhase, 'to', nextPhase)
        
        // No special delay needed for powerup since all tutorial outcomes now show for 1.5 seconds
        
        return {
          ...prev,
          tutorialPhase: nextPhase,
          showOutcome: false,
          currentOutcome: ''
        }
      }
      
      // Regular game mode
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
          // Reset game state to show intro again
          const selectedCards = selectCards(cardsData, gameConfig.deckSize)
          const shuffled = smartShuffle(selectedCards)
          setCardDeck(shuffled)
          setGameState({
            ...INITIAL_GAME_STATE,
            showIntro: true,
            isGameActive: false,
            readiness: gameConfig.startingReadiness,
            capacity: gameConfig.startingCapacity,
            timeRemaining: gameConfig.gameTime,
            deckSize: shuffled.length,
            storyProgress: initializeStoryProgress()
          })
          // Reset flying score and readiness state
          setFlyingScore({ score: 0, visible: false, key: 0 })
          setFlyingReadiness({ readiness: 0, visible: false, key: 0 })
        }}
      />
    )
  }

  // Only show loading screen for regular game mode (not tutorial)
  if (!currentCard && !gameState.showOutcome && !gameState.tutorialPhase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading game...</div>
      </div>
    )
  }

  // Show intro screen
  if (gameState.showIntro) {
    const tutorialCompleted = isHydrated && gameState.tutorialPhase === null
    
    return (
      <div className="game-container text-gray-800 font-sans flex flex-col">
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
          
          <p className="text-xl text-gray-300 font-medium mb-12 max-w-2xl leading-relaxed">
            San Francisco has gone insane. It&apos;s your job to keep cool.
          </p>
          
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="wait">
              {!tutorialCompleted && gameState.tutorialPhase === 'intro' ? (
                // First-time player - start tutorial only
                <motion.button
                  key="start-training"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleStartGame}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
                >
                  Start Training
                </motion.button>
              ) : (
                // Returning player - show both options with staggered animation
                <>
                  <motion.button
                    key="start-shift"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleStartGame}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
                  >
                    Start Shift
                  </motion.button>
                  <motion.button
                    key="replay-training"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    onClick={handleStartTutorial}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-lg uppercase tracking-wide shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    Replay Training
                  </motion.button>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    )
  }

  // Show tutorial intro screen
  if (gameState.tutorialPhase === 'intro') {
    return (
      <div className="game-container text-gray-800 font-sans flex flex-col">
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
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-2xl">
            WELCOME TO YOUR FIRST DAY ON THE JOB
          </h1>
          
          <p className="text-xl text-gray-300 font-medium mb-12 max-w-3xl leading-relaxed">
            Let&apos;s teach you how to handle 911 calls as an emergency dispatcher.
          </p>
          
          <button
            onClick={() => setGameState(prev => ({ ...prev, tutorialPhase: 'card1' }))}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Start Training
          </button>
        </div>
      </div>
    )
  }

  // Show "Ready to Start Your Shift?" screen with fade-in animation
  if (gameState.tutorialPhase === 'ready') {
    return (
      <motion.div 
        className="game-container text-gray-800 font-sans flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
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
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-2xl">
            READY TO START YOUR SHIFT?
          </h1>
          
          <p className="text-xl text-gray-300 font-medium mb-12 max-w-3xl leading-relaxed">
            You&apos;ve learned the basics of emergency dispatch. Now earn points to get promoted through the ranks - from Trainee all the way up to Dispatch Commissioner. The better your decisions, the higher your score!
          </p>
          
          <button
            onClick={() => {
              markTutorialCompleted()
              setGameState(prev => ({ 
                ...prev, 
                tutorialPhase: null,
                isGameActive: true 
              }))
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Clock In
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="game-container text-gray-800 font-sans flex flex-col bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800">
      
      <StatusBar
        ref={statusBarRef}
        readiness={gameState.tutorialPhase ? gameState.tutorialReadiness : gameState.readiness}
        capacity={gameState.capacity}
        score={gameState.tutorialPhase ? gameState.tutorialScore : gameState.score}
        deckSize={gameState.deckSize}
        timeRemaining={gameState.tutorialPhase ? 0 : gameState.timeRemaining}
        isTutorial={!!gameState.tutorialPhase}
      />
      
      {/* IGNORE tab - positioned lower to create space from top tab */}
      <div className="absolute z-30" style={{ left: '-55px', top: 'calc(50% + 40px)', transform: 'translateY(-50%)' }}>
        <div style={{ transform: 'rotate(-90deg)' }}>
          <div className={`py-2 px-2 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[130px] text-center flex items-center justify-center ${
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

      {/* BASIC tab - positioned lower to create space from top tab */}
      <div className="absolute z-30" style={{ right: '-55px', top: 'calc(50% + 40px)', transform: 'translateY(-50%)' }}>
        <div style={{ transform: 'rotate(90deg)' }}>
          <div className={`py-2 px-2 rounded-bl-lg rounded-br-lg shadow-lg transition-opacity duration-200 w-[130px] text-center flex items-center justify-center ${
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
        {/* Priority Dispatch label flush against status bar */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-30">
          <div className={`px-2 py-1.5 rounded-b-lg shadow-lg transition-opacity duration-200 w-[160px] text-center ${
            currentCard?.isPowerup 
              ? 'bg-gray-500 text-gray-300 opacity-40' 
              : !canAffordMaximum
              ? 'bg-gray-500 text-gray-400 opacity-50'
              : `bg-red-500 text-white ${currentSwipeDirection === 'up' ? 'opacity-100' : 'opacity-70'}`
          }`}>
            <span className="text-xs font-bold uppercase tracking-wide">PRIORITY DISPATCH</span>
          </div>
        </div>

        {/* Card area with description below - centered with 20px spacing from all labels */}
        <div className="relative flex-1 flex items-center justify-center">
          <div style={{ paddingTop: '0px', paddingBottom: '20px' }}>
            {(!gameState.showOutcome || isAnimatingSwipe) && currentCard && (
              <GameCard
                card={currentCard}
                currentReadiness={currentReadiness}
                onSwipe={handleSwipe}
                onAcceptPowerup={handleAcceptPowerup}
                onSwipeDirectionChange={setCurrentSwipeDirection}
                shouldStopAudio={gameState.showOutcome}
                isTutorial={!!gameState.tutorialPhase}
                showOutcome={gameState.showOutcome}
                currentSwipeDirection={currentSwipeDirection}
              />
            )}
          </div>
        </div>
      </div>
      
      <OutcomeDisplay
        message={gameState.currentOutcome}
        visible={gameState.showOutcome}
        onComplete={handleOutcomeComplete}
        duration={gameState.tutorialPhase ? 3000 : 1000}
      />
      
      <FlyingScore
        key={`score-${flyingScore.key}`}
        score={flyingScore.score}
        visible={flyingScore.visible}
        targetPosition={statusBarRef.current?.getScorePosition() || null}
        isMobileLayout={statusBarRef.current?.isMobileLayout() || false}
        onComplete={() => setFlyingScore(prev => ({ score: 0, visible: false, key: prev.key }))}
      />
      
      <FlyingReadiness
        key={`readiness-${flyingReadiness.key}`}
        readiness={flyingReadiness.readiness}
        visible={flyingReadiness.visible}
        targetPosition={statusBarRef.current?.getReadinessPosition() || null}
        isMobileLayout={statusBarRef.current?.isMobileLayout() || false}
        onComplete={() => setFlyingReadiness(prev => ({ readiness: 0, visible: false, key: prev.key }))}
      />
    </div>
  )
}