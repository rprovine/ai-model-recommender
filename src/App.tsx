import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ModeSelection } from '@/components/ModeSelection';
import { Questionnaire } from '@/components/Questionnaire';
import { Results } from '@/components/Results';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ToolPage } from '@/pages/tools/[toolId]';
import { ToolsDirectory } from '@/pages/tools';
import { UserMenu } from '@/components/UserMenu';
import { SavedTools } from '@/pages/SavedTools';
import { Profile } from '@/pages/Profile';
import { SearchHistory } from '@/pages/SearchHistory';
import { Settings } from '@/pages/Settings';
import type { UserPreferences, Recommendation } from '@/types';
import { generateRecommendations } from '@/utils/recommendation-engine';
import { aiModels } from '@/data/models';
import { analytics } from '@/utils/analytics';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { AuthProvider } from '@/contexts/AuthContext';

function HomePage() {
  const [currentView, setCurrentView] = useState<'mode-selection' | 'questionnaire' | 'results' | 'loading'>('mode-selection');
  const [mode, setMode] = useState<'basic' | 'comprehensive'>('basic');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const location = useLocation();
  
  // Check for shared recommendations on load
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const toolIds = urlParams.get('tools');
    
    if (toolIds) {
      const ids = toolIds.split(',');
      const sharedModels = aiModels.filter(model => ids.includes(model.id));
      
      if (sharedModels.length > 0) {
        // Create recommendations from shared models
        const sharedRecs: Recommendation[] = sharedModels.map(model => ({
          model,
          score: 85, // Default score for shared
          reasons: ['Shared recommendation - this tool was recommended by a colleague'],
          estimatedMonthlyCost: { min: 0, max: 100 },
          matchPercentage: 85
        }));
        
        setRecommendations(sharedRecs);
        setUserPreferences({
          primaryUseCase: ['shared'],
          experienceLevel: 'intermediate',
          budgetRange: '21-100',
          priorityFactors: [],
          integrationMethod: [],
          usageVolume: 'moderate',
          specialRequirements: []
        });
        setCurrentView('results');
      }
    }
  }, [location.search]);

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
    setMode(selectedMode);
    setCurrentView('questionnaire');
    analytics.track('mode_selected', 'engagement', selectedMode);
  };

  const handleStartOver = () => {
    setCurrentView('mode-selection');
    setRecommendations([]);
    setUserPreferences(null);
  };

  return (
    <>
      {currentView === 'mode-selection' && (
        <ModeSelection onModeSelect={handleModeSelect} />
      )}
      {currentView === 'questionnaire' && (
        <Questionnaire onComplete={handleQuestionnaireComplete} mode={mode} />
      )}
      {currentView === 'loading' && (
        <LoadingScreen />
      )}
      {currentView === 'results' && userPreferences && (
        <Results recommendations={recommendations} preferences={userPreferences} onBack={handleStartOver} />
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <header className="absolute top-0 right-0 p-4 z-50 flex items-center gap-4">
          <UserMenu />
          <DarkModeToggle />
        </header>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsDirectory />} />
            <Route path="/tools/:toolId" element={<ToolPage />} />
            <Route path="/saved" element={<SavedTools />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<SearchHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;