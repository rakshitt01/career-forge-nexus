
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

const Auth = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('signup');
  const [interests, setInterests] = useState<string[]>([]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigate('/dashboard');
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-login">Email</Label>
                  <Input id="email-login" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-login">Password</Label>
                  <Input id="password-login" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full gradient-secondary text-white">Login</Button>
                
                <div className="flex items-center gap-2 my-6">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" onClick={() => handleSocialLogin('github')}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleSocialLogin('linkedin')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="college">College Name</Label>
                  <Input id="college" placeholder="Search colleges..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="graduation">Graduation Year</Label>
                  <Input id="graduation" type="number" placeholder="2025" min="2020" max="2030" />
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
                
                <Button type="submit" className="w-full gradient-primary text-white">
                  Sign Up & Start Exploring
                </Button>
                
                <div className="flex items-center gap-2 my-6">
                  <Separator className="flex-1" />
                  <span className="text-xs text-muted-foreground">OR CONTINUE WITH</span>
                  <Separator className="flex-1" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button type="button" variant="outline" onClick={() => handleSocialLogin('github')}>
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button type="button" variant="outline" onClick={() => handleSocialLogin('linkedin')}>
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
