import { useEffect, useState } from 'react'

interface StatusBarProps {
  readiness: number
  capacity: number
  score: number
  deckSize: number
  timeRemaining: number
}

export default function StatusBar({ readiness, capacity, score, deckSize, timeRemaining }: StatusBarProps) {
  const [isScoreAnimating, setIsScoreAnimating] = useState(false)
  const [displayScore, setDisplayScore] = useState(score)
  const [prevScore, setPrevScore] = useState(score)

  // Update display values immediately if not animating (for initial render and edge cases)
  useEffect(() => {
    if (!isScoreAnimating) {
      setDisplayScore(score)
    }
  }, [score, isScoreAnimating])

  useEffect(() => {
    if (score !== prevScore) {
      setIsScoreAnimating(true)
      
      // Animate counting from old score to new score over 400ms
      const startScore = prevScore
      const endScore = score
      const difference = endScore - startScore
      const duration = 400 // 0.4 seconds for quick but visible counting
      
      // Cap the steps to prevent too fast animations
      const maxSteps = Math.min(Math.abs(difference), 15) // Max 15 steps
      const steps = Math.max(1, maxSteps) // At least 1 step
      const stepSize = difference / steps // Proportional step size
      const stepDuration = Math.max(25, duration / steps) // At least 25ms per step
      
      let currentStep = 0
      let isActive = true
      
      const animate = () => {
        const countingInterval = setInterval(() => {
          if (!isActive) {
            clearInterval(countingInterval)
            return
          }
          
          currentStep++
          
          if (currentStep < steps) {
            const newDisplayScore = Math.round(startScore + (stepSize * currentStep))
            setDisplayScore(newDisplayScore)
          } else {
            clearInterval(countingInterval)
            setDisplayScore(endScore)
            setIsScoreAnimating(false)
          }
        }, stepDuration)
        
        return countingInterval
      }
      
      const interval = animate()
      setPrevScore(score)
      
      return () => {
        isActive = false
        if (interval) clearInterval(interval)
        setIsScoreAnimating(false)
      }
    }
  }, [score])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const readinessPercentage = Math.max(0, Math.min(100, (readiness / capacity) * 100))

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 relative z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Left side: Time and Deck Size */}
        <div className="flex items-center gap-8">
          {/* Timer with fixed width */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Countdown</div>
            <div className="text-2xl font-bold text-gray-800 font-mono w-20">{formatTime(timeRemaining)}</div>
          </div>

          {/* Deck Size */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">QUEUE</div>
            <div className="text-2xl font-bold text-blue-600 min-w-[60px]">{deckSize}</div>
          </div>

          {/* Score */}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Score</div>
            <div 
              className={`text-2xl font-bold min-w-[80px] transition-all duration-100 ${
                displayScore < 0 ? 'text-red-600' : 'text-emerald-600'
              }`}
              style={{
                textShadow: isScoreAnimating 
                  ? displayScore < 0 
                    ? '0 0 20px rgba(239, 68, 68, 0.8), 0 0 40px rgba(239, 68, 68, 0.6)'
                    : '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6)'
                  : 'none',
                transform: isScoreAnimating ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {displayScore.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Right side: Readiness Bar */}
        <div className="flex-1 max-w-sm">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span className="text-gray-700">Readiness</span>
            <span className="text-gray-700 font-mono">
              {readiness}/{capacity}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
              style={{ 
                width: `${readinessPercentage}%`,
                transition: 'width 400ms ease-out' // Smooth transition for all readiness changes
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}