
import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface DashboardHeaderProps {
  userName: string | undefined;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 bg-white z-10 px-4 py-4 border-b">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">Hi, {userName || 'there'}! 👋</h1>
          <p className="text-sm text-muted-foreground">Let's build your career today</p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/notifications')}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-gray-100" 
            onClick={() => navigate('/profile')}
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
