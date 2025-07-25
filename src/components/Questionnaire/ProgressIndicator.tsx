import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  stepLabels,
}) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm text-muted-foreground">
          {Math.round(progress)}% Complete
        </span>
      </div>
      <Progress value={progress} className="h-2" />
      {stepLabels && stepLabels[currentStep] && (
        <p className="text-sm text-muted-foreground mt-2">
          {stepLabels[currentStep]}
        </p>
      )}
    </div>
  );
};