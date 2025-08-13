import { StoryArcProgress } from '../types';
import { calculateFinalScore } from '../gameLogic';

interface GameResultsProps {
  baseScore: number;
  cardsHandled: number;
  storyProgress: StoryArcProgress;
  onPlayAgain: () => void;
  onBrowseCards: () => void;
}

function GameResults({ 
  baseScore, 
  cardsHandled, 
  storyProgress, 
  onPlayAgain, 
  onBrowseCards 
}: GameResultsProps) {
  const { storyBonus, totalScore, completedArcs } = calculateFinalScore(baseScore, storyProgress);
  
  const getArcIcon = (progress: any) => {
    if (progress.isCompleted) return '✅';
    if (progress.cardsResponded > 0) return '🔶';
    return '❌';
  };

  const getArcStatus = (progress: any) => {
    const responded = progress.cardsResponded;
    const total = progress.totalCards;
    
    if (progress.isCompleted) {
      return `(${responded}/${total}) ${progress.multiplier}x`;
    } else if (responded > 0) {
      return `(${responded}/${total}) --`;
    } else {
      return `(0/${total}) --`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 flex items-center justify-center p-5">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 uppercase tracking-wider drop-shadow-sm">
          SHIFT COMPLETE
        </h1>
        
        <div className="bg-white p-8 rounded-3xl card-shadow border border-gray-200 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Final Score</div>
              <div className="text-3xl font-bold text-gray-800">{baseScore.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Cards Handled</div>
              <div className="text-3xl font-bold text-gray-800">{cardsHandled}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">Stories Discovered</div>
              <div className="text-3xl font-bold text-gray-800">{completedArcs.length}</div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 uppercase tracking-wide">
            STORY ARCS UNCOVERED
          </h2>
          
          <div className="bg-white p-8 rounded-3xl card-shadow border border-gray-200 mb-5">
            <div className="space-y-4">
              {Object.entries(storyProgress).map(([arcName, progress]) => (
                <div key={arcName} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-2xl min-w-8">{getArcIcon(progress)}</span>
                  <span className="flex-1 text-left text-gray-800 font-semibold">{arcName}</span>
                  <span className="text-gray-600 font-mono text-sm font-medium">{getArcStatus(progress)}</span>
                </div>
              ))}
            </div>
          </div>

          {storyBonus > 0 && (
            <div className="bg-gradient-to-r from-amber-100 to-amber-200 p-6 rounded-3xl border-4 border-amber-500 mb-5">
              <div className="flex justify-between items-center mb-4 text-lg font-semibold text-amber-800">
                <span>Story Bonus:</span>
                <span>+{storyBonus.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-2xl font-bold text-amber-900 border-t-2 border-amber-500 pt-4">
                <span>TOTAL SCORE:</span>
                <span>{totalScore.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <button 
            className="text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>
          <button 
            className="text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg"
            style={{ background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }}
            onClick={onBrowseCards}
          >
            BROWSE CARDS
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResults;