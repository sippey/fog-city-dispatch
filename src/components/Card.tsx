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

  const getValueClass = (value: number, type: 'readiness' | 'capacity' | 'score') => {
    if (type === 'readiness') {
      return value > 0 ? 'positive' : 'negative'
    }
    if (type === 'capacity') {
      return value > 0 ? 'positive' : value < 0 ? 'negative' : 'neutral'
    }
    return 'score'
  }

  return (
    <div className={`card ${card.isPowerup ? 'powerup-card' : ''}`}>
      <div className="card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="card-id">#{card.id}</div>
        <div className="card-title">
          <h3>{card.headline}</h3>
          <div className="card-meta">
            <span className="location">{card.location}</span>
            <span className={`arc ${card.isPowerup ? 'powerup-arc' : ''}`}>
              {card.storyArc}
              {card.arcNumber && <span className="arc-number"> {card.arcNumber}</span>}
            </span>
            {card.hasVoice && <span className="voice-indicator">🎙️ Voice</span>}
            {card.isPowerup && <span className="powerup-indicator">⚡ Powerup +{card.powerupValue}</span>}
          </div>
        </div>
        <button className="expand-button">{isExpanded ? '−' : '+'}</button>
      </div>

      {isExpanded && (
        <div className="card-body">
          <div className="description">
            <h4>Description:</h4>
            <p>{card.description}</p>
          </div>

          <div className="visual">
            <h4>Visual:</h4>
            <p>{card.visual}</p>
          </div>

          {card.voiceScript && (
            <div className="voice-script">
              <h4>Voice Script:</h4>
              <p className="script">"{card.voiceScript}"</p>
            </div>
          )}

          <div className="response-levels">
            <h4>{card.isPowerup ? 'Powerup Action:' : 'Response Options:'}</h4>
            {card.isPowerup ? (
              <div className="powerup-action">
                <div className="powerup-accept">
                  <span className="accept-label">Accept Powerup:</span>
                  <span className="readiness-gain">+{card.powerupValue} Readiness</span>
                </div>
                <div className="powerup-outcome">
                  <span className="outcome-text">"{(card.responses as any).accept?.outcome || 'Feeling recharged and ready!'}"</span>
                </div>
              </div>
            ) : (
              <>
                <div className="response-table">
                  <div className="response-header">
                    <div></div>
                    <div>Ignore</div>
                    <div>Basic Response</div>
                    <div>Maximum Response</div>
                  </div>
              <div className="response-row">
                <div className="row-label">Readiness:</div>
                <div className={`response-ignore ${getValueClass(card.responses.ignore.readiness, 'readiness')}`}>
                  {formatValue(card.responses.ignore.readiness, 'readiness')}
                </div>
                <div className={`response-basic ${getValueClass(card.responses.basic.readiness, 'readiness')}`}>
                  {formatValue(card.responses.basic.readiness, 'readiness')}
                </div>
                <div className={`response-maximum ${getValueClass(card.responses.maximum.readiness, 'readiness')}`}>
                  {formatValue(card.responses.maximum.readiness, 'readiness')}
                </div>
              </div>
              <div className="response-row">
                <div className="row-label">Capacity:</div>
                <div className={`response-ignore ${getValueClass(card.responses.ignore.capacity, 'capacity')}`}>
                  {formatValue(card.responses.ignore.capacity, 'capacity')}
                </div>
                <div className={`response-basic ${getValueClass(card.responses.basic.capacity, 'capacity')}`}>
                  {formatValue(card.responses.basic.capacity, 'capacity')}
                </div>
                <div className={`response-maximum ${getValueClass(card.responses.maximum.capacity, 'capacity')}`}>
                  {formatValue(card.responses.maximum.capacity, 'capacity')}
                </div>
              </div>
              <div className="response-row">
                <div className="row-label">Score:</div>
                <div className={`response-ignore ${getValueClass(card.responses.ignore.score, 'score')}`}>
                  {formatValue(card.responses.ignore.score, 'score')}
                </div>
                <div className={`response-basic ${getValueClass(card.responses.basic.score, 'score')}`}>
                  {formatValue(card.responses.basic.score, 'score')}
                </div>
                <div className={`response-maximum ${getValueClass(card.responses.maximum.score, 'score')}`}>
                  {formatValue(card.responses.maximum.score, 'score')}
                </div>
              </div>
            </div>
            
            <div className="outcome-messages">
              <h5>Outcomes:</h5>
              <div className="outcome-grid">
                <div className="outcome-item outcome-ignore">
                  <span className="outcome-label">Ignore:</span>
                  <span className="outcome-text">"{card.responses.ignore.outcome}"</span>
                </div>
                <div className="outcome-item outcome-basic">
                  <span className="outcome-label">Basic:</span>
                  <span className="outcome-text">"{card.responses.basic.outcome}"</span>
                </div>
                <div className="outcome-item outcome-maximum">
                  <span className="outcome-label">Maximum:</span>
                  <span className="outcome-text">"{card.responses.maximum.outcome}"</span>
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