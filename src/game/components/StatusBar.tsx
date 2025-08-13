import { formatTime } from '../gameLogic';

interface StatusBarProps {
  readiness: number;
  capacity: number;
  score: number;
  timeRemaining: number;
}

function StatusBar({ readiness, capacity, score, timeRemaining }: StatusBarProps) {
  const readinessPercentage = (readiness / capacity) * 100;
  
  const getReadinessClass = () => {
    if (readinessPercentage >= 70) return 'healthy';
    if (readinessPercentage >= 30) return 'warning';
    return 'critical';
  };

  return (
    <div className="status-bar">
      <div className="status-row">
        <div className="timer">
          Timer: {formatTime(timeRemaining)}
        </div>
        <div className={`readiness ${getReadinessClass()}`}>
          Ready: {readiness}/{capacity}
        </div>
      </div>
      <div className="status-row">
        <div className="score">
          Score: {score.toLocaleString()}
        </div>
        <div className="capacity">
          Cap: {capacity}
        </div>
      </div>
      
      <div className="readiness-bar">
        <div 
          className={`readiness-fill ${getReadinessClass()}`}
          style={{ width: `${Math.max(0, readinessPercentage)}%` }}
        />
      </div>
      
      {readinessPercentage < 30 && (
        <div className="low-readiness-warning">
          ⚠️ Low readiness! Consider ignoring calls to recover.
        </div>
      )}
    </div>
  );
}

export default StatusBar;