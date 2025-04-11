
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/components/AuthProvider';

interface SignupFormProps {
  setActiveTab: (tab: string) => void;
  setAccountCreated: (created: boolean) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ setActiveTab, setAccountCreated }) => {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [college, setCollege] = useState('');
  const [gradYear, setGradYear] = useState<string>('');

  const interestOptions = [
    { id: 'freelancer', label: 'Freelancer' },
    { id: 'job-seeker', label: 'Job Seeker' },
    { id: 'entrepreneur', label: 'Entrepreneur' },
  ];

  const toggleInterest = (id: string) => {
    if (interests.includes(id)) {
      setInterests(interests.filter(item => item !== id));
    } else {
      setInterests([...interests, id]);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting to signup with:', email);
      // Create the user account
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            college_name: college,
            graduation_year: gradYear ? parseInt(gradYear, 10) : null,
            interests: interests
          }
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Signup successful, session:', !!data.session);
        setAccountCreated(true);
        toast({
          title: "Account created!",
          description: "Your account has been successfully created."
        });
        
        if (data.session) {
          console.log("Session created, redirecting to dashboard");
          // Force refresh the session
          await refreshSession();
          // Then manually navigate to dashboard
          setTimeout(() => navigate('/dashboard'), 500);
        } else {
          console.log("No session created, need email confirmation");
          toast({
            title: "Email Confirmation Required",
            description: "Please check your email to confirm your account before logging in."
          });
          setActiveTab('login');
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'github' | 'linkedin') => {
    try {
      if (provider === 'github') {
        await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${window.location.origin}/dashboard`
          }
        });
      } else if (provider === 'linkedin') {
        toast({
          title: "Coming Soon",
          description: "LinkedIn login will be available soon!"
        });
      }
    } catch (error) {
      console.error(`${provider} login error:`, error);
      toast({
        title: "Login Failed",
        description: `Could not login with ${provider}`,
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullname">Full Name</Label>
        <Input 
          id="fullname" 
          placeholder="John Doe" 
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="college">College Name</Label>
        <Input 
          id="college" 
          placeholder="Search colleges..." 
          value={college}
          onChange={(e) => setCollege(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="graduation">Graduation Year</Label>
        <Input 
          id="graduation" 
          type="number" 
          placeholder="2025" 
          min="2020" 
          max="2030" 
          value={gradYear}
          onChange={(e) => setGradYear(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Interests (Select all that apply)</Label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => (
            <Button 
              key={option.id}
              type="button"
              variant={interests.includes(option.id) ? "default" : "outline"} 
              onClick={() => toggleInterest(option.id)}
              className={interests.includes(option.id) ? "bg-indigo hover:bg-indigo-dark" : ""}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full gradient-primary text-white"
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Sign Up & Start Exploring"}
      </Button>
      
      <div className="flex items-center gap-2 my-6">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
        <Separator className="flex-1" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('github')}
          disabled={loading}
        >
          <Github className="h-4 w-4 mr-2" />
          GitHub
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => handleSocialLogin('linkedin')}
          disabled={loading}
        >
          <Linkedin className="h-4 w-4 mr-2" />
          LinkedIn
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
