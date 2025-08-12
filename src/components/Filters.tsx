interface FiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedArc: string
  setSelectedArc: (arc: string) => void
  selectedLocation: string
  setSelectedLocation: (location: string) => void
  hasVoiceFilter: 'all' | 'yes' | 'no'
  setHasVoiceFilter: (filter: 'all' | 'yes' | 'no') => void
  powerupFilter: 'all' | 'powerups' | 'regular'
  setPowerupFilter: (filter: 'all' | 'powerups' | 'regular') => void
  storyArcs: string[]
  locations: string[]
}

function Filters({
  searchTerm,
  setSearchTerm,
  selectedArc,
  setSelectedArc,
  selectedLocation,
  setSelectedLocation,
  hasVoiceFilter,
  setHasVoiceFilter,
  powerupFilter,
  setPowerupFilter,
  storyArcs,
  locations
}: FiltersProps) {
  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          placeholder="Search headlines, descriptions, or voice scripts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="story-arc">Story Arc:</label>
          <select
            id="story-arc"
            value={selectedArc}
            onChange={(e) => setSelectedArc(e.target.value)}
          >
            <option value="all">All Story Arcs</option>
            {storyArcs.map(arc => (
              <option key={arc} value={arc}>{arc}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="voice">Has Voice:</label>
          <select
            id="voice"
            value={hasVoiceFilter}
            onChange={(e) => setHasVoiceFilter(e.target.value as 'all' | 'yes' | 'no')}
          >
            <option value="all">All Cards</option>
            <option value="yes">With Voice</option>
            <option value="no">Without Voice</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="powerup">Card Type:</label>
          <select
            id="powerup"
            value={powerupFilter}
            onChange={(e) => setPowerupFilter(e.target.value as 'all' | 'powerups' | 'regular')}
          >
            <option value="all">All Cards</option>
            <option value="powerups">Powerups Only</option>
            <option value="regular">Regular Cards Only</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Filters