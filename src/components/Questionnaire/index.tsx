import React, { useState, useMemo } from 'react';
import { QuestionnaireStep } from './QuestionnaireStep';
import { ProgressIndicator } from './ProgressIndicator';
import { questions } from './questions';
import { comprehensiveQuestions } from './comprehensiveQuestions';
import type { UserPreferences } from '@/types';
import { analytics } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';

interface QuestionnaireProps {
  onComplete: (preferences: UserPreferences) => void;
  mode?: 'basic' | 'comprehensive';
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ onComplete, mode = 'basic' }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const { user, updateUser } = useAuth();
  
  // Get active questions based on mode and conditional logic
  const activeQuestions = useMemo(() => {
    const baseQuestions = mode === 'comprehensive' ? comprehensiveQuestions : questions;
    
    if (mode === 'basic') {
      return baseQuestions;
    }
    
    // For comprehensive mode, filter questions based on conditional logic
    return baseQuestions.filter((question: any) => {
      if (!question.conditional) return true;
      
      const { field, includes } = question.conditional;
      const fieldValue = answers[field];
      
      if (!fieldValue) return false;
      
      if (Array.isArray(fieldValue)) {
        return includes.some((inc: string) => fieldValue.includes(inc));
      }
      
      return includes.includes(fieldValue);
    });
  }, [mode, answers, currentStep]);

  const handleAnswer = (value: string | string[]) => {
    const questionId = activeQuestions[currentStep].id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    // Track answer in analytics
    analytics.track('question_answered', 'engagement', `${questionId}_${mode}`);
  };

  const handleNext = () => {
    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
      analytics.track('questionnaire_step', 'engagement', `step_${currentStep + 1}`);
    } else {
      // Complete questionnaire
      const preferences: UserPreferences = {
        primaryUseCase: answers.useCase as string[],
        experienceLevel: answers.experience as any,
        budgetRange: answers.budget as any,
        priorityFactors: answers.priorities as string[],
        integrationMethod: answers.integration as any[],
        usageVolume: answers.volume as any,
        specialRequirements: answers.requirements as string[] || [],
        // Add comprehensive mode specific fields
        ...(mode === 'comprehensive' && {
          industry: answers.industry as string,
          contentTypes: answers.contentTypes as string[],
          programmingLanguages: answers.programmingLanguages as string[],
          teamSize: answers.teamSize as string,
          currentTools: answers.currentTools as string[],
          workflowIntegration: answers.workflowIntegration as string[],
          outputFormats: answers.outputFormats as string[],
          languages: answers.languages as string[],
          dataSensitivity: answers.dataSensitivity as string,
          performanceNeeds: answers.performanceNeeds as string,
          customization: answers.customization as string,
          supportLevel: answers.supportLevel as string
        })
      };
      analytics.track('questionnaire_completed', 'conversion', mode);
      
      // Save to user's search history if logged in
      if (user && updateUser) {
        const searchEntry = {
          timestamp: new Date().toISOString(),
          mode,
          preferences,
          recommendationCount: 0 // Will be updated when results load
        };
        
        const searchHistory = user.preferences?.searchHistory || [];
        updateUser({
          preferences: {
            ...user.preferences,
            searchHistory: [...searchHistory, searchEntry],
            savedRecommendations: user.preferences?.savedRecommendations || [],
            emailNotifications: user.preferences?.emailNotifications ?? true
          }
        });
      }
      
      onComplete(preferences);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const currentQuestion = activeQuestions[currentStep];
  const currentAnswer = currentQuestion ? (answers[currentQuestion.id] || (currentQuestion.type === 'multiple' ? [] : '')) : '';

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          {mode === 'comprehensive' ? 'Comprehensive AI Analysis' : 'Find Your Perfect AI Tool'}
        </h1>
        
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={activeQuestions.length}
          stepLabels={activeQuestions.map((q: any) => q.title)}
        />

        <QuestionnaireStep
          {...currentQuestion}
          value={currentAnswer}
          onChange={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirst={currentStep === 0}
          isLast={currentStep === activeQuestions.length - 1}
        />
      </div>
    </div>
  );
};