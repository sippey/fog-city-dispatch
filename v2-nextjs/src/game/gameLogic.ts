import { DispatchCard } from '@/types'
import { StoryArcProgress, STORY_ARC_MULTIPLIERS } from './types'

export function initializeStoryProgress(): StoryArcProgress {
  const progress: StoryArcProgress = {}
  
  Object.entries(STORY_ARC_MULTIPLIERS).forEach(([arcName, { totalCards, multiplier }]) => {
    progress[arcName] = {
      totalCards,
      cardsResponded: 0,
      cardsIgnored: 0,
      isCompleted: false,
      multiplier
    }
  })
  
  return progress
}

export function updateStoryProgress(
  card: DispatchCard, 
  responseType: 'ignore' | 'basic' | 'maximum',
  progress: StoryArcProgress
): StoryArcProgress {
  const updatedProgress = { ...progress }
  
  // Only track story arc cards (not powerups or random cards)
  if (!card.isPowerup && card.storyArc !== 'Random') {
    const arcProgress = updatedProgress[card.storyArc]
    if (arcProgress) {
      console.log(`Tracking ${card.storyArc} card: "${card.headline}" - Response: ${responseType}`)
      console.log(`Before: responded=${arcProgress.cardsResponded}, ignored=${arcProgress.cardsIgnored}`)
      
      if (responseType === 'ignore') {
        arcProgress.cardsIgnored++
      } else {
        arcProgress.cardsResponded++
      }
      
      console.log(`After: responded=${arcProgress.cardsResponded}, ignored=${arcProgress.cardsIgnored}`)
      
      // Mark as completed only if ALL cards in the arc were responded to (not ignored)
      const totalCardsEncountered = arcProgress.cardsResponded + arcProgress.cardsIgnored
      arcProgress.isCompleted = totalCardsEncountered >= arcProgress.totalCards && arcProgress.cardsIgnored === 0
    } else {
      console.log(`No arc progress found for: ${card.storyArc}`)
    }
  }
  
  return updatedProgress
}

export function calculateFinalScore(baseScore: number, storyProgress: StoryArcProgress): {
  baseScore: number
  storyBonus: number
  totalScore: number
  completedArcs: string[]
} {
  let storyBonus = 0
  const completedArcs: string[] = []
  
  Object.entries(storyProgress).forEach(([arcName, progress]) => {
    if (progress.isCompleted) {
      storyBonus += baseScore * (progress.multiplier - 1)
      completedArcs.push(arcName)
    }
  })
  
  return {
    baseScore,
    storyBonus,
    totalScore: baseScore + storyBonus,
    completedArcs
  }
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}