export interface GameState {
  readiness: number;
  capacity: number;
  score: number;
  deckSize: number; // Number of cards remaining in deck
  timeRemaining: number; // in seconds
  isGameActive: boolean;
  showIntro: boolean; // Show intro screen before game starts
  showResults: boolean; // Show results screen after game ends
  currentCardIndex: number;
  cardsHandled: number;
  showOutcome: boolean;
  currentOutcome: string;
  tutorialStep: number; // 0-2 for first 3 cards, -1 when done
  storyProgress: StoryArcProgress; // Track story arc completion
}

export interface StoryArcProgress {
  [arcName: string]: {
    totalCards: number;
    cardsResponded: number; // basic or maximum responses
    cardsIgnored: number;
    isCompleted: boolean;
    multiplier: number;
  };
}

export interface GameCard {
  card: import('@/types').DispatchCard;
  isInDeck: boolean;
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'up';
  responseType: 'ignore' | 'basic' | 'maximum';
}

export const STORY_ARC_MULTIPLIERS = {
  'Zodiac': { multiplier: 3.0, totalCards: 8 },
  'Patty Hearst': { multiplier: 2.0, totalCards: 5 },
  'Moscone-Milk': { multiplier: 2.0, totalCards: 5 },
  'Golden Dragon': { multiplier: 1.5, totalCards: 3 },
  'Marina Gas': { multiplier: 1.5, totalCards: 3 },
  'Cable Car': { multiplier: 1.5, totalCards: 3 }
} as const;

export const INITIAL_GAME_STATE: GameState = {
  readiness: 100,
  capacity: 200,
  score: 0,
  deckSize: 0, // Will be set when deck is initialized
  timeRemaining: 300, // 5 minutes
  isGameActive: false, // Don't start until intro is complete
  showIntro: true, // Show intro screen first
  showResults: false, // Show results screen after game ends
  currentCardIndex: 0,
  cardsHandled: 0,
  showOutcome: false,
  currentOutcome: '',
  tutorialStep: 0,
  storyProgress: {} // Will be initialized when game starts
};