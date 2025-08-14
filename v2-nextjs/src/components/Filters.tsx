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

export default function Filters({
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
    <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Filter Cards</h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search headlines, descriptions, or voice scripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Story Arc</label>
          <select
            value={selectedArc}
            onChange={(e) => setSelectedArc(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Arcs</option>
            {storyArcs.map(arc => (
              <option key={arc} value={arc}>{arc}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Has Voice</label>
          <select
            value={hasVoiceFilter}
            onChange={(e) => setHasVoiceFilter(e.target.value as 'all' | 'yes' | 'no')}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Cards</option>
            <option value="yes">With Voice</option>
            <option value="no">Without Voice</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label>
          <select
            value={powerupFilter}
            onChange={(e) => setPowerupFilter(e.target.value as 'all' | 'powerups' | 'regular')}
            className="w-full p-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Cards</option>
            <option value="powerups">Powerup Cards</option>
            <option value="regular">Regular Cards</option>
          </select>
        </div>
      </div>
    </div>
  )
}