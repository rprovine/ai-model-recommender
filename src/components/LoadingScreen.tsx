import React from 'react';
import { Loader2, Brain, Cpu, Zap } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const loadingMessages = [
    { icon: Brain, text: "Analyzing your preferences..." },
    { icon: Cpu, text: "Processing AI model capabilities..." },
    { icon: Zap, text: "Generating personalized recommendations..." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse">
            <div className="h-32 w-32 mx-auto bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-20 blur-xl"></div>
          </div>
          <Loader2 className="h-24 w-24 mx-auto text-primary animate-spin relative z-10" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Finding Your Perfect AI Tools
          </h2>
          
          <div className="space-y-3">
            {loadingMessages.map((message, index) => {
              const Icon = message.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-center gap-3 text-gray-600 dark:text-gray-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm">{message.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {import.meta.env.VITE_ANTHROPIC_API_KEY ? 
              "Using AI-powered analysis for best results" : 
              "Using expert-curated recommendations"
            }
          </p>
        </div>
      </div>
    </div>
  );
};