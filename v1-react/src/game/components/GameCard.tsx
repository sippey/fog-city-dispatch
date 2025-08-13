import { useState, useRef, useEffect, useCallback } from 'react';
import { DispatchCard } from '../../types';

interface GameCardProps {
  card: DispatchCard;
  onSwipe: (direction: 'left' | 'right' | 'up') => void;
  onPowerupAccept: () => void;
  canAfford: {
    ignore: boolean;
    basic: boolean;
    maximum: boolean;
  };
  showTutorial: boolean;
  tutorialStep: number;
}

function GameCard({ 
  card, 
  onSwipe, 
  onPowerupAccept, 
  canAfford 
}: GameCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState<'left' | 'right' | 'up' | null>(null);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const currentPosRef = useRef({ x: 0, y: 0 });
  const directionRef = useRef<'left' | 'right' | 'up' | null>(null);

  const updateDrag = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const deltaX = clientX - dragStartRef.current.x;
    const deltaY = clientY - dragStartRef.current.y;
    
    // Store current position in ref for end event
    currentPosRef.current = { x: deltaX, y: deltaY };
    
    // Determine direction
    let newDirection = null;
    const threshold = 30;
    if (Math.abs(deltaY) > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < 0 && canAfford.maximum) newDirection = 'up';
    } else if (Math.abs(deltaX) > threshold) {
      if (deltaX < 0) newDirection = 'left';
      else if (canAfford.basic) newDirection = 'right';
    }
    
    if (newDirection !== directionRef.current) {
      directionRef.current = newDirection;
    }
    
    // Limit movement if can't afford
    let finalX = deltaX;
    let finalY = deltaY;
    if (deltaX > 50 && !canAfford.basic) finalX = 50;
    if (deltaY < -50 && !canAfford.maximum) finalY = -50;
    
    setDragOffset({ x: finalX, y: finalY });
  };

  const endDrag = () => {
    if (!isDragging) return;
    
    const { x: currentX, y: currentY } = currentPosRef.current;
    const threshold = 100;
    
    if (Math.abs(currentY) > threshold && Math.abs(currentY) > Math.abs(currentX) && currentY < 0) {
      if (canAfford.maximum) {
        onSwipe('up');
      }
    } else if (Math.abs(currentX) > threshold && Math.abs(currentX) > Math.abs(currentY)) {
      if (currentX < 0) {
        onSwipe('left');
      } else if (canAfford.basic) {
        onSwipe('right');
      }
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
    setDirection(directionRef.current);
    currentPosRef.current = { x: 0, y: 0 };
    directionRef.current = null;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateDrag(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches[0]) {
        updateDrag(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleEnd = () => {
      endDrag();
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: false });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  if (card.isPowerup) {
    return (
      <div className="bg-gradient-to-br from-amber-100 to-amber-200 border-4 border-amber-500 rounded-3xl p-8 text-center relative overflow-hidden card-shadow min-h-72 flex flex-col justify-between">
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500"></div>
        
        <div className="text-amber-700 text-xl font-extrabold tracking-wider mb-4 text-shadow">
          POWERUP
        </div>
        <h2 className="text-gray-800 text-2xl font-bold mb-4 leading-tight">
          {card.headline}
        </h2>
        <p className="text-gray-700 mb-6 leading-relaxed font-medium">
          {card.description}
        </p>
        <div className="text-emerald-700 text-2xl font-extrabold mb-6 px-5 py-3 bg-emerald-100 rounded-2xl border-2 border-emerald-300 inline-block">
          +{card.powerupValue} Readiness
        </div>
        <button 
          className="text-white px-8 py-4 rounded-2xl text-lg font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 hover:shadow-lg shadow-md"
          style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}
          onClick={onPowerupAccept}
        >
          Accept
        </button>
      </div>
    );
  }

  // Get the appropriate response based on current swipe direction
  const getActiveResponse = () => {
    const currentDirection = isDragging ? directionRef.current : direction;
    switch(currentDirection) {
      case 'left': return card.responses.ignore!;
      case 'right': return card.responses.basic!;
      case 'up': return card.responses.maximum!;
      default: return card.responses.basic!; // Default to basic when not swiping
    }
  };

  // Check if current swipe direction is affordable
  const isSwipeAffordable = () => {
    const currentDirection = isDragging ? directionRef.current : direction;
    switch(currentDirection) {
      case 'left': return true; // Ignore is always available
      case 'right': return canAfford.basic;
      case 'up': return canAfford.maximum;
      default: return true;
    }
  };
  
  const activeResponse = getActiveResponse();

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Main Swipeable Card */}
      <div className="relative w-full max-w-sm mx-auto px-8">
        
        {/* Swipe Targets in Grey Area Outside Card */}
        
        {/* Left Side - Ignore */}
        <div className="absolute -left-8 top-1/2 z-20" style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}>
          <div className={`bg-green-500 text-white px-2 py-2 rounded-lg shadow-lg transition-opacity duration-200 ${(isDragging ? directionRef.current : direction) === 'left' ? 'opacity-100' : 'opacity-70'}`}>
            <span className="text-xs font-bold uppercase tracking-wide">IGNORE</span>
          </div>
        </div>
        
        {/* Right Side - Basic */}
        <div className="absolute -right-8 top-1/2 z-20" style={{ transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}>
          <div className={`${canAfford.basic ? 'bg-blue-500' : 'bg-gray-400'} text-white px-2 py-2 rounded-lg shadow-lg transition-opacity duration-200 ${(isDragging ? directionRef.current : direction) === 'right' ? 'opacity-100' : 'opacity-70'}`}>
            <span className="text-xs font-bold uppercase tracking-wide">BASIC</span>
          </div>
        </div>
        
        {/* Top Side - Maximum */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`${canAfford.maximum ? 'bg-red-500' : 'bg-gray-400'} text-white px-2 py-2 rounded-lg shadow-lg transition-opacity duration-200 ${(isDragging ? directionRef.current : direction) === 'up' ? 'opacity-100' : 'opacity-70'}`}>
            <span className="text-xs font-bold uppercase tracking-wide">MAXIMUM</span>
          </div>
        </div>
        
        <div 
          ref={cardRef}
          className={`relative bg-white rounded-2xl p-6 card-shadow border-0 transition-all duration-300 min-h-96 flex flex-col justify-between overflow-hidden select-none cursor-grab active:cursor-grabbing ${card.storyArc !== 'Random' ? 'bg-gradient-to-br from-white to-amber-50' : 'bg-gradient-to-br from-white to-blue-50'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) ${isDragging ? 'scale(1.02)' : 'scale(1)'}`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            touchAction: 'none'
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDragging(true);
            setDragOffset({ x: 0, y: 0 });
            setDirection(null);
            dragStartRef.current = { x: e.clientX, y: e.clientY };
            currentPosRef.current = { x: 0, y: 0 };
            directionRef.current = null;
          }}
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setIsDragging(true);
            setDragOffset({ x: 0, y: 0 });
            setDirection(null);
            dragStartRef.current = { x: touch.clientX, y: touch.clientY };
            currentPosRef.current = { x: 0, y: 0 };
            directionRef.current = null;
          }}
        >
          
          {/* Story Arc Indicator */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-20"></div>
          
          {/* Emergency Type Badge - only show when not swiping */}
          {!(isDragging ? directionRef.current : direction) && (
            <div className="flex items-center justify-center mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${card.storyArc !== 'Random' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                {card.storyArc !== 'Random' ? '⭐ Story' : '📞 Emergency'}
              </div>
            </div>
          )}
          
          {/* Card Content - shows either normal content or dramatic score view */}
          {!(isDragging ? directionRef.current : direction) ? (
            <div className="flex-1 flex flex-col justify-center text-center">
              <h2 className="text-xl font-extrabold mb-3 text-gray-800 leading-tight">
                {card.headline}
              </h2>
              
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                  📍 {card.location}
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6 font-medium text-sm">
                {card.description}
              </p>
            </div>
          ) : (
            /* Dramatic Score Display - takes full card area when swiping */
            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
              {isSwipeAffordable() ? (
                <>
                  <div className="text-2xl font-black text-gray-700 uppercase tracking-widest">
                    {(isDragging ? directionRef.current : direction) === 'left' ? 'Ignoring Call' : 
                     (isDragging ? directionRef.current : direction) === 'right' ? 'Basic Response' : 
                     'Maximum Response'}
                  </div>
                  
                  <div className="space-y-6">
                    <div className={`text-6xl font-extrabold ${activeResponse.readiness < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {activeResponse.readiness > 0 ? '+' : ''}{activeResponse.readiness}
                    </div>
                    <div className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                      Readiness
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-extrabold text-emerald-500">
                      +{activeResponse.score}
                    </div>
                    <div className="text-lg font-bold text-gray-600 uppercase tracking-wide">
                      Points
                    </div>
                  </div>
                </>
              ) : (
                /* Cannot Afford Display */
                <div className="space-y-8">
                  <div className="text-2xl font-black text-gray-400 uppercase tracking-widest">
                    {(isDragging ? directionRef.current : direction) === 'right' ? 'Basic Response' : 'Maximum Response'}
                  </div>
                  
                  <div className="text-6xl font-extrabold text-red-600">
                    ✗
                  </div>
                  
                  <div className="text-xl font-bold text-red-600 uppercase tracking-wide">
                    Not Enough Readiness
                  </div>
                </div>
              )}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default GameCard;