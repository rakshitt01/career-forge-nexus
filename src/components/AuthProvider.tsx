
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  refreshSession: async () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to manually refresh the session
  const refreshSession = async () => {
    console.log('Manually refreshing session...');
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Session refresh error:', error);
        return;
      }
      
      console.log('Session refreshed:', data.session?.user?.email || 'No session');
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    } catch (error) {
      console.error('Session refresh failed:', error);
    }
  };

  useEffect(() => {
    console.log('AuthProvider initialized');
    console.log('Current path:', location.pathname);
    
    // Get the initial session first to prevent flickering
    const initializeAuth = async () => {
      try {
        console.log('Checking for existing session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          toast({
            title: "Authentication Error",
            description: "There was a problem with your session",
            variant: "destructive",
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
          console.log('Setting user session after sign in/update', currentSession?.user?.email);
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          
          // Handle redirects after successful login or token refresh
          if (location.pathname === '/auth') {
            console.log('On auth page with valid session, redirecting to dashboard');
            navigate('/dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out, clearing session');
          setSession(null);
          setUser(null);
          if (location.pathname !== '/auth' && location.pathname !== '/') {
            navigate('/auth');
          }
        }
      }
    );

    return () => {
      console.log('Cleanup auth subscription');
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

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
        title: "Sign Out Error",
        description: "There was a problem signing out",
        variant: "destructive",
      });
    }
  };

  const value = {
    session,
    user,
    loading,
    signOut,
    refreshSession
  };

  console.log('Auth state:', { loading, isAuthenticated: !!user, user: user?.email, path: location.pathname });
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
