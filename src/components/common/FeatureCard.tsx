
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({
  title,
  description,
  icon: Icon,
  className,
  iconClassName
}: FeatureCardProps) => {
  return (
    <div className={cn("glass-card p-6 card-hover", className)}>
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
        "bg-gradient-to-br from-purple/20 to-pink/20 dark:from-purple/10 dark:to-pink/10",
        iconClassName
      )}>
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
