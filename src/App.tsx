import React, { useState } from 'react';
import { Questionnaire } from '@/components/Questionnaire';
import { Results } from '@/components/Results';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import type { UserPreferences, Recommendation } from '@/types';
import { generateRecommendations } from '@/utils/recommendation-engine';

function App() {
  const [currentView, setCurrentView] = useState<'questionnaire' | 'results' | 'loading'>('questionnaire');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleQuestionnaireComplete = async (preferences: UserPreferences) => {
    setCurrentView('loading');
    try {
      const recs = await generateRecommendations(preferences);
      setRecommendations(recs);
      setCurrentView('results');
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
      // Still show results even if API fails (will use static scoring)
      setCurrentView('results');
    }
  };

  const handleStartOver = () => {
    setCurrentView('questionnaire');
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {currentView === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}
        {currentView === 'loading' && (
          <LoadingScreen />
        )}
        {currentView === 'results' && (
          <Results recommendations={recommendations} onBack={handleStartOver} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;