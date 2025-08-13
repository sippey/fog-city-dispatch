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
  
  const getArcIcon = (arcName: string, progress: any) => {
    if (progress.isCompleted) return '✅';
    if (progress.cardsResponded > 0) return '🔶';
    return '❌';
  };

  const getArcStatus = (arcName: string, progress: any) => {
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
    <div className="game-results">
      <div className="results-container">
        <h1>SHIFT COMPLETE</h1>
        
        <div className="final-stats">
          <div className="stat">
            <span className="label">Final Score:</span>
            <span className="value">{baseScore.toLocaleString()}</span>
          </div>
          <div className="stat">
            <span className="label">Cards Handled:</span>
            <span className="value">{cardsHandled}</span>
          </div>
          <div className="stat">
            <span className="label">Stories Discovered:</span>
            <span className="value">{completedArcs.length}</span>
          </div>
        </div>

        <div className="story-arcs-section">
          <h2>STORY ARCS UNCOVERED:</h2>
          
          <div className="story-list">
            {Object.entries(storyProgress).map(([arcName, progress]) => (
              <div key={arcName} className="story-item">
                <span className="story-icon">{getArcIcon(arcName, progress)}</span>
                <span className="story-name">{arcName}</span>
                <span className="story-status">{getArcStatus(arcName, progress)}</span>
              </div>
            ))}
          </div>

          {storyBonus > 0 && (
            <div className="story-bonus">
              <div className="bonus-line">
                <span>Story Bonus:</span>
                <span>+{storyBonus.toLocaleString()}</span>
              </div>
              <div className="total-line">
                <span>TOTAL SCORE:</span>
                <span>{totalScore.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="action-buttons">
          <button className="play-again-btn" onClick={onPlayAgain}>
            PLAY AGAIN
          </button>
          <button className="browse-cards-btn" onClick={onBrowseCards}>
            BROWSE CARDS
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameResults;