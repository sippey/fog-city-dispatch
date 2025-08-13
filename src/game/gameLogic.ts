import { DispatchCard } from '../types';
import { StoryArcProgress, STORY_ARC_MULTIPLIERS } from './types';

export function shuffleCards(cards: DispatchCard[]): DispatchCard[] {
  // Separate powerups and regular cards
  const powerups = cards.filter(card => card.isPowerup);
  const regularCards = cards.filter(card => !card.isPowerup);
  
  // Shuffle regular cards
  const shuffled = [...regularCards].sort(() => Math.random() - 0.5);
  
  // Insert powerups every 8-12 cards
  const result: DispatchCard[] = [];
  let powerupIndex = 0;
  
  for (let i = 0; i < shuffled.length; i++) {
    result.push(shuffled[i]);
    
    // Insert powerup every 8-12 cards (if we have powerups left)
    if (powerupIndex < powerups.length && 
        (i + 1) % (8 + Math.floor(Math.random() * 5)) === 0) {
      result.push(powerups[powerupIndex]);
      powerupIndex++;
    }
  }
  
  // Add any remaining powerups at the end
  while (powerupIndex < powerups.length) {
    result.push(powerups[powerupIndex]);
    powerupIndex++;
  }
  
  return result;
}

export function initializeStoryProgress(): StoryArcProgress {
  const progress: StoryArcProgress = {};
  
  Object.entries(STORY_ARC_MULTIPLIERS).forEach(([arcName, { totalCards, multiplier }]) => {
    progress[arcName] = {
      totalCards,
      cardsResponded: 0,
      cardsIgnored: 0,
      isCompleted: false,
      multiplier
    };
  });
  
  return progress;
}

export function updateStoryProgress(
  card: DispatchCard, 
  responseType: 'ignore' | 'basic' | 'maximum',
  progress: StoryArcProgress
): StoryArcProgress {
  const updatedProgress = { ...progress };
  
  // Only track story arc cards (not powerups or random cards)
  if (!card.isPowerup && card.storyArc !== 'Random' && card.storyArc !== 'Powerup') {
    const arcProgress = updatedProgress[card.storyArc];
    if (arcProgress) {
      if (responseType === 'ignore') {
        arcProgress.cardsIgnored++;
      } else {
        arcProgress.cardsResponded++;
      }
      
      // Check if story is completed (80%+ response rate)
      const totalCards = arcProgress.cardsResponded + arcProgress.cardsIgnored;
      const responseRate = arcProgress.cardsResponded / totalCards;
      arcProgress.isCompleted = responseRate >= 0.8 && totalCards >= arcProgress.totalCards;
    }
  }
  
  return updatedProgress;
}

export function calculateFinalScore(baseScore: number, storyProgress: StoryArcProgress): {
  baseScore: number;
  storyBonus: number;
  totalScore: number;
  completedArcs: string[];
} {
  let storyBonus = 0;
  const completedArcs: string[] = [];
  
  Object.entries(storyProgress).forEach(([arcName, progress]) => {
    if (progress.isCompleted) {
      storyBonus += baseScore * (progress.multiplier - 1);
      completedArcs.push(arcName);
    }
  });
  
  return {
    baseScore,
    storyBonus,
    totalScore: baseScore + storyBonus,
    completedArcs
  };
}

export function canAffordResponse(readiness: number, cost: number): boolean {
  // If cost is positive (ignore), we can always afford it
  if (cost >= 0) return true;
  // If cost is negative (basic/maximum), check if we have enough readiness
  return readiness >= Math.abs(cost);
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function getResponseCost(card: DispatchCard, responseType: 'ignore' | 'basic' | 'maximum'): number {
  if (card.isPowerup) return 0;
  
  switch (responseType) {
    case 'ignore':
      return card.responses.ignore!.readiness;
    case 'basic':
      return card.responses.basic!.readiness;
    case 'maximum':
      return card.responses.maximum!.readiness;
    default:
      return 0;
  }
}

export function getResponseOutcome(card: DispatchCard, responseType: 'ignore' | 'basic' | 'maximum'): string {
  if (card.isPowerup) {
    return (card.responses as any).accept?.outcome || 'Feeling recharged and ready!';
  }
  
  switch (responseType) {
    case 'ignore':
      return card.responses.ignore!.outcome;
    case 'basic':
      return card.responses.basic!.outcome;
    case 'maximum':
      return card.responses.maximum!.outcome;
    default:
      return '';
  }
}