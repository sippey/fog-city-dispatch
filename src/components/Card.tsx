import { useState } from 'react'
import { DispatchCard } from '../types'

interface CardProps {
  card: DispatchCard
}

function Card({ card }: CardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formatValue = (value: number, type: 'readiness' | 'capacity' | 'score') => {
    if (type === 'readiness' || type === 'capacity') {
      return value > 0 ? `+${value}` : `${value}`
    }
    return `${value}`
  }

  const getValueColor = (value: number, type: 'readiness' | 'capacity' | 'score') => {
    if (type === 'readiness') {
      return value > 0 ? 'text-emerald-600' : 'text-red-600'
    }
    if (type === 'capacity') {
      return value > 0 ? 'text-emerald-600' : value < 0 ? 'text-red-600' : 'text-gray-600'
    }
    return 'text-amber-600'
  }

  return (
    <div className={`bg-white rounded-3xl overflow-hidden card-shadow border transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover ${
      card.isPowerup 
        ? 'border-4 border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100' 
        : 'border-gray-200'
    }`}>
      <div 
        className="flex items-center p-6 cursor-pointer bg-gray-50 border-b border-gray-200 transition-colors duration-200 hover:bg-gray-100"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="text-2xl font-extrabold text-blue-600 mr-5 min-w-16">
          #{card.id}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
            {card.headline}
          </h3>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-2xl text-xs font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
              📍 {card.location}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold text-white ${
              card.isPowerup 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600' 
                : 'bg-gradient-to-r from-purple-500 to-purple-600'
            }`}>
              {card.storyArc}
              {card.arcNumber && <span className="ml-1 text-amber-200 font-bold">{card.arcNumber}</span>}
            </span>
            {card.hasVoice && (
              <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600">
                🎙️ Voice
              </span>
            )}
            {card.isPowerup && (
              <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-amber-600">
                ⚡ Powerup +{card.powerupValue}
              </span>
            )}
          </div>
        </div>
        <button className="w-11 h-11 rounded-full border-none text-white text-2xl font-bold cursor-pointer transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center ml-4"
                style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}>
          {isExpanded ? '−' : '+'}
        </button>
      </div>

      {isExpanded && (
        <div className="p-8 bg-white animate-slide-down">
          <div className="mb-6">
            <h4 className="text-blue-600 mb-3 text-lg font-bold uppercase tracking-wide">
              Description:
            </h4>
            <p className="text-gray-700 leading-relaxed font-medium">{card.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-blue-600 mb-3 text-lg font-bold uppercase tracking-wide">
              Visual:
            </h4>
            <p className="text-gray-700 leading-relaxed font-medium">{card.visual}</p>
          </div>

          {card.voiceScript && (
            <div className="mb-8 bg-gradient-to-r from-amber-100 to-amber-200 p-5 rounded-2xl border-l-4 border-amber-500 border border-amber-300">
              <h4 className="text-blue-600 mb-3 text-lg font-bold uppercase tracking-wide">
                Voice Script:
              </h4>
              <p className="text-amber-900 leading-relaxed font-medium italic">"{card.voiceScript}"</p>
            </div>
          )}

          <div className="mt-8">
            <h4 className="text-blue-600 mb-6 text-lg font-bold uppercase tracking-wide">
              {card.isPowerup ? 'Powerup Action:' : 'Response Options:'}
            </h4>
            {card.isPowerup ? (
              <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-6 rounded-3xl border-4 border-amber-500">
                <div className="flex justify-between items-center mb-4 p-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl">
                  <span className="text-white font-bold text-lg">Accept Powerup:</span>
                  <span className="text-amber-900 font-extrabold text-xl px-4 py-2 bg-emerald-100 rounded-full border-2 border-emerald-300">
                    +{card.powerupValue} Readiness
                  </span>
                </div>
                <div className="text-center p-3">
                  <span className="text-amber-900 text-lg font-semibold italic">
                    "{(card.responses as any).accept?.outcome || 'Feeling recharged and ready!'}"
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-200">
                  <div className="grid grid-cols-4 bg-gray-50 font-bold text-center">
                    <div className="p-4 text-gray-700 text-sm"></div>
                    <div className="p-4 text-gray-700 text-sm">Ignore</div>
                    <div className="p-4 text-gray-700 text-sm">Basic Response</div>
                    <div className="p-4 text-gray-700 text-sm">Maximum Response</div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="p-4 font-semibold text-gray-600 bg-gray-50">Readiness:</div>
                    <div className={`p-4 text-center font-bold bg-gray-100 ${getValueColor(card.responses.ignore!.readiness, 'readiness')}`}>
                      {formatValue(card.responses.ignore!.readiness, 'readiness')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-blue-50 ${getValueColor(card.responses.basic!.readiness, 'readiness')}`}>
                      {formatValue(card.responses.basic!.readiness, 'readiness')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-red-50 ${getValueColor(card.responses.maximum!.readiness, 'readiness')}`}>
                      {formatValue(card.responses.maximum!.readiness, 'readiness')}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="p-4 font-semibold text-gray-600 bg-gray-50">Capacity:</div>
                    <div className={`p-4 text-center font-bold bg-gray-100 ${getValueColor(card.responses.ignore!.capacity, 'capacity')}`}>
                      {formatValue(card.responses.ignore!.capacity, 'capacity')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-blue-50 ${getValueColor(card.responses.basic!.capacity, 'capacity')}`}>
                      {formatValue(card.responses.basic!.capacity, 'capacity')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-red-50 ${getValueColor(card.responses.maximum!.capacity, 'capacity')}`}>
                      {formatValue(card.responses.maximum!.capacity, 'capacity')}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 border-t border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="p-4 font-semibold text-gray-600 bg-gray-50">Score:</div>
                    <div className={`p-4 text-center font-bold bg-gray-100 ${getValueColor(card.responses.ignore!.score, 'score')}`}>
                      {formatValue(card.responses.ignore!.score, 'score')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-blue-50 ${getValueColor(card.responses.basic!.score, 'score')}`}>
                      {formatValue(card.responses.basic!.score, 'score')}
                    </div>
                    <div className={`p-4 text-center font-bold bg-red-50 ${getValueColor(card.responses.maximum!.score, 'score')}`}>
                      {formatValue(card.responses.maximum!.score, 'score')}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t-2 border-gray-200">
                  <h5 className="text-blue-600 mb-5 text-base font-bold uppercase tracking-wide">
                    Outcomes:
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 border-l-4 border-l-gray-500 hover:-translate-x-1 transition-transform">
                      <span className="font-bold text-gray-600 min-w-20 text-sm">Ignore:</span>
                      <span className="flex-1 text-gray-700 italic text-sm font-medium">"{card.responses.ignore!.outcome}"</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-200 border-l-4 border-l-blue-500 hover:-translate-x-1 transition-transform">
                      <span className="font-bold text-blue-600 min-w-20 text-sm">Basic:</span>
                      <span className="flex-1 text-gray-700 italic text-sm font-medium">"{card.responses.basic!.outcome}"</span>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl border border-red-200 border-l-4 border-l-red-500 hover:-translate-x-1 transition-transform">
                      <span className="font-bold text-red-600 min-w-20 text-sm">Maximum:</span>
                      <span className="flex-1 text-gray-700 italic text-sm font-medium">"{card.responses.maximum!.outcome}"</span>
                    </div>
                  </div>
                </div>
                </>
              )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Card