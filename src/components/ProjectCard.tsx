
import React from 'react';
import { Calendar, DollarSign, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  title: string;
  organization: string;
  skills: string[];
  budget: string;
  deadline: string;
  imageUrl?: string;
  onApplyClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  organization,
  skills,
  budget,
  deadline,
  imageUrl,
  onApplyClick,
}) => {
  return (
    <div className="rounded-xl bg-white shadow-sm border p-4 card-hover">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3 items-center">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center text-white",
            imageUrl ? "" : "gradient-primary"
          )}>
            {imageUrl ? (
              <img src={imageUrl} alt={organization} className="w-full h-full rounded-lg object-cover" />
            ) : (
              organization.substring(0, 1).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{organization}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {skills.map((skill) => (
          <span 
            key={skill}
            className="text-xs py-1 px-2 bg-blue-50 text-blue rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between text-sm mb-4">
        <div className="flex items-center gap-1">
          <DollarSign className="h-3.5 w-3.5 text-green-600" />
          <span>{budget}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5 text-orange" />
          <span>{deadline}</span>
        </div>
      </div>
      
      <Button 
        className="w-full gradient-secondary text-white" 
        onClick={onApplyClick}
      >
        Apply Now
      </Button>
    </div>
  );
};

export default ProjectCard;
