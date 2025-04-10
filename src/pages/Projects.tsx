
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowLeft, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ProjectCard from '@/components/ProjectCard';
import BottomNavigation from '@/components/BottomNavigation';
import AnimatedContainer from '@/components/AnimatedContainer';

const Projects = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [applyProjectOpen, setApplyProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Mock data
  const projects = [
    {
      id: 1,
      title: 'UI/UX Design for Fitness App',
      organization: 'HealthTech Studio',
      skills: ['UI/UX', 'Figma', 'Mobile'],
      budget: '$500-800',
      deadline: '2 weeks',
    },
    {
      id: 2,
      title: 'Frontend Development for E-commerce',
      organization: 'ShopWave',
      skills: ['React', 'Tailwind', 'API'],
      budget: '$1000-1500',
      deadline: '1 month',
    },
    {
      id: 3,
      title: 'Social Media Marketing Assistant',
      organization: 'GrowthBoost',
      skills: ['Instagram', 'Content', 'Analytics'],
      budget: '$20/hr',
      deadline: '3 months',
    },
    {
      id: 4,
      title: 'Video Editing for YouTube Channel',
      organization: 'CreatorSpace',
      skills: ['Premiere Pro', 'After Effects'],
      budget: '$25/hr',
      deadline: 'Ongoing',
    },
    {
      id: 5,
      title: 'App Development Intern',
      organization: 'TechNova',
      skills: ['React Native', 'Firebase'],
      budget: '$800/month',
      deadline: '6 months',
    },
  ];

  const internships = [
    {
      id: 6,
      title: 'Product Design Internship',
      organization: 'DesignHub Inc.',
      skills: ['Figma', 'UI/UX', 'Research'],
      budget: '$800/month',
      deadline: '3 months',
    },
    {
      id: 7,
      title: 'Software Engineering Intern',
      organization: 'CodeCraft',
      skills: ['JavaScript', 'React', 'Node.js'],
      budget: '$1000/month',
      deadline: '6 months',
    },
  ];
  
  const filters = {
    skills: ['UI/UX', 'React', 'JavaScript', 'Node.js', 'Python', 'Marketing', 'Content Writing', 'Video Editing'],
    payType: ['Fixed', 'Hourly', 'Monthly'],
    duration: ['< 1 week', '1-2 weeks', '1 month', '3 months', '6+ months'],
    workType: ['Remote', 'On-site', 'Hybrid'],
    level: ['Beginner', 'Intermediate', 'Expert'],
  };
  
  const handleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };
  
  const handleApplyClick = (project: any) => {
    setSelectedProject(project);
    setApplyProjectOpen(true);
  };
  
  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 bg-white z-10 p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Projects & Internships</h1>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <Button variant="outline" size="icon" onClick={() => setFilterOpen(true)}>
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map(filter => (
              <div key={filter} className="flex items-center gap-1 bg-secondary text-xs py-1 px-2 rounded-full">
                {filter}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-4 w-4 p-0 hover:bg-transparent" 
                  onClick={() => handleFilter(filter)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-6 px-2 text-muted-foreground"
              onClick={() => setActiveFilters([])}
            >
              Clear all
            </Button>
          </div>
        )}
      </header>
      
      <main className="p-4">
        <Tabs defaultValue="projects">
          <TabsList className="w-full grid grid-cols-2 mb-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects" className="space-y-4">
            {projects.map((project, index) => (
              <AnimatedContainer 
                key={project.id} 
                animation="fade-in" 
                delay={100 * index}
              >
                <ProjectCard
                  title={project.title}
                  organization={project.organization}
                  skills={project.skills}
                  budget={project.budget}
                  deadline={project.deadline}
                  onApplyClick={() => handleApplyClick(project)}
                />
              </AnimatedContainer>
            ))}
          </TabsContent>
          
          <TabsContent value="internships" className="space-y-4">
            {internships.map((internship, index) => (
              <AnimatedContainer 
                key={internship.id} 
                animation="fade-in" 
                delay={100 * index}
              >
                <ProjectCard
                  title={internship.title}
                  organization={internship.organization}
                  skills={internship.skills}
                  budget={internship.budget}
                  deadline={internship.deadline}
                  onApplyClick={() => handleApplyClick(internship)}
                />
              </AnimatedContainer>
            ))}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Filter Dialog */}
      <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Filter Projects</DialogTitle>
            <DialogDescription>
              Select options to narrow down your search results
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto py-2">
            <div>
              <Label className="text-sm font-medium mb-2 block">Skills</Label>
              <div className="flex flex-wrap gap-2">
                {filters.skills.map(skill => (
                  <Button
                    key={skill}
                    type="button"
                    size="sm"
                    variant={activeFilters.includes(skill) ? "default" : "outline"}
                    onClick={() => handleFilter(skill)}
                    className={`text-xs ${activeFilters.includes(skill) ? "bg-indigo hover:bg-indigo-dark" : ""}`}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Pay Type</Label>
              <div className="flex flex-wrap gap-2">
                {filters.payType.map(type => (
                  <Button
                    key={type}
                    type="button"
                    size="sm"
                    variant={activeFilters.includes(type) ? "default" : "outline"}
                    onClick={() => handleFilter(type)}
                    className={`text-xs ${activeFilters.includes(type) ? "bg-indigo hover:bg-indigo-dark" : ""}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Duration</Label>
              <div className="flex flex-wrap gap-2">
                {filters.duration.map(duration => (
                  <Button
                    key={duration}
                    type="button"
                    size="sm"
                    variant={activeFilters.includes(duration) ? "default" : "outline"}
                    onClick={() => handleFilter(duration)}
                    className={`text-xs ${activeFilters.includes(duration) ? "bg-indigo hover:bg-indigo-dark" : ""}`}
                  >
                    {duration}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Work Type</Label>
              <div className="flex flex-wrap gap-2">
                {filters.workType.map(type => (
                  <Button
                    key={type}
                    type="button"
                    size="sm"
                    variant={activeFilters.includes(type) ? "default" : "outline"}
                    onClick={() => handleFilter(type)}
                    className={`text-xs ${activeFilters.includes(type) ? "bg-indigo hover:bg-indigo-dark" : ""}`}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Experience Level</Label>
              <div className="flex flex-wrap gap-2">
                {filters.level.map(level => (
                  <Button
                    key={level}
                    type="button"
                    size="sm"
                    variant={activeFilters.includes(level) ? "default" : "outline"}
                    onClick={() => handleFilter(level)}
                    className={`text-xs ${activeFilters.includes(level) ? "bg-indigo hover:bg-indigo-dark" : ""}`}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex gap-2 flex-row">
            <Button 
              variant="outline" 
              onClick={() => setActiveFilters([])}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button 
              className="flex-1 gradient-primary text-white" 
              onClick={() => setFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Apply Modal */}
      <Dialog open={applyProjectOpen} onOpenChange={setApplyProjectOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for Project</DialogTitle>
            <DialogDescription>
              {selectedProject?.title} - {selectedProject?.organization}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-secondary/50 p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Job Description</h4>
              <p className="text-sm text-muted-foreground">
                {selectedProject?.title === 'UI/UX Design for Fitness App' 
                  ? 'We are looking for a talented UI/UX designer to help us design a modern fitness app interface. You will be working closely with our product team to create intuitive and engaging user experiences.'
                  : 'This project requires you to collaborate with our team to deliver high-quality work. You will be responsible for completing tasks on time and communicating effectively with stakeholders.'}
              </p>
              
              <div className="mt-3">
                <h4 className="font-medium text-sm mb-1">Requirements</h4>
                <ul className="text-sm text-muted-foreground list-disc pl-5">
                  <li>Experience with relevant tools and technologies</li>
                  <li>Strong portfolio of previous work</li>
                  <li>Good communication skills</li>
                  <li>Ability to meet deadlines</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume">Upload Resume</Label>
              <Input id="resume" type="file" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message (Optional)</Label>
              <textarea 
                id="message" 
                className="w-full min-h-[120px] p-3 rounded-md border border-input bg-background"
                placeholder="Tell us why you're a good fit for this project..."
              ></textarea>
            </div>
          </div>
          
          <DialogFooter>
            <Button className="w-full gradient-secondary text-white">Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </div>
  );
};

export default Projects;
