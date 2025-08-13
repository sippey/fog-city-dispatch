import { DispatchCard } from '../types'

interface DownloadButtonsProps {
  cards: DispatchCard[]
  filteredCards: DispatchCard[]
}

function DownloadButtons({ cards, filteredCards }: DownloadButtonsProps) {
  const downloadJson = (data: DispatchCard[], filename: string) => {
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const downloadCsv = (data: DispatchCard[], filename: string) => {
    const headers = [
      'ID', 'Story Arc', 'Arc Number', 'Headline', 'Location', 'Description', 'Visual', 'Has Voice', 'Voice Script',
      'Ignore Readiness', 'Ignore Capacity', 'Ignore Score', 'Ignore Outcome',
      'Basic Readiness', 'Basic Capacity', 'Basic Score', 'Basic Outcome',
      'Maximum Readiness', 'Maximum Capacity', 'Maximum Score', 'Maximum Outcome'
    ]
    
    const csvContent = [
      headers.join(','),
      ...data.map(card => [
        `"${card.id}"`,
        `"${card.storyArc}"`,
        `"${card.arcNumber || ''}"`,
        `"${card.headline.replace(/"/g, '""')}"`,
        `"${card.location}"`,
        `"${card.description.replace(/"/g, '""')}"`,
        `"${card.visual.replace(/"/g, '""')}"`,
        `"${card.hasVoice}"`,
        `"${card.voiceScript?.replace(/"/g, '""') || ''}"`,
        `"${card.responses.ignore.readiness}"`,
        `"${card.responses.ignore.capacity}"`,
        `"${card.responses.ignore.score}"`,
        `"${card.responses.ignore.outcome?.replace(/"/g, '""') || ''}"`,
        `"${card.responses.basic.readiness}"`,
        `"${card.responses.basic.capacity}"`,
        `"${card.responses.basic.score}"`,
        `"${card.responses.basic.outcome?.replace(/"/g, '""') || ''}"`,
        `"${card.responses.maximum.readiness}"`,
        `"${card.responses.maximum.capacity}"`,
        `"${card.responses.maximum.score}"`,
        `"${card.responses.maximum.outcome?.replace(/"/g, '""') || ''}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white p-6 rounded-3xl card-shadow border border-gray-200 mb-8">
      <h4 className="text-blue-600 mb-5 text-lg font-bold uppercase tracking-wide">
        Download Data:
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button 
          onClick={() => downloadJson(cards, 'fog-city-cards-all.json')}
          className="text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
        >
          📄 All Cards (JSON)
        </button>
        <button 
          onClick={() => downloadCsv(cards, 'fog-city-cards-all.csv')}
          className="text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md flex items-center justify-center gap-2"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
        >
          📊 All Cards (CSV)
        </button>
        <button 
          onClick={() => downloadJson(filteredCards, 'fog-city-cards-filtered.json')}
          className={`text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
            filteredCards.length === cards.length 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:-translate-y-1 hover:shadow-lg'
          }`}
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}
          disabled={filteredCards.length === cards.length}
        >
          📄 Filtered Cards (JSON)
        </button>
        <button 
          onClick={() => downloadCsv(filteredCards, 'fog-city-cards-filtered.csv')}
          className={`text-white px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-md flex items-center justify-center gap-2 ${
            filteredCards.length === cards.length 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:-translate-y-1 hover:shadow-lg'
          }`}
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
          disabled={filteredCards.length === cards.length}
        >
          📊 Filtered Cards (CSV)
        </button>
      </div>
    </div>
  )
}

export default DownloadButtons