'use client'

import { useState } from 'react'
import { cardsData } from '@/data/cards'
import { DispatchCard } from '@/types'
import { getCardImageUrl } from '@/utils/unsplash'

// Smart shuffle function that maintains story order
function smartShuffle(cards: DispatchCard[]): DispatchCard[] {
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

export default function PreviewPage() {
  const [shuffledCards, setShuffledCards] = useState<DispatchCard[]>(() => smartShuffle(cardsData))

  const handleShuffle = () => {
    setShuffledCards(smartShuffle(cardsData))
  }

  const getCardTypeColor = (card: DispatchCard) => {
    if (card.isPowerup) return 'bg-yellow-100 text-yellow-800'
    if (card.storyArc === 'Random') return 'bg-blue-100 text-blue-800'
    return 'bg-purple-100 text-purple-800'
  }

  const getCardType = (card: DispatchCard) => {
    if (card.isPowerup) return 'Powerup'
    if (card.storyArc === 'Random') return 'Random'
    return `${card.storyArc} ${card.arcNumber || ''}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Card Order Preview</h1>
          <button
            onClick={handleShuffle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Shuffle Cards
          </button>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-3">
            {shuffledCards.map((card, index) => {
              const imageUrl = getCardImageUrl(card)
              return (
                <div key={`${card.id}-${index}`} className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="text-sm font-mono text-gray-500 w-8">
                    {index + 1}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getCardTypeColor(card)}`}>
                    {getCardType(card)}
                  </div>
                  <div className="w-16 h-20 rounded border overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={imageUrl} 
                      alt={card.headline}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log(`Failed to load image for card ${card.id}: ${imageUrl}`)
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{card.headline}</div>
                    <div className="text-sm text-gray-600">{card.location}</div>
                    <div className="text-xs text-gray-400 mt-1">{imageUrl}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Legend:</strong></p>
          <div className="flex space-x-4 mt-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-100 rounded"></div>
              <span>Random Cards</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 rounded"></div>
              <span>Powerup Cards</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-100 rounded"></div>
              <span>Story Cards (in order within arc)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}