'use client'

import GameResults from '@/game/components/GameResults'
import { StoryArcProgress } from '@/game/types'

// Mock data for a completed 50-card game with no crimes uncovered
const mockStoryProgress: StoryArcProgress = {
  'Zodiac': {
    cardsResponded: 8,
    cardsIgnored: 4,
    totalCards: 12,
    isCompleted: false,
    multiplier: 2
  },
  'Patty Hearst': {
    cardsResponded: 2,
    cardsIgnored: 3,
    totalCards: 5,
    isCompleted: false,
    multiplier: 1.5
  }
}

export default function GameResultsPreview() {
  const handlePlayAgain = () => {
    console.log('Play again clicked in preview')
    // In preview mode, just log
  }

  return (
    <div>
      <GameResults
        baseScore={900}
        cardsHandled={47} // Realistic for 50-card game (some ignored, some powerups)
        storyProgress={mockStoryProgress}
        onPlayAgain={handlePlayAgain}
      />
    </div>
  )
}