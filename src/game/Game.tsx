import { useState, useEffect, useCallback } from 'react';
import { DispatchCard } from '../types';
import { GameState, StoryArcProgress, INITIAL_GAME_STATE } from './types';
import { 
  shuffleCards, 
  initializeStoryProgress, 
  updateStoryProgress,
  canAffordResponse,
  getResponseCost,
  getResponseOutcome
} from './gameLogic';
import StatusBar from './components/StatusBar';
import GameCard from './components/GameCard';
import OutcomeDisplay from './components/OutcomeDisplay';
import GameResults from './components/GameResults';
import { cardsData } from '../data/cards';

function Game() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [storyProgress, setStoryProgress] = useState<StoryArcProgress>(initializeStoryProgress());
  const [cardDeck, setCardDeck] = useState<DispatchCard[]>([]);

  // Initialize game
  useEffect(() => {
    const shuffled = shuffleCards(cardsData);
    setCardDeck(shuffled);
  }, []);

  // Game timer - runs every second
  useEffect(() => {
    if (!gameState.isGameActive) return;

    const timer = setInterval(() => {
      setGameState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1;
        
        if (newTimeRemaining <= 0) {
          return { ...prev, timeRemaining: 0, isGameActive: false };
        }
        
        return {
          ...prev,
          timeRemaining: newTimeRemaining,
          capacity: prev.capacity + 1 // +1 capacity every second
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isGameActive]);

  const currentCard = cardDeck[gameState.currentCardIndex];

  const handleCardResponse = useCallback((responseType: 'ignore' | 'basic' | 'maximum') => {
    if (!currentCard || gameState.showOutcome) return;

    const cost = getResponseCost(currentCard, responseType);
    
    // Check if player can afford this response
    if (!canAffordResponse(gameState.readiness, cost)) {
      return; // Can't afford this response
    }

    const outcome = getResponseOutcome(currentCard, responseType);
    const points = currentCard.isPowerup ? 0 : 
      responseType === 'ignore' ? 0 :
      responseType === 'basic' ? currentCard.responses.basic!.score :
      currentCard.responses.maximum!.score;

    const capacityGain = currentCard.isPowerup ? 0 :
      responseType === 'ignore' ? 0 :
      responseType === 'basic' ? currentCard.responses.basic!.capacity :
      currentCard.responses.maximum!.capacity;

    // Update game state
    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + cost), // cost is already negative for actions, positive for ignore
      score: prev.score + points,
      capacity: prev.capacity + capacityGain,
      showOutcome: true,
      currentOutcome: outcome,
      cardsHandled: prev.cardsHandled + 1,
      tutorialStep: prev.tutorialStep < 2 ? prev.tutorialStep + 1 : -1
    }));

    // Update story progress
    setStoryProgress(prev => updateStoryProgress(currentCard, responseType, prev));
  }, [currentCard, gameState.readiness, gameState.showOutcome]);

  const handleSwipe = useCallback((direction: 'left' | 'right' | 'up') => {
    const responseMap = {
      'left': 'ignore' as const,
      'right': 'basic' as const,
      'up': 'maximum' as const
    };
    
    handleCardResponse(responseMap[direction]);
  }, [handleCardResponse]);

  const handlePowerupAccept = useCallback(() => {
    if (!currentCard?.isPowerup) return;
    
    const readinessGain = currentCard.powerupValue || 0;
    const outcome = (currentCard.responses as any).accept?.outcome || 'Feeling recharged and ready!';

    setGameState(prev => ({
      ...prev,
      readiness: Math.min(prev.capacity, prev.readiness + readinessGain),
      showOutcome: true,
      currentOutcome: outcome,
      cardsHandled: prev.cardsHandled + 1
    }));
  }, [currentCard]);

  const handleOutcomeComplete = useCallback(() => {
    setGameState(prev => {
      const nextIndex = prev.currentCardIndex + 1;
      
      // Check if we've run out of cards or time
      if (nextIndex >= cardDeck.length || prev.timeRemaining <= 0) {
        return { ...prev, showOutcome: false, isGameActive: false };
      }
      
      return {
        ...prev,
        currentCardIndex: nextIndex,
        showOutcome: false,
        currentOutcome: ''
      };
    });
  }, [cardDeck.length]);

  const handlePlayAgain = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    setStoryProgress(initializeStoryProgress());
    const shuffled = shuffleCards(cardsData);
    setCardDeck(shuffled);
  }, []);

  const handleBrowseCards = useCallback(() => {
    window.location.href = '/fog-city-dispatch/browse-cards';
  }, []);

  // Check affordability for current card
  const canAfford = currentCard ? {
    ignore: canAffordResponse(gameState.readiness, getResponseCost(currentCard, 'ignore')),
    basic: canAffordResponse(gameState.readiness, getResponseCost(currentCard, 'basic')),
    maximum: canAffordResponse(gameState.readiness, getResponseCost(currentCard, 'maximum'))
  } : { ignore: true, basic: true, maximum: true };

  if (!gameState.isGameActive && gameState.timeRemaining <= 0) {
    return (
      <GameResults
        baseScore={gameState.score}
        cardsHandled={gameState.cardsHandled}
        storyProgress={storyProgress}
        onPlayAgain={handlePlayAgain}
        onBrowseCards={handleBrowseCards}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center">
        <div className="text-gray-800 text-xl font-semibold">Loading cards...</div>
      </div>
    );
  }

  if (cardDeck.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800 font-sans flex flex-col select-none overflow-hidden">
      <StatusBar
        readiness={gameState.readiness}
        capacity={gameState.capacity}
        score={gameState.score}
        timeRemaining={gameState.timeRemaining}
      />
      
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <GameCard
          card={currentCard}
          onSwipe={handleSwipe}
          onPowerupAccept={handlePowerupAccept}
          canAfford={canAfford}
          showTutorial={gameState.tutorialStep >= 0 && gameState.tutorialStep <= 2}
          tutorialStep={gameState.tutorialStep}
        />
      </div>
      
      <OutcomeDisplay
        message={gameState.currentOutcome}
        visible={gameState.showOutcome}
        onComplete={handleOutcomeComplete}
      />
      
      {/* Card Browser Link */}
      <div className="absolute bottom-4 left-4">
        <a
          href="/fog-city-dispatch/browse-cards"
          className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 text-sm font-medium"
        >
          📚 Browse All Cards
        </a>
      </div>
    </div>
  );
}

export default Game;