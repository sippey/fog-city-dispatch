import { useEffect, useState } from 'react'

interface StatusBarProps {
  readiness: number
  capacity: number
  score: number
  timeRemaining: number
}

export default function StatusBar({ readiness, capacity, score, timeRemaining }: StatusBarProps) {
  const [isFlashing, setIsFlashing] = useState(false)
  const [prevScore, setPrevScore] = useState(score)

  useEffect(() => {
    if (score !== prevScore) {
      setIsFlashing(true)
      setPrevScore(score)
      const timer = setTimeout(() => setIsFlashing(false), 600)
      return () => clearTimeout(timer)
    }
  }, [score, prevScore])
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const readinessPercentage = Math.max(0, Math.min(100, (readiness / capacity) * 100))

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 relative z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side: Time and Score */}
        <div className="flex items-center gap-8">
          {/* Timer with fixed width */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Time</div>
            <div className="text-2xl font-bold text-gray-800 font-mono w-20">{formatTime(timeRemaining)}</div>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Score</div>
            <div className={`text-2xl font-bold min-w-[80px] transition-all duration-300 ${
              isFlashing ? 'animate-pulse scale-110' : ''
            } ${
              score < 0 ? 'text-red-600' : 'text-emerald-600'
            }`}>{score.toLocaleString()}</div>
          </div>
        </div>

        {/* Right side: Readiness Bar */}
        <div className="flex-1 max-w-sm">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span className="text-gray-700">Readiness</span>
            <span className="text-gray-700 font-mono">{readiness}/{capacity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}