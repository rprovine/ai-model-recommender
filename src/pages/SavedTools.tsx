import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { aiModels } from '@/data/models';
import { ModelCard } from '@/components/ModelCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark } from 'lucide-react';

export const SavedTools: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const savedModels = aiModels.filter(model => 
    user.preferences?.savedRecommendations?.includes(model.id)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Saved AI Tools
            </h1>
            <p className="text-muted-foreground">
              Your bookmarked AI tools for quick access
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {savedModels.length === 0 ? (
          <div className="text-center py-16">
            <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No saved tools yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring AI tools and save your favorites for quick access
            </p>
            <Link to="/">
              <Button>
                Discover AI Tools
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {savedModels.map(model => (
              <ModelCard
                key={model.id}
                recommendation={{
                  model,
                  score: 100,
                  reasons: ['Saved for quick access'],
                  estimatedMonthlyCost: { min: 0, max: 100 },
                  matchPercentage: 100
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};