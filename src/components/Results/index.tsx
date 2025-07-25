import React, { useState } from 'react';
import { ModelCard } from '@/components/ModelCard';
import { FilterSidebar } from './FilterSidebar';
import type { Recommendation, UserPreferences } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Share2 } from 'lucide-react';

interface ResultsProps {
  recommendations: Recommendation[];
  preferences: UserPreferences;
  onBack: () => void;
}

export const Results: React.FC<ResultsProps> = ({ recommendations, preferences, onBack }) => {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [filteredRecommendations, setFilteredRecommendations] = useState(recommendations);

  const toggleExpand = (modelId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(modelId)) {
        newSet.delete(modelId);
      } else {
        newSet.add(modelId);
      }
      return newSet;
    });
  };

  const handleExport = () => {
    const data = filteredRecommendations.map(rec => ({
      name: rec.model.name,
      vendor: rec.model.vendor,
      match: `${rec.matchPercentage}%`,
      estimatedCost: `$${rec.estimatedMonthlyCost.min}-${rec.estimatedMonthlyCost.max}/month`,
      website: rec.model.website
    }));

    const csv = [
      ['Name', 'Vendor', 'Match %', 'Estimated Cost', 'Website'],
      ...data.map(row => [row.name, row.vendor, row.match, row.estimatedCost, row.website])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-recommendations.csv';
    a.click();
  };

  const handleShare = async () => {
    const text = `My AI Tool Recommendations:\n\n${filteredRecommendations
      .slice(0, 3)
      .map((rec, i) => `${i + 1}. ${rec.model.name} (${rec.matchPercentage}% match)`)
      .join('\n')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI Tool Recommendations',
          text: text,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Recommendations copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {preferences.primaryUseCase.includes('comprehensive') ? 'Comprehensive AI Tool Directory' : 'Your AI Tool Recommendations'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {preferences.primaryUseCase.includes('comprehensive') 
                ? `Explore ${recommendations.length} AI tools across all categories`
                : `Based on your preferences, we found ${recommendations.length} great matches`}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar
              recommendations={recommendations}
              onFilterChange={setFilteredRecommendations}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {filteredRecommendations.map((recommendation) => (
                <ModelCard
                  key={recommendation.model.id}
                  recommendation={recommendation}
                  expanded={expandedCards.has(recommendation.model.id)}
                  onToggleExpand={() => toggleExpand(recommendation.model.id)}
                />
              ))}
            </div>

            {filteredRecommendations.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No recommendations match your current filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <h2 className="text-2xl font-bold mb-4">Need Expert Guidance?</h2>
            <p className="mb-6">
              Our AI consultants at LeniLani Consulting can help you implement and optimize these tools for your specific needs.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <a href="https://lenilani.com/contact" target="_blank" rel="noopener noreferrer">
                Schedule a Consultation
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

import { Card } from '@/components/ui/card';