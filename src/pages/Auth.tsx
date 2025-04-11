
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import AnimatedContainer from '@/components/AnimatedContainer';
import { useAuth } from '@/components/AuthProvider';
import AuthTabs from '@/components/auth/AuthTabs';
import AccountCreatedMessage from '@/components/auth/AccountCreatedMessage';
import AuthInfoSidebar from '@/components/auth/AuthInfoSidebar';

const Auth = () => {
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('signup');
  const [accountCreated, setAccountCreated] = useState(false);

  // Effect to redirect authenticated users
  useEffect(() => {
    if (user) {
      console.log('User is already logged in, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // If account was created but user needs to confirm email
  if (accountCreated && !user) {
    return <AccountCreatedMessage setActiveTab={setActiveTab} />;
  }

  // Regular auth form
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <AuthInfoSidebar />
      
      <div className="flex items-center justify-center p-6">
        <AnimatedContainer animation="fade-in" className="w-full max-w-md">
          <div className="md:hidden mb-6 flex justify-center">
            <Logo size="md" withText={true} />
          </div>
          
          <AuthTabs 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            setAccountCreated={setAccountCreated}
          />
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Auth;
