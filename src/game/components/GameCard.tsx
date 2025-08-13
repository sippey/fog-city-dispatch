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
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-3xl p-8 text-center relative overflow-hidden card-shadow min-h-72 flex flex-col justify-between">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500"></div>
        
        <div className="text-amber-700 text-xl font-extrabold tracking-wider mb-4 text-shadow">
          POWERUP
        </div>
        <h2 className="text-gray-800 text-2xl font-bold mb-4 leading-tight">
          {card.headline}
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed font-medium">
          {card.description}
        </p>
        <div className="text-emerald-700 text-2xl font-extrabold mb-6 px-5 py-3 bg-emerald-100 rounded-2xl border-2 border-emerald-300 inline-block">
          +{card.powerupValue} Readiness
        </div>
        <button 
          className="text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
          onClick={onPowerupAccept}
        >
          Accept
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl flex flex-col items-center gap-5">
      {/* Maximum Response Button - Top */}
      <button 
        className={`text-white w-56 px-8 py-5 rounded-3xl text-base font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-2 hover:scale-105 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${!canAfford.maximum ? 'hover:scale-100 hover:translate-y-0' : ''}`}
        style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
        onClick={() => onSwipe('up')}
        disabled={!canAfford.maximum}
      >
        Maximum Response
      </button>

      <div className="flex items-center gap-5 w-full">
        {/* Ignore Button - Left */}
        <button 
          className={`text-white w-24 h-52 px-3 py-5 rounded-3xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-2 hover:scale-105 shadow-lg flex flex-col items-center justify-center text-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${!canAfford.ignore ? 'hover:scale-100 hover:translate-y-0' : ''}`}
          style={{ background: 'linear-gradient(135deg, #6b7280, #4b5563)' }}
          onClick={() => onSwipe('left')}
          disabled={!canAfford.ignore}
        >
          <span>Ignore</span>
        </button>

        {/* Main Card */}
        <div className={`bg-white rounded-3xl p-10 card-shadow border border-gray-200 transition-all duration-300 hover:-translate-y-1 hover:card-shadow-hover min-h-80 flex-1 flex flex-col justify-between relative overflow-hidden ${card.storyArc !== 'Random' ? 'border-t-8 border-t-amber-500' : 'border-t-8 border-t-blue-500'}`}>
          {/* Top gradient bar for story cards */}
          {card.storyArc !== 'Random' && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500"></div>
          )}
          {card.storyArc === 'Random' && (
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          )}
          
          <div>
            <h2 className="text-2xl font-extrabold mb-3 text-gray-800 leading-tight">
              {card.headline}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 font-medium">
              {card.description}
            </p>
          </div>
          
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border-2 border-gray-200">
            <div className="text-red-600 font-bold text-sm">
              {card.responses.basic.readiness} readiness
            </div>
            <div className="text-emerald-600 font-bold text-sm">
              +{card.responses.basic.score} pts
            </div>
          </div>
        </div>

        {/* Basic Response Button - Right */}
        <button 
          className={`text-white w-24 h-52 px-3 py-5 rounded-3xl text-sm font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-2 hover:scale-105 shadow-lg flex flex-col items-center justify-center text-center disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none ${!canAfford.basic ? 'hover:scale-100 hover:translate-y-0' : ''}`}
          style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
          onClick={() => onSwipe('right')}
          disabled={!canAfford.basic}
        >
          <span>Basic Response</span>
        </button>
      </div>
    </div>
  );
}

export default GameCard;