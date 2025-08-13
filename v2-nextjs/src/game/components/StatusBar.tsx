interface StatusBarProps {
  readiness: number
  capacity: number
  score: number
  timeRemaining: number
}

export default function StatusBar({ readiness, capacity, score, timeRemaining }: StatusBarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const readinessPercentage = Math.max(0, Math.min(100, (readiness / capacity) * 100))

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Readiness Bar */}
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>Readiness</span>
            <span>{readiness}/{capacity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>

        {/* Score */}
        <div className="text-center mx-8">
          <div className="text-sm font-medium text-gray-600">Score</div>
          <div className="text-2xl font-bold text-emerald-600">{score}</div>
        </div>

        {/* Timer */}
        <div className="text-center">
          <div className="text-sm font-medium text-gray-600">Time</div>
          <div className="text-2xl font-bold text-gray-800">{formatTime(timeRemaining)}</div>
        </div>
      </div>
    </div>
  )
}