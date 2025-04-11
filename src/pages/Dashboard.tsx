
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Database } from '@/integrations/supabase/types';
import AnimatedContainer from '@/components/AnimatedContainer';
import BottomNavigation from '@/components/BottomNavigation';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ProfileCompletionCard from '@/components/dashboard/ProfileCompletionCard';
import JobsSection from '@/components/dashboard/JobsSection';
import TipCard from '@/components/dashboard/TipCard';
import MentorsSection from '@/components/dashboard/MentorsSection';
import ProgressTrackerCard from '@/components/dashboard/ProgressTrackerCard';

type Profile = Database['public']['Tables']['profiles']['Row'];

const Dashboard = () => {
  const { user } = useAuth();
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
  
  const userName = profile?.full_name?.split(' ')[0];
  
  return (
    <div className="min-h-screen pb-16">
      <DashboardHeader userName={userName} />
      
      <main className="p-4 space-y-6">
        <AnimatedContainer animation="fade-in" delay={100}>
          <ProfileCompletionCard completionPercentage={profileCompletion} />
        </AnimatedContainer>
        
        <JobsSection />
        
        <AnimatedContainer animation="fade-in" delay={200}>
          <TipCard />
        </AnimatedContainer>
        
        <MentorsSection />
        
        <AnimatedContainer animation="fade-in" delay={300}>
          <ProgressTrackerCard />
        </AnimatedContainer>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
