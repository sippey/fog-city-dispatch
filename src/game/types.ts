export interface GameState {
  readiness: number;
  capacity: number;
  score: number;
  timeRemaining: number; // in seconds
  isGameActive: boolean;
  currentCardIndex: number;
  cardsHandled: number;
  showOutcome: boolean;
  currentOutcome: string;
  tutorialStep: number; // 0-2 for first 3 cards, -1 when done
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
  card: any; // DispatchCard type from main types
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
  timeRemaining: 300, // 5 minutes
  isGameActive: true,
  currentCardIndex: 0,
  cardsHandled: 0,
  showOutcome: false,
  currentOutcome: '',
  tutorialStep: 0
};