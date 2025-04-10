
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, GraduationCap, Stars, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OnboardingSlide from '@/components/OnboardingSlide';
import AnimatedContainer from '@/components/AnimatedContainer';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Get real experience with real projects",
      description: "Build your portfolio with real freelance projects and internships from startups and companies.",
      icon: <Briefcase className="text-white p-4 rounded-xl bg-indigo" />,
    },
    {
      title: "Build your dream resume and portfolio",
      description: "Create a professional resume and showcase your work with our easy-to-use builder.",
      icon: <GraduationCap className="text-white p-4 rounded-xl bg-pink" />,
    },
    {
      title: "Learn from startup founders and mentors",
      description: "Connect with experienced professionals and get personalized guidance for your career.",
      icon: <Stars className="text-white p-4 rounded-xl bg-blue" />,
    },
    {
      title: "Launch your ideas with support and funding",
      description: "Turn your ideas into reality with our startup builder and connect with potential co-founders.",
      icon: <Zap className="text-white p-4 rounded-xl bg-orange" />,
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };
  
  const handleSkip = () => {
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center relative overflow-hidden">
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={index}
            title={slide.title}
            description={slide.description}
            icon={slide.icon}
            active={currentSlide === index}
            index={index}
          />
        ))}
      </div>
      
      <div className="px-6 pb-12">
        <div className="flex justify-center gap-1.5 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 gradient-primary' 
                  : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <AnimatedContainer animation="slide-up">
          <div className="flex gap-4">
            {currentSlide < slides.length - 1 ? (
              <>
                <Button 
                  variant="outline" 
                  className="flex-1" 
                  onClick={handleSkip}
                >
                  Skip
                </Button>
                <Button 
                  className="flex-1 gradient-primary text-white" 
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            ) : (
              <Button 
                className="w-full gradient-primary text-white" 
                onClick={handleNext}
              >
                Get Started →
              </Button>
            )}
          </div>
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default Onboarding;
