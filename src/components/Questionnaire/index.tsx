import React, { useState } from 'react';
import { QuestionnaireStep } from './QuestionnaireStep';
import { ProgressIndicator } from './ProgressIndicator';
import { questions } from './questions';
import type { UserPreferences } from '@/types';

interface QuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const handleAnswer = (value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentStep].id]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete questionnaire
      const preferences: UserPreferences = {
        primaryUseCase: answers.useCase as string[],
        experienceLevel: answers.experience as any,
        budgetRange: answers.budget as any,
        priorityFactors: answers.priorities as string[],
        integrationMethod: answers.integration as any[],
        usageVolume: answers.volume as any,
        specialRequirements: answers.requirements as string[] || []
      };
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id] || (currentQuestion.type === 'multiple' ? [] : '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Find Your Perfect AI Tool
        </h1>
        
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={questions.length}
          stepLabels={questions.map(q => q.title)}
        />

        <QuestionnaireStep
          {...currentQuestion}
          value={currentAnswer}
          onChange={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentStep === 0}
          isLast={currentStep === questions.length - 1}
        />
      </div>
    </div>
  );
};