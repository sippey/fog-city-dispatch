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
    <div className="download-buttons">
      <h4>Download Data:</h4>
      <div className="button-group">
        <button 
          onClick={() => downloadJson(cards, 'fog-city-cards-all.json')}
          className="download-btn json-btn"
        >
          📄 All Cards (JSON)
        </button>
        <button 
          onClick={() => downloadCsv(cards, 'fog-city-cards-all.csv')}
          className="download-btn csv-btn"
        >
          📊 All Cards (CSV)
        </button>
        <button 
          onClick={() => downloadJson(filteredCards, 'fog-city-cards-filtered.json')}
          className="download-btn json-btn"
          disabled={filteredCards.length === cards.length}
        >
          📄 Filtered Cards (JSON)
        </button>
        <button 
          onClick={() => downloadCsv(filteredCards, 'fog-city-cards-filtered.csv')}
          className="download-btn csv-btn"
          disabled={filteredCards.length === cards.length}
        >
          📊 Filtered Cards (CSV)
        </button>
      </div>
    </div>
  )
}

export default DownloadButtons