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
    <div className="bg-white p-8 rounded-3xl card-shadow border border-gray-200 mb-8">
      <div className="mb-6">
        <label htmlFor="search" className="block mb-2 text-gray-700 text-sm font-semibold uppercase tracking-wide">
          Search:
        </label>
        <input
          id="search"
          type="text"
          placeholder="Search headlines, descriptions, or voice scripts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label htmlFor="story-arc" className="block mb-2 text-gray-700 text-sm font-semibold uppercase tracking-wide">
            Story Arc:
          </label>
          <select
            id="story-arc"
            value={selectedArc}
            onChange={(e) => setSelectedArc(e.target.value)}
            className="w-full px-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
          >
            <option value="all">All Story Arcs</option>
            {storyArcs.map(arc => (
              <option key={arc} value={arc}>{arc}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="location" className="block mb-2 text-gray-700 text-sm font-semibold uppercase tracking-wide">
            Location:
          </label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full px-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="voice" className="block mb-2 text-gray-700 text-sm font-semibold uppercase tracking-wide">
            Has Voice:
          </label>
          <select
            id="voice"
            value={hasVoiceFilter}
            onChange={(e) => setHasVoiceFilter(e.target.value as 'all' | 'yes' | 'no')}
            className="w-full px-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
          >
            <option value="all">All Cards</option>
            <option value="yes">With Voice</option>
            <option value="no">Without Voice</option>
          </select>
        </div>

        <div>
          <label htmlFor="powerup" className="block mb-2 text-gray-700 text-sm font-semibold uppercase tracking-wide">
            Card Type:
          </label>
          <select
            id="powerup"
            value={powerupFilter}
            onChange={(e) => setPowerupFilter(e.target.value as 'all' | 'powerups' | 'regular')}
            className="w-full px-4 py-3 text-base bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-800 cursor-pointer transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white font-medium"
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