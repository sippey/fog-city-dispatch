import { formatTime } from '../gameLogic';

interface StatusBarProps {
  readiness: number;
  capacity: number;
  score: number;
  timeRemaining: number;
}

function StatusBar({ readiness, capacity, score, timeRemaining }: StatusBarProps) {
  const readinessPercentage = (readiness / capacity) * 100;
  
  const getReadinessStyles = () => {
    if (readinessPercentage >= 70) 
      return {
        pill: 'text-emerald-600 bg-emerald-100 border-emerald-300',
        bar: 'bg-gradient-to-r from-emerald-600 to-emerald-500'
      };
    if (readinessPercentage >= 30) 
      return {
        pill: 'text-amber-600 bg-amber-100 border-amber-300',
        bar: 'bg-gradient-to-r from-amber-600 to-amber-500'
      };
    return {
      pill: 'text-red-600 bg-red-100 border-red-300 animate-pulse-soft',
      bar: 'bg-gradient-to-r from-red-600 to-red-500'
    };
  };

  const styles = getReadinessStyles();

  return (
    <div className="bg-white p-5 sm:p-6 card-shadow border border-gray-200">
      {/* Top row */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-red-600 bg-red-100 border-2 border-red-200 px-4 py-2 rounded-full text-lg font-bold">
          Timer: {formatTime(timeRemaining)}
        </div>
        <div className={`px-4 py-2 rounded-full text-lg font-bold border-2 ${styles.pill}`}>
          Ready: {readiness}/{capacity}
        </div>
      </div>
      
      {/* Bottom row */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-2xl text-lg font-semibold">
          Score: {score.toLocaleString()}
        </div>
        <div className="text-gray-600 font-medium text-base">
          Cap: {capacity}
        </div>
      </div>
      
      {/* Readiness bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2 border border-gray-200">
        <div 
          className={`h-full rounded-full transition-all duration-300 ease-out ${styles.bar}`}
          style={{ width: `${Math.max(0, readinessPercentage)}%` }}
        />
      </div>
      
      {/* Low readiness warning */}
      {readinessPercentage < 30 && (
        <div className="text-center text-red-600 text-sm font-semibold mt-2 px-2 py-2 bg-red-100 rounded-xl border border-red-200 animate-pulse-soft">
          ⚠️ Low readiness! Consider ignoring calls to recover.
        </div>
      )}
    </div>
  );
}

export default StatusBar;