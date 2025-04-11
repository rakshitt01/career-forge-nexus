
import React from 'react';
import Logo from '@/components/Logo';

const AuthInfoSidebar: React.FC = () => {
  return (
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
  );
};

export default AuthInfoSidebar;
