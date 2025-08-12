import { useState, useMemo } from 'react'
import { DispatchCard } from './types'
import CardList from './components/CardList'
import Filters from './components/Filters'
import DownloadButtons from './components/DownloadButtons'
import cardsData from '../fog_city_dispatch_cards_with_powerups.json'

function App() {
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
      // If showing all arcs, sort by original card ID
      if (selectedArc === 'all') {
        return a.id - b.id
      }
      // When filtering by specific arc, sort by arc number if they exist
      if (a.arcNumber && b.arcNumber) {
        return a.arcNumber.localeCompare(b.arcNumber)
      }
      // Otherwise by ID
      return a.id - b.id
    })
  }, [cards, searchTerm, selectedArc, selectedLocation, hasVoiceFilter, powerupFilter])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Fog City Dispatch Cards</h1>
        <p className="subtitle">1970s San Francisco Emergency Response Scenarios</p>
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
      
      <div className="results-count">
        Showing {filteredCards.length} of {cards.length} cards
      </div>

      <DownloadButtons cards={cards} filteredCards={filteredCards} />
      
      <CardList cards={filteredCards} />
    </div>
  )
}

export default App