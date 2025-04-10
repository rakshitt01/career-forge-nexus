
import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="gradient-primary rounded-lg p-2 flex items-center justify-center">
          <Sparkles className={`text-white ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-6 w-6' : 'h-8 w-8'}`} />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
          <div className="bg-orange-light rounded-full w-2 h-2"></div>
        </div>
      </div>
      {withText && (
        <h1 className={`font-bold tracking-tight ${sizeClasses[size]}`}>
          <span className="gradient-text">Career</span>
          <span className="text-foreground">Forge</span>
        </h1>
      )}
    </div>
  );
};

export default Logo;
