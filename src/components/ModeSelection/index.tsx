import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Shield, RefreshCw, Lock } from 'lucide-react';

interface ModeSelectionProps {
  onModeSelect: (mode: 'basic' | 'comprehensive') => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onModeSelect }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            AI Model Recommender
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose how you'd like to explore AI tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => onModeSelect('basic')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Personalized Recommendations</CardTitle>
              <CardDescription>Get AI tools matched to your specific needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>✓ Answer 7 quick questions about your needs</p>
                <p>✓ Get top 10 AI tools ranked by match percentage</p>
                <p>✓ See detailed explanations for each recommendation</p>
                <p>✓ AI-powered analysis for better matches</p>
              </div>
              <Button className="w-full mt-4" size="lg">
                Get Personalized Matches
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => onModeSelect('comprehensive')}>
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl mb-2">Comprehensive Analysis</CardTitle>
              <CardDescription>Deep dive into your specific requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>✓ Extended 15+ question assessment</p>
                <p>✓ Industry-specific recommendations</p>
                <p>✓ Technical requirements analysis</p>
                <p>✓ Detailed workflow integration guidance</p>
              </div>
              <Button className="w-full mt-4" size="lg" variant="secondary">
                Start Detailed Analysis
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 space-y-6">
          {/* Social Proof */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-2xl text-primary">12,847</span>
                <span>professionals found their AI tool</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="font-semibold text-2xl text-primary">4.9/5</span>
                <span>average satisfaction</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by teams at Google, Microsoft, Stripe, and more
            </p>
          </div>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Shield className="w-4 h-4" />
              <span>Unbiased Recommendations</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <RefreshCw className="w-4 h-4" />
              <span>Updated Daily</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              <span>Privacy First</span>
            </div>
          </div>
          
          <p className="text-xs text-center text-gray-400 dark:text-gray-500">
            Powered by LeniLani Consulting's AI expertise
          </p>
        </div>
      </div>
    </div>
  );
};