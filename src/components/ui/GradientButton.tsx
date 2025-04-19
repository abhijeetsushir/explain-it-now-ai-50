
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
  className?: string;
}

const GradientButton = ({
  variant = 'primary',
  size = 'default',
  children,
  className,
  ...props
}: GradientButtonProps) => {
  return (
    <Button
      className={cn(
        'relative font-semibold rounded-full transition-all duration-300 overflow-hidden',
        variant === 'primary' 
          ? 'bg-gradient-candy hover:shadow-neon-purple text-white' 
          : 'bg-gradient-blue hover:shadow-neon-teal text-white',
        className
      )}
      size={size}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </Button>
  );
};

export default GradientButton;
