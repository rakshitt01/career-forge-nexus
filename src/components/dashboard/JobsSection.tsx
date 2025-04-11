
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import JobCard from './JobCard';
import AnimatedContainer from '@/components/AnimatedContainer';

const JobsSection: React.FC = () => {
  const navigate = useNavigate();
  
  const jobs = [
    { title: 'UX Designer Intern', company: 'DesignHub Inc.', workType: 'Remote', salary: '$15-20/hr' },
    { title: 'Frontend Developer', company: 'TechNova', workType: 'Hybrid', salary: '$25-30/hr' },
    { title: 'Marketing Assistant', company: 'MarketBoost', workType: 'On-site', salary: '$18/hr' }
  ];
  
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold">Quick Apply Jobs</h2>
        <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs" onClick={() => navigate('/projects')}>
          View All
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
      <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scroll-smooth">
        {jobs.map((job, index) => (
          <AnimatedContainer 
            key={index} 
            animation="fade-in" 
            delay={150 + index * 100}
          >
            <JobCard 
              index={index}
              title={job.title}
              company={job.company}
              workType={job.workType}
              salary={job.salary}
            />
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
};

export default JobsSection;
