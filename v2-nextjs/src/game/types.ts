export type TutorialPhase = 'intro' | 'card1' | 'card2' | 'card3' | 'powerup' | 'ready' | null

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
  tutorialPhase: TutorialPhase; // Tutorial progression state
  tutorialReadiness: number; // Separate readiness for tutorial
  tutorialScore: number; // Separate score for tutorial
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
  'Patty Hearst': { multiplier: 2.0, totalCards: 3 }
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
  tutorialPhase: null, // Will be set based on localStorage
  tutorialReadiness: 100, // Starting tutorial readiness
  tutorialScore: 0, // Starting tutorial score
  storyProgress: {} // Will be initialized when game starts
};