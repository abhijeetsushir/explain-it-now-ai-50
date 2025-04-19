
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingAnimationProps {
  className?: string;
}

const LoadingAnimation = ({ className }: LoadingAnimationProps) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-16 h-16">
        {/* Brain pulses */}
        <div className="absolute inset-0 rounded-full bg-gradient-candy opacity-20 animate-pulse-slow"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50"></div>
        
        {/* Orbital rings */}
        <div className="absolute inset-0 border-4 border-dashed border-secondary/30 rounded-full animate-spin" style={{ animationDuration: '15s' }}></div>
        <div className="absolute inset-2 border-4 border-dashed border-primary/30 rounded-full animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}></div>
        
        {/* Center point */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-gradient-candy animate-bounce-light"></div>
        </div>
      </div>
      <p className="ml-4 text-lg font-display animate-pulse-slow">Thinking...</p>
    </div>
  );
};

export default LoadingAnimation;
