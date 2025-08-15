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
  
  const getRankInfo = (score: number) => {
    if (score < 500) {
      return { 
        rank: 'Trainee', 
        nextRank: 'Junior Operator', 
        pointsToNext: 500 - score 
      }
    } else if (score < 800) {
      return { 
        rank: 'Junior Operator', 
        nextRank: 'Dispatcher', 
        pointsToNext: 800 - score 
      }
    } else if (score < 1100) {
      return { 
        rank: 'Dispatcher', 
        nextRank: 'Senior Dispatcher', 
        pointsToNext: 1100 - score 
      }
    } else if (score < 1400) {
      return { 
        rank: 'Senior Dispatcher', 
        nextRank: 'Dispatch Commissioner', 
        pointsToNext: 1400 - score 
      }
    } else {
      return { 
        rank: 'Dispatch Commissioner', 
        nextRank: null, 
        pointsToNext: 0 
      }
    }
  }
  
  const rankInfo = getRankInfo(totalScore)
  
  const getArcDisplayName = (arcName: string) => {
    switch (arcName) {
      case 'Zodiac':
        return 'Zodiac Copy Cat Serial Killer'
      case 'Patty Hearst':
        return 'Echoes of Patty Hearst'
      default:
        return arcName
    }
  }

  const getArcDescription = (arcName: string) => {
    switch (arcName) {
      case 'Zodiac':
        return 'A copycat killer has been leaving cryptic messages and symbols around the city, mimicking the infamous 1960s Zodiac murders. Your dispatching connected the dots between seemingly unrelated incidents across different neighborhoods.'
      case 'Patty Hearst':
        return 'A modern kidnapping and radicalization case has emerged, echoing the 1974 Symbionese Liberation Army incident. Your careful handling of related calls helped authorities track down this contemporary conspiracy.'
      default:
        return 'You uncovered a criminal pattern through your expert dispatching decisions.'
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
          
          {/* 1. Shift Score / Calls Processed */}
          <div className="bg-black/80 p-8 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Shift Score</div>
                <div className="text-4xl font-bold text-white">{baseScore.toLocaleString()}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm uppercase tracking-wide mb-2">Calls Processed</div>
                <div className="text-4xl font-bold text-white">{cardsHandled}</div>
              </div>
            </div>
          </div>

          {/* 2. Crimes referred to the major case squad */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide">
              CRIMES REFERRED TO THE MAJOR CASE SQUAD
            </h2>
            
            {/* 3. List crimes or "None" */}
            <div className="bg-black/80 p-6 rounded-lg mb-6">
              {completedArcs.length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(storyProgress)
                    .filter(([, progress]) => progress.isCompleted)
                    .map(([arcName]) => (
                      <div key={arcName} className="border-b border-gray-600 last:border-b-0 pb-4 last:pb-0">
                        <div className="mb-2 text-left">
                          <span className="text-white font-bold text-lg">{getArcDisplayName(arcName)}</span>
                        </div>
                        <p className="text-gray-300 leading-relaxed text-left text-sm">
                          {getArcDescription(arcName)}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 text-xl">
                  None
                </div>
              )}
            </div>

            {/* 4. Squad bonus and total */}
            {storyBonus > 0 && (
              <div className="bg-black/80 p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4 text-lg text-white">
                  <span>Major Case Squad Bonus:</span>
                  <span>+{storyBonus.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-bold text-white border-t border-gray-600 pt-4">
                  <span>TOTAL SCORE:</span>
                  <span>{totalScore.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>

          {/* 5. Rank */}
          <div className="bg-black/80 p-8 rounded-lg mb-8 text-center">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
              DISPATCHER RANK
            </h2>
            <div className="text-5xl font-bold text-white mb-4">
              {rankInfo.rank}
            </div>
            {rankInfo.nextRank && (
              <div className="text-gray-300">
                <span className="font-medium">{rankInfo.pointsToNext} more points</span> needed for <span className="text-white font-semibold">{rankInfo.nextRank}</span>
              </div>
            )}
            {!rankInfo.nextRank && (
              <div className="text-white font-medium">
                🏆 Maximum rank achieved!
              </div>
            )}
          </div>

          <button 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-2xl text-2xl uppercase tracking-wide shadow-2xl transition-all duration-200 transform hover:scale-105"
            onClick={onPlayAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  )
}