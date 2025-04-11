
import React from 'react';
import { Award, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const ProgressTrackerCard: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium">Progress Tracker</h3>
          <Award className="h-5 w-5 text-indigo" />
        </div>
        <div className="flex items-center gap-3 mb-2">
          <BarChart className="h-10 w-10 text-indigo-light p-2 bg-indigo-light/20 rounded-lg" />
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Weekly Goals</span>
              <span className="text-xs font-medium">2/5</span>
            </div>
            <Progress value={40} className="h-1.5 mt-1" />
          </div>
        </div>
        <Button size="sm" className="w-full text-xs mt-2" variant="outline">
          View All Activities
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProgressTrackerCard;
