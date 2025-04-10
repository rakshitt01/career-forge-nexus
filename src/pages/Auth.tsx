
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import Logo from '@/components/Logo';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('signup');
  const [interests, setInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Form state
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in."
        });
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
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
        toast({
          title: "Signup Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Account created!",
          description: "Your account has been successfully created."
        });
        
        // Update profile data in profiles table
        if (data.user) {
          // The trigger we set up will create the profile automatically,
          // but we could update it here if needed with additional data
          navigate('/dashboard');
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
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:block bg-gradient-to-br from-indigo to-pink">
        <div className="h-full flex flex-col justify-center items-center text-white p-8">
          <Logo size="lg" withText={true} />
          <h2 className="text-3xl font-bold mt-8 mb-4">Start Your Journey</h2>
          <p className="text-center max-w-md text-white/90">
            Join thousands of students building their careers, 
            getting real-world experience, and connecting with mentors.
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-center p-6">
        <AnimatedContainer animation="fade-in" className="w-full max-w-md">
          <div className="md:hidden mb-6 flex justify-center">
            <Logo size="md" withText={true} />
          </div>
          
          <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input 
                    id="email-login" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input 
                    id="password-login" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-secondary text-white"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
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
            </TabsContent>
            
            <TabsContent value="signup">
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
            </TabsContent>
          </Tabs>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Auth;
