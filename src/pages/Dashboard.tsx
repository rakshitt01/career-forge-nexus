
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Award, ChevronRight, Briefcase, Coffee, User, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedContainer from '@/components/AnimatedContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  college_name: string;
  graduation_year: number | null;
  interests: string[] | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileCompletion, setProfileCompletion] = useState(65);
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error('Error fetching profile:', error);
          toast({
            title: 'Error',
            description: 'Could not load profile data',
            variant: 'destructive',
          });
        } else if (data) {
          setProfile(data);
          
          // Calculate profile completion
          let completionScore = 0;
          if (data.full_name) completionScore += 20;
          if (data.email) completionScore += 20;
          if (data.college_name) completionScore += 20;
          if (data.graduation_year) completionScore += 20;
          if (data.interests && data.interests.length > 0) completionScore += 20;
          
          setProfileCompletion(completionScore);
        }
      } catch (error) {
        console.error('Profile fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
    
    // Subscribe to realtime updates for projects
    const projectsChannel = supabase
      .channel('public:projects')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'projects' 
      }, (payload) => {
        console.log('Projects update:', payload);
        // You could update the UI here when new projects arrive
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(projectsChannel);
    };
  }, [user]);
  
  return (
    <div className="min-h-screen pb-16">
      <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Hi, {profile?.full_name?.split(' ')[0] || 'there'}! 👋</h1>
            <p className="text-sm text-muted-foreground">Let's build your career today</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
              <Bell className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full bg-gray-100" 
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="p-4 space-y-6">
        <AnimatedContainer animation="fade-in" delay={100}>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Profile Completion</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => navigate('/profile')}>
                  Complete Now
                </Button>
              </div>
              <Progress value={profileCompletion} className="h-2 mb-2" />
              <p className="text-xs text-muted-foreground">
                Complete your profile to unlock more opportunities
              </p>
            </CardContent>
          </Card>
        </AnimatedContainer>
        
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Quick Apply Jobs</h2>
            <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs" onClick={() => navigate('/projects')}>
              View All
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4 scroll-smooth">
            {[1, 2, 3].map((_, index) => (
              <AnimatedContainer 
                key={index} 
                animation="fade-in" 
                delay={150 + index * 100}
                className="min-w-[280px] rounded-xl bg-white shadow-sm border p-3"
              >
                <div className="flex gap-3 items-center mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${
                    index === 0 ? 'bg-indigo' : index === 1 ? 'bg-blue' : 'bg-pink'
                  }`}>
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {index === 0 ? 'UX Designer Intern' : index === 1 ? 'Frontend Developer' : 'Marketing Assistant'}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {index === 0 ? 'DesignHub Inc.' : index === 1 ? 'TechNova' : 'MarketBoost'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-3">
                  <span>{index === 0 ? 'Remote' : index === 1 ? 'Hybrid' : 'On-site'}</span>
                  <span>{index === 0 ? '$15-20/hr' : index === 1 ? '$25-30/hr' : '$18/hr'}</span>
                </div>
                <Button size="sm" className="w-full text-xs" onClick={() => navigate('/projects')}>
                  Quick Apply
                </Button>
              </AnimatedContainer>
            ))}
          </div>
        </section>
        
        <AnimatedContainer animation="fade-in" delay={200}>
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
        </AnimatedContainer>
        
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Featured Mentors</h2>
            <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1 text-xs" onClick={() => navigate('/mentors')}>
              View All
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-2 -mx-4 px-4">
            {[1, 2, 3].map((_, index) => (
              <AnimatedContainer 
                key={index} 
                animation="fade-in" 
                delay={250 + index * 100}
                className="min-w-[220px] rounded-xl bg-white shadow-sm border p-4 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-3 overflow-hidden">
                  <img 
                    src={`https://source.unsplash.com/collection/8${index}675432/100x100`} 
                    alt="Mentor" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-1">
                  {index === 0 ? 'Alex Morgan' : index === 1 ? 'Priya Sharma' : 'David Chen'}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">
                  {index === 0 ? 'UX Designer @ Google' : index === 1 ? 'Product Manager @ Microsoft' : 'Senior Developer @ Meta'}
                </p>
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Book Session
                </Button>
              </AnimatedContainer>
            ))}
          </div>
        </section>
        
        <AnimatedContainer animation="fade-in" delay={300}>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Progress Tracker</h3>
                <Award className="h-5 w-5 text-indigo" />
              </div>
              <div className="flex items-center gap-3 mb-2">
                <BarChart className="h-10 w-10 text-indigo-light p-2 bg-indigo-light/20 rounded-lg" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weekly Goals</span>
                    <span className="text-xs font-medium">2/5</span>
                  </div>
                  <Progress value={40} className="h-1.5 mt-1" />
                </div>
              </div>
              <Button size="sm" className="w-full text-xs mt-2" variant="outline">
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </AnimatedContainer>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
