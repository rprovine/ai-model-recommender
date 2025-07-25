import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, History, Calendar, Search } from 'lucide-react';

export const SearchHistory: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  const searchHistory = user.preferences?.searchHistory || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
              Search History
            </h1>
            <p className="text-muted-foreground">
              Your recent AI tool searches and recommendations
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {searchHistory.length === 0 ? (
          <div className="text-center py-16">
            <History className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No search history yet</h2>
            <p className="text-muted-foreground mb-6">
              Start exploring AI tools to build your search history
            </p>
            <Link to="/">
              <Button>
                Start Exploring
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {searchHistory.map((search: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        {search.mode === 'comprehensive' ? 'Comprehensive Analysis' : 'Quick Search'}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(search.timestamp).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={search.mode === 'comprehensive' ? 'default' : 'secondary'}>
                      {search.mode}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Use Cases:</p>
                      <div className="flex flex-wrap gap-2">
                        {search.preferences?.primaryUseCase?.map((useCase: string) => (
                          <Badge key={useCase} variant="outline">
                            {useCase}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {search.preferences?.budgetRange && (
                      <div>
                        <p className="text-sm font-medium mb-1">Budget:</p>
                        <p className="text-sm text-muted-foreground">
                          ${search.preferences.budgetRange}
                        </p>
                      </div>
                    )}

                    {search.recommendationCount && (
                      <div>
                        <p className="text-sm font-medium mb-1">Tools Recommended:</p>
                        <p className="text-sm text-muted-foreground">
                          {search.recommendationCount} AI tools matched your criteria
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Link to={`/?mode=${search.mode}&history=${index}`}>
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};