import { useState } from 'react';
import { ModeSelection } from '@/components/ModeSelection';
import { Questionnaire } from '@/components/Questionnaire';
import { Results } from '@/components/Results';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import type { UserPreferences, Recommendation } from '@/types';
import { generateRecommendations } from '@/utils/recommendation-engine';

function App() {
  const [currentView, setCurrentView] = useState<'mode-selection' | 'questionnaire' | 'results' | 'loading'>('mode-selection');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);

  const handleQuestionnaireComplete = async (preferences: UserPreferences) => {
    setCurrentView('loading');
    setUserPreferences(preferences);
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.error('Recommendation generation timed out');
      setRecommendations([]);
      setCurrentView('results');
    }, 10000); // 10 second timeout
    
    try {
      const recs = await generateRecommendations(preferences);
      clearTimeout(timeoutId);
      console.log('Generated recommendations:', recs.length);
      setRecommendations(recs);
      setCurrentView('results');
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Failed to generate recommendations:', error);
      // Show empty results rather than stuck loading
      setRecommendations([]);
      setCurrentView('results');
    }
  };

  const handleModeSelect = async (selectedMode: 'basic' | 'comprehensive') => {
    
    if (selectedMode === 'comprehensive') {
      // Skip questionnaire for comprehensive mode
      setCurrentView('loading');
      const comprehensivePreferences: UserPreferences = {
        primaryUseCase: ['comprehensive'],
        experienceLevel: 'intermediate',
        budgetRange: '100+',
        priorityFactors: [],
        integrationMethod: [],
        usageVolume: 'moderate',
        specialRequirements: []
      };
      setUserPreferences(comprehensivePreferences);
      
      // Generate comprehensive results
      setTimeout(async () => {
        try {
          const recs = await generateRecommendations(comprehensivePreferences);
          setRecommendations(recs);
          setCurrentView('results');
        } catch (error) {
          console.error('Failed to generate comprehensive results:', error);
          setRecommendations([]);
          setCurrentView('results');
        }
      }, 100);
    } else {
      // Go to questionnaire for basic mode
      setCurrentView('questionnaire');
    }
  };

  const handleStartOver = () => {
    setCurrentView('mode-selection');
    setRecommendations([]);
    setUserPreferences(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        {currentView === 'mode-selection' && (
          <ModeSelection onModeSelect={handleModeSelect} />
        )}
        {currentView === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}
        {currentView === 'loading' && (
          <LoadingScreen />
        )}
        {currentView === 'results' && userPreferences && (
          <Results recommendations={recommendations} preferences={userPreferences} onBack={handleStartOver} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;