
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import AnimatedContainer from '@/components/AnimatedContainer';

const Splash = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        navigate('/onboarding');
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo to-pink p-4">
      <AnimatedContainer animation="fade-in" className="flex flex-col items-center">
        <Logo size="lg" withText={true} />
        <p className="text-white mt-4 text-lg">Your Career, Supercharged</p>
      </AnimatedContainer>
    </div>
  );
};

export default Splash;
