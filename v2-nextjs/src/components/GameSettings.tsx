'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cardsData } from '@/data/cards'

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

export default function GameSettings() {
  const [gameConfig, setGameConfig] = useState<GameConfig>(DEFAULT_CONFIG)
  const router = useRouter()

  const handleStartGame = () => {
    // Store config in sessionStorage and navigate to game
    sessionStorage.setItem('gameConfig', JSON.stringify(gameConfig))
    router.push('/')
  }

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
      
      {/* Content */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-8 text-center">
        <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 drop-shadow-2xl">
          Game Settings
        </h1>
        
        {/* Game Configuration Options */}
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Configure Your Game</h2>
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

            {/* Starting Capacity */}
            <div className="text-left">
              <label className="text-sm font-medium text-gray-300 block mb-2">
                Starting Capacity
              </label>
              <select
                value={gameConfig.startingCapacity}
                onChange={(e) => setGameConfig(prev => ({ ...prev, startingCapacity: Number(e.target.value) }))}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {Array.from({ length: 21 }, (_, i) => i * 10).map(capacity => (
                  <option key={capacity} value={capacity}>
                    {capacity}
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
        
        <div className="flex gap-4">
          <Link
            href="/"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Play with Defaults
          </Link>
          
          <button
            onClick={handleStartGame}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
          >
            Start Custom Game
          </button>
        </div>
      </div>
    </div>
  )
}