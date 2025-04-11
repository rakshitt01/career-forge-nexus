
import React from 'react';
import Logo from '@/components/Logo';
import AnimatedContainer from '@/components/AnimatedContainer';
import { Button } from '@/components/ui/button';

interface AccountCreatedMessageProps {
  setActiveTab: (tab: string) => void;
}

const AccountCreatedMessage: React.FC<AccountCreatedMessageProps> = ({ 
  setActiveTab 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-muted/50">
      <AnimatedContainer animation="fade-in" className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" withText={true} />
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Account Created!</h2>
          <p className="mb-6 text-muted-foreground">
            Please check your email to confirm your account before logging in.
          </p>
          <Button 
            onClick={() => setActiveTab('login')} 
            className="w-full gradient-secondary text-white"
          >
            Go to Login
          </Button>
        </div>
      </AnimatedContainer>
    </div>
  );
};

export default AccountCreatedMessage;
