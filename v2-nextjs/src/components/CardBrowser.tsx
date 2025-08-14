'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { DispatchCard } from '@/types'
import { cardsData } from '@/data/cards'
import CardList from './CardList'
import Filters from './Filters'

export default function CardBrowser() {
  const [cards] = useState<DispatchCard[]>(cardsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedArc, setSelectedArc] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [hasVoiceFilter, setHasVoiceFilter] = useState<'all' | 'yes' | 'no'>('all')
  const [powerupFilter, setPowerupFilter] = useState<'all' | 'powerups' | 'regular'>('all')

  const storyArcs = useMemo(() => {
    const arcs = new Set(cards.map(card => card.storyArc))
    return Array.from(arcs).sort()
  }, [cards])

  const locations = useMemo(() => {
    const locs = new Set(cards.map(card => card.location))
    return Array.from(locs).sort()
  }, [cards])

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = searchTerm === '' || 
        card.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (card.voiceScript && card.voiceScript.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesArc = selectedArc === 'all' || card.storyArc === selectedArc
      const matchesLocation = selectedLocation === 'all' || card.location === selectedLocation
      const matchesVoice = hasVoiceFilter === 'all' || 
        (hasVoiceFilter === 'yes' && card.hasVoice) ||
        (hasVoiceFilter === 'no' && !card.hasVoice)
      const matchesPowerup = powerupFilter === 'all' ||
        (powerupFilter === 'powerups' && card.isPowerup) ||
        (powerupFilter === 'regular' && !card.isPowerup)
      
      return matchesSearch && matchesArc && matchesLocation && matchesVoice && matchesPowerup
    }).sort((a, b) => {
      if (selectedArc === 'all') {
        return a.id - b.id
      }
      if (a.arcNumber && b.arcNumber) {
        return a.arcNumber.localeCompare(b.arcNumber)
      }
      return a.id - b.id
    })
  }, [cards, searchTerm, selectedArc, selectedLocation, hasVoiceFilter, powerupFilter])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800">
      <div className="max-w-7xl mx-auto p-5">
        <header className="text-center mb-10 p-10 bg-white rounded-3xl shadow-lg border border-gray-200">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Fog City Dispatch Cards
          </h1>
          <p className="text-xl text-gray-600 font-medium mb-6">
            1970s San Francisco Emergency Response Scenarios
          </p>
          <div className="mt-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
            >
              ← Back to Game
            </Link>
          </div>
        </header>
        
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedArc={selectedArc}
          setSelectedArc={setSelectedArc}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          hasVoiceFilter={hasVoiceFilter}
          setHasVoiceFilter={setHasVoiceFilter}
          powerupFilter={powerupFilter}
          setPowerupFilter={setPowerupFilter}
          storyArcs={storyArcs}
          locations={locations}
        />
        
        <div className="text-center mb-6 text-gray-600 font-medium">
          Showing {filteredCards.length} of {cards.length} cards
        </div>
        
        <CardList cards={filteredCards} />
      </div>
    </div>
  )
}