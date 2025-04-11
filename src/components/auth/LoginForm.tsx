
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

interface LoginFormProps {
  setActiveTab: (tab: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { refreshSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting to login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Login successful, session:', data.session);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in."
        });
        
        // Force refresh the session
        await refreshSession();
        
        // Manually navigate to dashboard
        setTimeout(() => navigate('/dashboard'), 500);
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
  );
};

export default LoginForm;
