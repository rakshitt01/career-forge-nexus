
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ProfileCompletionCardProps {
  completionPercentage: number;
}

const ProfileCompletionCard: React.FC<ProfileCompletionCardProps> = ({ 
  completionPercentage 
}) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Profile Completion</h3>
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => navigate('/profile')}>
            Complete Now
          </Button>
        </div>
        <Progress value={completionPercentage} className="h-2 mb-2" />
        <p className="text-xs text-muted-foreground">
          Complete your profile to unlock more opportunities
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileCompletionCard;
