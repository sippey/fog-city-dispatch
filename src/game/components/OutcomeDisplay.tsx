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
    <div className={`outcome-display ${phase}`} onClick={handleClick}>
      <div className="outcome-message">
        {message}
      </div>
    </div>
  );
}

export default OutcomeDisplay;