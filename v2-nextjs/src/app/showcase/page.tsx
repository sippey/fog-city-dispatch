'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cardsData } from '@/data/cards'
import { getCardImageUrl } from '@/utils/cardImages'
import { DispatchCard } from '@/types'
import Game from '@/game/Game'

interface CardWithPosition extends DispatchCard {
  randomX: number
  randomY: number
  randomRotate: number
}

export default function ShowcasePage() {
  const [cardStack, setCardStack] = useState<CardWithPosition[]>([])
  const [isPreloaded, setIsPreloaded] = useState(false)
  const [isAnimatingAway, setIsAnimatingAway] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [showGame, setShowGame] = useState(false)

  const skipToTitle = () => {
    setCardStack([]) // Clear all cards immediately
    setIsAnimatingAway(true) // Trigger the title sequence
    setShowTitle(true)
    // Transition to game after 2 seconds
    setTimeout(() => {
      setShowGame(true)
    }, 2000)
  }
  
  // Filter and limit to 20 random image cards for performance
  const [selectedCards] = useState(() => {
    // Only use cards that are NOT powerups AND have proper images
    const imageCards = cardsData.filter(card => {
      if (card.isPowerup) return false // Exclude powerups (they have videos)
      
      // Check if card has an imageFile specified OR matches our available images list
      if (card.imageFile) return true
      
      // List of available image files (without .png extension) - same as in cardImages.ts
      const availableImages = [
        'Alcatraz Tour Boat Emergency', 'Armed Holdup on Grant Avenue', 'Art Gallery Break-In',
        'Balboa Park Gang Fight', 'Bank Robbery in Progress', 'Bayview Community Center',
        'Bernal Heights Dog Park', 'Bicycle Theft Ring', 'Brake System Warning',
        'Brawl Outside The Phoenix', 'Burglary Alarm on Geary Boulevard', 'Cable Car Collision',
        'Castro Street Medical Emergency', 'Chinatown Elderly Scam', 'Chinatown Medicinal Shop Robbery',
        'Community Fear Response', 'Confession Call Downtown', 'Cow Hollow Boutique Theft',
        'Crissy Field Dog Attack', 'Crocker Amazon Playground', 'Diamond Heights Overlook',
        'Drive-By on 24th Street', 'Embarcadero Hit and Run', 'Excelsior District Shooting',
        'Executive Collapses in Office', 'Fillmore Jazz Club Fight', 'Final Taunting Call',
        'Financial District Bomb Threat', 'Fisherman_s Wharf Brawl', 'Food Truck Fire',
        'Forest Hill Hillside Collapse', 'Gang Intelligence Report', 'Gas Explosion',
        'Gas Leak Reported', 'Glen Park BART Incident', 'Golden Gate Bridge Jumper',
        'Golden Gate Park Concert', 'Haight Street Drug Deal', 'Hayes Valley Art Walk',
        'Heart Attack at Pier 39', 'Ingleside Library Incident', 'Japanese Tea Garden Damaged',
        'Japantown Festival Incident', 'Jogger Attacked by the Bay', 'Late Night House Party',
        'Lombard Street Tourist Accident', 'Lost Hiker Near Stow Lake', 'Loud Party on Grant Avenue',
        'Man Down on Eddy Street', 'Man Threatening Suicide', 'Mansion Break-In on Broadway',
        'Market Street Knife Fight', 'Missing UC Berkeley Student', 'Mission Dolores Vandalism',
        'Mission Street Protest', 'Multi-Car Accident on Lombard', 'Multi-Vehicle Pileup',
        'Newspaper Receives Death Threat', 'Nob Hill Hotel Robbery', 'North Beach Restaurant Fire',
        'Ocean Beach Drowning', 'Outer Mission Garage Fire', 'Outer Richmond Surf Rescue',
        'Pacific Heights Car Chase', 'Pier 39 Pickpocket Ring', 'Portola District Market',
        'Potrero Hill Food Truck', 'Presidio Trail Accident', 'Ransom Demand Received',
        'Restaurant Shooting', 'Richmond District Home Invasion', 'Richmond Fog Accident',
        'Russian Hill Apartment Fire', 'SOMA Warehouse Rave', 'School Bus Threat',
        'Screaming Match on Valencia Street', 'Seacliff Mansion Break-In', 'Shots Fired at Blue Rock Springs',
        'Smoke Reported on Hyde Street', 'Strange Man Following Women', 'Sunset District Block Party',
        'Suspicious Activity at Bus Stop', 'System-Wide Cable Failure', 'Taxi Driver Shot Dead',
        'Telegraph Hill Burglary', 'Tenderloin Hotel Fire', 'Theft at Macys',
        'Twin Peaks Lookout Robbery', 'Union Square Flash Mob', 'Visitacion Valley Warehouse',
        'West Portal Shopping District', 'Witness Correction Call'
      ]
      
      // Check if headline matches any available image
      return availableImages.includes(card.headline)
    })
    
    // Shuffle and take first 20
    const shuffled = [...imageCards].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 20)
  })
  
  // Preload all card images and create initial pile
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = selectedCards.map(card => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => reject(new Error(`Failed to load ${card.headline}`))
          img.src = getCardImageUrl(card)
        })
      })
      
      try {
        await Promise.all(imagePromises)
        console.log('All showcase images preloaded!')
        
        // Create the initial pile with all 20 cards
        const initialPile: CardWithPosition[] = selectedCards.map((card, index) => ({
          ...card,
          randomX: (Math.random() - 0.5) * 30,
          randomY: (Math.random() - 0.5) * 30 + (index * -1),
          randomRotate: (Math.random() - 0.5) * 15
        }))
        
        setCardStack(initialPile)
        setIsPreloaded(true)
        
        // Wait a moment, then start animating cards away
        setTimeout(() => {
          setIsAnimatingAway(true)
        }, 1000)
      } catch (error) {
        console.log('Some images failed to preload:', error)
        setIsPreloaded(true)
      }
    }
    
    preloadImages()
  }, [selectedCards])
  
  // Animate cards away from the pile
  useEffect(() => {
    if (!isAnimatingAway || cardStack.length === 0) return
    
    const interval = setInterval(() => {
      setCardStack(prev => {
        if (prev.length === 0) {
          clearInterval(interval)
          return prev
        }
        // Remove the top card (last in array)
        return prev.slice(0, -1)
      })
    }, 400) // Remove a card every 400ms
    
    return () => clearInterval(interval)
  }, [isAnimatingAway, cardStack.length])

  // When all cards are gone, show title then transition to game
  useEffect(() => {
    if (cardStack.length === 0 && isPreloaded && isAnimatingAway && !showTitle) {
      // Show title for 2 seconds, then transition
      setTimeout(() => {
        setShowTitle(true)
        // After title appears, wait 2 more seconds then show game
        setTimeout(() => {
          setShowGame(true)
        }, 2000)
      }, 500) // Small delay after last card disappears
    }
  }, [cardStack.length, isPreloaded, isAnimatingAway, showTitle])

  // If game should be shown, render it with smooth transition
  if (showGame) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200"
      >
        <Game />
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred background - same as home page */}
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
      
      {/* Card showcase - full screen centered */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        {!isPreloaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-xl font-bold animate-pulse">
              Loading cards...
            </div>
          </div>
        )}
        {/* Always render both - control with opacity */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            opacity: cardStack.length === 0 && isPreloaded && !showTitle ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-white/50 text-lg">
            ✨
          </div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            opacity: showTitle ? 1 : 0,
            scale: showTitle ? 1 : 0.8
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-2xl">
              Fog City Dispatch
            </h1>
            <p className="text-xl text-gray-300 font-medium mt-4 max-w-2xl leading-relaxed">
              San Francisco has gone insane. It&apos;s your job to keep cool.
            </p>
          </div>
        </motion.div>
        
        {/* Skip intro button - only show when cards are visible and animating */}
        {cardStack.length > 0 && isPreloaded && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <button
              onClick={skipToTitle}
              className="bg-black/60 hover:bg-black/80 text-white/70 hover:text-white text-xs px-3 py-1.5 rounded-full border border-white/20 hover:border-white/40 transition-all duration-200 backdrop-blur-sm"
            >
              Skip intro
            </button>
          </div>
        )}
        
        <div className="relative w-96 h-96"> {/* Fixed container for centering */}
          {/* Render all cards in the stack */}
          {cardStack.map((card, index) => {
            const imageUrl = getCardImageUrl(card)
            
            // Determine exit direction based on card index
            const getExitDirection = (cardIndex: number) => {
              const pattern = cardIndex % 7 // 7-card pattern: L,R,L,R,L,R,T
              if (pattern < 2) return 'left'   // 0,1 = left
              if (pattern < 4) return 'right'  // 2,3 = right  
              if (pattern < 6) return 'left'   // 4,5 = left
              return 'top'                     // 6 = top
            }
            
            const exitDirection = getExitDirection(index)
            const isTopCard = index === cardStack.length - 1 && isAnimatingAway
            
            return (
              <motion.div
                key={`${card.id}-${index}`}
                animate={isTopCard ? {
                  // Animate away based on pattern
                  x: exitDirection === 'left' ? -600 : exitDirection === 'right' ? 600 : card.randomX,
                  y: exitDirection === 'top' ? -600 : card.randomY,
                  rotate: card.randomRotate + (exitDirection === 'top' ? 0 : 45)
                } : {
                  // Stay in pile position
                  x: card.randomX,
                  y: card.randomY,
                  rotate: card.randomRotate
                }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeIn",
                  type: "tween"
                }}
                className="absolute"
                style={{
                  zIndex: index,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'center center'
                }}
              >
                {/* Card */}
                <div 
                  className="w-64 h-80 rounded-2xl shadow-2xl border border-gray-700 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                    filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.6))',
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}