
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setAccountCreated: (created: boolean) => void;
}

const AuthTabs: React.FC<AuthTabsProps> = ({ 
  activeTab, 
  setActiveTab,
  setAccountCreated 
}) => {
  return (
    <Tabs defaultValue="signup" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 mb-6">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Signup</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <LoginForm setActiveTab={setActiveTab} />
      </TabsContent>
      
      <TabsContent value="signup">
        <SignupForm 
          setActiveTab={setActiveTab}
          setAccountCreated={setAccountCreated}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;
