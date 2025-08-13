import { DispatchCard } from '../../types';

interface GameCardProps {
  card: DispatchCard;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onPowerupAccept: () => void;
  canAfford: {
    ignore: boolean;
    basic: boolean;
    maximum: boolean;
  };
  showTutorial: boolean;
  tutorialStep: number;
}

function GameCard({ 
  card, 
  onSwipe, 
  onPowerupAccept, 
  canAfford, 
  showTutorial, 
  tutorialStep 
}: GameCardProps) {

  if (card.isPowerup) {
    return (
      <div className="game-card powerup-game-card">
        <div className="powerup-label">POWERUP</div>
        <h2>{card.headline}</h2>
        <p className="powerup-description">{card.description}</p>
        <div className="powerup-benefit">+{card.powerupValue} Readiness</div>
        <button 
          className="accept-powerup-btn"
          onClick={onPowerupAccept}
        >
          Accept
        </button>
      </div>
    );
  }

  return (
    <div className="game-card-container">
      {/* Maximum Response Button - Top */}
      <button 
        className="response-btn maximum-btn top-btn"
        onClick={() => onSwipe('up')}
        disabled={!canAfford.maximum}
      >
        <div className="btn-label">Maximum Response</div>
      </button>

      <div className="card-row">
        {/* Ignore Button - Left */}
        <button 
          className="response-btn ignore-btn side-btn"
          onClick={() => onSwipe('left')}
          disabled={!canAfford.ignore}
        >
          <div className="btn-label">Ignore</div>
        </button>

        {/* Main Card */}
        <div className={`game-card ${card.storyArc !== 'Random' ? 'story-card' : ''}`}>
          <div className="card-header">
            <h2>{card.headline}</h2>
          </div>
          
          <p className="description">{card.description}</p>
          
          <div className="basic-response-info">
            <div className="basic-cost">{card.responses.basic.readiness} readiness</div>
            <div className="basic-points">+{card.responses.basic.score} pts</div>
          </div>
        </div>

        {/* Basic Response Button - Right */}
        <button 
          className="response-btn basic-btn side-btn"
          onClick={() => onSwipe('right')}
          disabled={!canAfford.basic}
        >
          <div className="btn-label">Basic Response</div>
        </button>
      </div>
    </div>
  );
}

export default GameCard;