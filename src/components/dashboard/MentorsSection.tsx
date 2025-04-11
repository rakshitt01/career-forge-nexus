
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import MentorCard from './MentorCard';
import AnimatedContainer from '@/components/AnimatedContainer';

const MentorsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const mentors = [
    { name: 'Alex Morgan', position: 'UX Designer @ Google' },
    { name: 'Priya Sharma', position: 'Product Manager @ Microsoft' },
    { name: 'David Chen', position: 'Senior Developer @ Meta' }
  ];
  
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Featured Mentors</h2>
        <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs" onClick={() => navigate('/mentors')}>
          View All
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4">
        {mentors.map((mentor, index) => (
          <AnimatedContainer 
            key={index} 
            animation="fade-in" 
            delay={250 + index * 100}
          >
            <MentorCard 
              index={index}
              name={mentor.name}
              position={mentor.position}
            />
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
};

export default MentorsSection;
