
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedContainer from './AnimatedContainer';

interface OnboardingSlideProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  index: number;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  icon,
  active,
  index,
}) => {
  return (
    <div
      className={cn(
        'min-w-full px-6 flex flex-col items-center justify-center transition-opacity duration-300',
        active ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'
      )}
    >
      <AnimatedContainer 
        animation="fade-in" 
        delay={active ? 300 : 0}
        className="flex flex-col items-center"
      >
        <div className="text-6xl mb-8">{icon}</div>
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        <p className="text-center text-muted-foreground max-w-xs">{description}</p>
      </AnimatedContainer>
    </div>
  );
};

export default OnboardingSlide;
