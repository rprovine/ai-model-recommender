export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced' | 'developer';
export type BudgetRange = 'free' | '1-20' | '21-100' | '100+';
export type UsageVolume = 'light' | 'moderate' | 'heavy';
export type IntegrationMethod = 'web' | 'api' | 'mobile' | 'desktop';

export interface UserPreferences {
  primaryUseCase: string[];
  experienceLevel: ExperienceLevel;
  budgetRange: BudgetRange;
  priorityFactors: string[];
  integrationMethod: IntegrationMethod[];
  usageVolume: UsageVolume;
  specialRequirements: string[];
}

export interface PricingTier {
  name: string;
  price: number | 'custom';
  unit?: string;
  features: string[];
  tokens?: number;
  requests?: number;
}

export interface AIModel {
  id: string;
  vendor: string;
  name: string;
  category: 'text' | 'image' | 'code' | 'business' | 'multimodal';
  description: string;
  strengths: string[];
  useCases: string[];
  pricing: {
    free?: PricingTier;
    subscription?: PricingTier[];
    api?: {
      inputCost?: number;
      outputCost?: number;
      unit: string;
    };
  };
  technicalRequirements: string[];
  userInterfaceComplexity: 'simple' | 'moderate' | 'complex';
  apiAvailable: boolean;
  mobileApp: boolean;
  offlineCapabilities: boolean;
  dataPrivacy: {
    level: 'high' | 'medium' | 'low';
    details: string[];
  };
  teamCollaboration: boolean;
  customTraining: boolean;
  releaseDate?: string;
  popularity: number;
  pros: string[];
  cons: string[];
  integrations: string[];
  website: string;
  documentation?: string;
}

export interface Recommendation {
  model: AIModel;
  score: number;
  reasons: string[];
  estimatedMonthlyCost: {
    min: number;
    max: number;
  };
  matchPercentage: number;
}