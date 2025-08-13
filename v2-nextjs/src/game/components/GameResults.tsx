import { StoryArcProgress } from '../types'
import { calculateFinalScore } from '../gameLogic'

interface GameResultsProps {
  baseScore: number
  cardsHandled: number
  storyProgress: StoryArcProgress
  onPlayAgain: () => void
}

export default function GameResults({ 
  baseScore, 
  cardsHandled, 
  storyProgress, 
  onPlayAgain
}: GameResultsProps) {
  const { storyBonus, totalScore, completedArcs } = calculateFinalScore(baseScore, storyProgress)
  
  const getArcIcon = (progress: any) => {
    if (progress.isCompleted) return '✅'
    if (progress.cardsResponded > 0) return '🔶'
    return '❌'
  }

  const getArcStatus = (progress: any) => {
    const responded = progress.cardsResponded
    const ignored = progress.cardsIgnored
    const encountered = responded + ignored
    const total = progress.totalCards
    
    if (progress.isCompleted) {
      return `(${total}/${total}) ${progress.multiplier}x`
    } else if (encountered > 0) {
      return `(${encountered}/${total}) --`
    } else {
      return `(0/${total}) --`
    }
  }

  return (
    <div className="min-h-screen text-gray-800 font-sans flex flex-col relative overflow-hidden">
      {/* Background image with blur and dark overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(/images/cards/Confession%20Call%20Downtown.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-10" />
      
      {/* Results content */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-white uppercase tracking-wider drop-shadow-2xl">
            SHIFT COMPLETE
          </h1>
          
          <div className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide mb-2">Final Score</div>
                <div className="text-3xl font-bold text-white">{baseScore.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide mb-2">Cards Handled</div>
                <div className="text-3xl font-bold text-white">{cardsHandled}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-300 text-sm font-semibold uppercase tracking-wide mb-2">Stories Discovered</div>
                <div className="text-3xl font-bold text-white">{completedArcs.length}</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wide drop-shadow-lg">
              STORY ARCS UNCOVERED
            </h2>
            
            <div className="bg-black/60 backdrop-blur-sm p-6 rounded-2xl border border-white/20 mb-5">
              <div className="space-y-4">
                {Object.entries(storyProgress).map(([arcName, progress]) => (
                  <div key={arcName} className="flex items-center gap-4 p-4 bg-white/10 rounded-xl border border-white/20">
                    <span className="text-2xl min-w-8">{getArcIcon(progress)}</span>
                    <span className="flex-1 text-left text-white font-semibold">{arcName}</span>
                    <span className="text-gray-300 font-mono text-sm font-medium">{getArcStatus(progress)}</span>
                  </div>
                ))}
              </div>
            </div>

            {storyBonus > 0 && (
              <div className="bg-gradient-to-r from-amber-600/80 to-amber-700/80 backdrop-blur-sm p-6 rounded-2xl border-2 border-amber-400 mb-5">
                <div className="flex justify-between items-center mb-4 text-lg font-semibold text-amber-100">
                  <span>Story Bonus:</span>
                  <span>+{storyBonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold text-white border-t-2 border-amber-400 pt-4">
                  <span>TOTAL SCORE:</span>
                  <span>{totalScore.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          <button 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}