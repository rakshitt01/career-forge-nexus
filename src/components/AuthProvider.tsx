
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('AuthProvider initialized');
    
    // Get the initial session first to prevent flickering
    const initializeAuth = async () => {
      try {
        console.log('Checking for existing session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          toast({
            title: 'Authentication Error',
            description: 'There was a problem with your session',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        
        console.log('Session found:', data.session?.user?.email || 'No session');
        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
        setLoading(false);
      } catch (error) {
        console.error('Auth initialization error:', error);
        setLoading(false);
      }
    };

    // Call the initialization function
    initializeAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event, currentSession?.user?.email);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          console.log('Setting user session after sign in', currentSession?.user?.email);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Handle redirects after successful login
          if (window.location.pathname === '/auth' || window.location.pathname === '/') {
            console.log('On auth page, redirecting to dashboard');
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing session');
          setSession(null);
          setUser(null);
          navigate('/auth');
        }
      }
    );

    return () => {
      console.log('Cleanup auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      console.log('Signing out');
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      navigate('/auth');
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: 'Sign Out Error',
        description: 'There was a problem signing out',
        variant: 'destructive',
      });
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut
  };

  console.log('Auth state:', { loading, isAuthenticated: !!user, user: user?.email });
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
