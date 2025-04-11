
import React from 'react';
import { Button } from '@/components/ui/button';

interface MentorCardProps {
  index: number;
  name: string;
  position: string;
}

const MentorCard: React.FC<MentorCardProps> = ({ index, name, position }) => {
  return (
    <div className="min-w-[220px] rounded-xl bg-white shadow-sm border p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 overflow-hidden">
        <img 
          src={`https://source.unsplash.com/collection/8${index}675432/100x100`} 
          alt="Mentor" 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-semibold mb-1">{name}</h3>
      <p className="text-xs text-muted-foreground mb-2">{position}</p>
      <Button size="sm" variant="outline" className="w-full text-xs">
        Book Session
      </Button>
    </div>
  );
};

export default MentorCard;
