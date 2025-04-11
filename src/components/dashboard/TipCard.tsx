
import React from 'react';
import { Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TipCard: React.FC = () => {
  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <div className="gradient-secondary p-4 text-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold mb-1">Today's Tip</h3>
            <p className="text-sm text-white/90">Start with small projects to build your portfolio</p>
          </div>
          <Coffee className="h-6 w-6" />
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm mb-3">
          Begin with smaller projects to gain experience and build your portfolio. Each project adds to your skills and credibility.
        </p>
        <Button size="sm" variant="outline" className="w-full text-xs">
          Explore Starter Projects
        </Button>
      </div>
    </div>
  );
};

export default TipCard;
