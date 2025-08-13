import { useEffect, useState } from 'react';

interface OutcomeDisplayProps {
  message: string;
  visible: boolean;
  onComplete: () => void;
}

function OutcomeDisplay({ message, visible, onComplete }: OutcomeDisplayProps) {
  const [phase, setPhase] = useState<'hidden' | 'showing' | 'hiding'>('hidden');

  const handleClick = () => {
    if (phase === 'showing') {
      setPhase('hiding');
      setTimeout(onComplete, 200);
    }
  };

  useEffect(() => {
    if (visible) {
      setPhase('showing');
      
      // Show for 1000ms then hide
      const timer = setTimeout(() => {
        setPhase('hiding');
        
        // Complete after fade out
        const hideTimer = setTimeout(() => {
          onComplete();
        }, 200);
        
        return () => clearTimeout(hideTimer);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [visible, onComplete]);

  useEffect(() => {
    if (!visible) {
      setPhase('hidden');
    }
  }, [visible]);

  if (phase === 'hidden') return null;

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 cursor-pointer ${
        phase === 'showing' ? 'animate-fade-in' : 'animate-fade-out'
      }`} 
      onClick={handleClick}
    >
      <div className="bg-white text-gray-800 px-10 py-8 rounded-2xl text-xl font-bold text-center max-w-4xl border-4 border-blue-500 card-shadow">
        {message}
      </div>
    </div>
  );
}

export default OutcomeDisplay;