
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, refreshSession } = useAuth();
  const location = useLocation();

  // Force refresh session when accessing protected routes
  useEffect(() => {
    if (!user && !loading) {
      console.log('No user found in protected route, refreshing session...');
      refreshSession();
    }
  }, [user, loading, refreshSession]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <Loader2 className="h-10 w-10 text-indigo animate-spin mb-4" />
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!user) {
    console.log('User not authenticated, redirecting to auth from:', location.pathname);
    return <Navigate to="/auth" replace />;
  }

  console.log('User authenticated, showing protected content');
  return <>{children}</>;
};

export default ProtectedRoute;
