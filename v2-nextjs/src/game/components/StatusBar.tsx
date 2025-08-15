import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react'

interface StatusBarProps {
  readiness: number
  capacity: number
  score: number
  deckSize: number
  timeRemaining: number
  isTutorial?: boolean
}

export interface StatusBarRef {
  getScorePosition: () => DOMRect | null
  getReadinessPosition: () => DOMRect | null
  isMobileLayout: () => boolean
}

const StatusBar = forwardRef<StatusBarRef, StatusBarProps>(({ readiness, capacity, score, deckSize, timeRemaining, isTutorial = false }, ref) => {
  const [isScoreAnimating, setIsScoreAnimating] = useState(false)
  const [displayScore, setDisplayScore] = useState(score)
  const [prevScore, setPrevScore] = useState(score)
  
  const scoreRef = useRef<HTMLDivElement>(null)
  const readinessRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    getScorePosition: () => scoreRef.current?.getBoundingClientRect() || null,
    getReadinessPosition: () => readinessRef.current?.getBoundingClientRect() || null,
    isMobileLayout: () => {
      // Check if mobile layout is active by checking window width
      // This matches the sm: breakpoint from Tailwind (640px)
      return typeof window !== 'undefined' && window.innerWidth < 640
    }
  }))

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
  }, [score, prevScore])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const readinessPercentage = Math.max(0, Math.min(100, (readiness / capacity) * 100))

  return (
    <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-2 sm:p-4 relative z-30">
      <div className="max-w-5xl mx-auto">
        {/* Mobile: Stack vertically */}
        <div className="block sm:hidden">
          {/* Top row: Timer, Queue, Score */}
          <div className="flex items-center justify-between mb-2">
            {/* Timer */}
            <div className="text-center flex-1">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Time</div>
              <div className={`text-lg font-bold font-mono ${isTutorial ? 'text-gray-400' : 'text-gray-800'}`}>
                {isTutorial ? '0:00' : formatTime(timeRemaining)}
              </div>
            </div>

            {/* Queue */}
            <div className="text-center flex-1">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Queue</div>
              <div className="text-lg font-bold text-blue-600">{deckSize}</div>
            </div>

            {/* Score */}
            <div className="text-center flex-1">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Score</div>
              <div 
                ref={scoreRef}
                className={`text-lg font-bold transition-all duration-100 ${
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

          {/* Bottom row: Readiness Bar */}
          <div className="w-full">
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-gray-700">Readiness</span>
              <span className="text-gray-700 font-mono text-xs">
                {readiness}/{capacity}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                ref={readinessRef}
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                style={{ 
                  width: `${readinessPercentage}%`,
                  transition: 'width 400ms ease-out'
                }}
              />
            </div>
          </div>
        </div>

        {/* Desktop: Side by side */}
        <div className="hidden sm:flex items-center justify-between">
          {/* Left side: Time, Queue, Score */}
          <div className="flex items-center gap-8">
            {/* Timer */}
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Countdown</div>
              <div className={`text-2xl font-bold font-mono w-20 ${isTutorial ? 'text-gray-400' : 'text-gray-800'}`}>
                {isTutorial ? '0:00' : formatTime(timeRemaining)}
              </div>
            </div>

            {/* Queue */}
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Queue</div>
              <div className="text-2xl font-bold text-blue-600 min-w-[60px]">{deckSize}</div>
            </div>

            {/* Score */}
            <div className="text-center">
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">Score</div>
              <div 
                ref={scoreRef}
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
          <div className="flex-1 max-w-sm ml-8">
            <div className="flex justify-between text-sm font-medium mb-1">
              <span className="text-gray-700">Readiness</span>
              <span className="text-gray-700 font-mono">
                {readiness}/{capacity}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                ref={readinessRef}
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                style={{ 
                  width: `${readinessPercentage}%`,
                  transition: 'width 400ms ease-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

StatusBar.displayName = 'StatusBar'

export default StatusBar