
import React from 'react';
import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface JobCardProps {
  index: number;
  title: string;
  company: string;
  workType: string;
  salary: string;
}

const JobCard: React.FC<JobCardProps> = ({ 
  index, 
  title, 
  company, 
  workType, 
  salary 
}) => {
  const navigate = useNavigate();
  
  const getBgColor = () => {
    switch (index % 3) {
      case 0: return 'bg-indigo';
      case 1: return 'bg-blue';
      default: return 'bg-pink';
    }
  };
  
  return (
    <div className="min-w-[280px] rounded-xl bg-white shadow-sm border p-3">
      <div className="flex gap-3 items-center mb-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${getBgColor()}`}>
          <Briefcase className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight">{title}</h3>
          <p className="text-xs text-muted-foreground">{company}</p>
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground mb-3">
        <span>{workType}</span>
        <span>{salary}</span>
      </div>
      <Button size="sm" className="w-full text-xs" onClick={() => navigate('/projects')}>
        Quick Apply
      </Button>
    </div>
  );
};

export default JobCard;
