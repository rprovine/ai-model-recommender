import type { AIModel, UserPreferences, Recommendation } from '@/types';
import { aiModels } from '@/data/models';
import { getAIRecommendations, mergeRecommendations } from '@/services/anthropic';

export async function generateRecommendations(preferences: UserPreferences): Promise<Recommendation[]> {
  // First, filter models based on hard constraints (budget)
  const eligibleModels = filterEligibleModels(aiModels, preferences);
  
  // Generate static recommendations
  const staticRecommendations = generateStaticRecommendations(eligibleModels, preferences);
  
  try {
    // Get AI-powered recommendations if API is available
    const apiRecommendations = await getAIRecommendations(eligibleModels, preferences);
    
    // Merge static and API recommendations
    return mergeRecommendations(staticRecommendations, apiRecommendations);
  } catch (error) {
    console.error('Failed to get AI recommendations, using static only:', error);
    return staticRecommendations;
  }
}

function filterEligibleModels(models: AIModel[], preferences: UserPreferences): AIModel[] {
  return models.filter(model => {
    // Budget filter - hard constraint
    const budgetScore = calculateBudgetScore(model, preferences.budgetRange);
    if (budgetScore === 0) return false;
    
    // Use case relevance - must have some match
    const useCaseScore = calculateUseCaseScore(model, preferences.primaryUseCase);
    if (useCaseScore === 0) return false;
    
    return true;
  });
}

function generateStaticRecommendations(models: AIModel[], preferences: UserPreferences): Recommendation[] {
  const scoredModels = models.map(model => {
    let score = 0;
    const reasons: string[] = [];

    // Use case matching (30 points max)
    const useCaseScore = calculateUseCaseScore(model, preferences.primaryUseCase);
    score += useCaseScore * 30;
    if (useCaseScore > 0.7) {
      reasons.push(`Excellent for ${preferences.primaryUseCase.join(', ')}`);
    }

    // Budget compatibility (25 points max)
    const budgetScore = calculateBudgetScore(model, preferences.budgetRange);
    score += budgetScore * 25;
    if (budgetScore === 1) {
      reasons.push('Fits your budget perfectly');
    }

    // Experience level match (15 points max)
    const experienceScore = calculateExperienceScore(model, preferences.experienceLevel);
    score += experienceScore * 15;
    if (experienceScore > 0.8) {
      reasons.push(`Great for ${preferences.experienceLevel} users`);
    }

    // Priority factors (20 points max)
    const priorityScore = calculatePriorityScore(model, preferences.priorityFactors);
    score += priorityScore * 20;

    // Integration methods (5 points max)
    const integrationScore = calculateIntegrationScore(model, preferences.integrationMethod);
    score += integrationScore * 5;

    // Special requirements (5 points max)
    const requirementsScore = calculateRequirementsScore(model, preferences.specialRequirements);
    score += requirementsScore * 5;

    // Comprehensive mode additional scoring
    if (preferences.industry && preferences.contentTypes && preferences.programmingLanguages) {
      // Industry-specific scoring (10 points max)
      const industryScore = calculateIndustryScore(model, preferences);
      score += industryScore * 10;
      
      // Team size compatibility (5 points max)
      if (preferences.teamSize) {
        const teamScore = calculateTeamScore(model, preferences.teamSize);
        score += teamScore * 5;
      }
      
      // Data sensitivity requirements (10 points max)
      if (preferences.dataSensitivity) {
        const sensitivityScore = calculateDataSensitivityScore(model, preferences.dataSensitivity);
        score += sensitivityScore * 10;
      }
      
      // Language support (5 points max)
      if (preferences.languages && preferences.languages.length > 0) {
        const languageScore = calculateLanguageScore(model, preferences.languages);
        score += languageScore * 5;
      }
    }

    // Add specific strength reasons
    if (preferences.priorityFactors.includes('privacy') && model.dataPrivacy.level === 'high') {
      reasons.push('Strong privacy protection');
    }
    if (preferences.priorityFactors.includes('speed') && model.strengths.some(s => s.toLowerCase().includes('fast'))) {
      reasons.push('Fast response times');
    }
    if (preferences.priorityFactors.includes('quality') && model.popularity > 85) {
      reasons.push('Industry-leading quality');
    }

    // Calculate estimated cost
    const estimatedCost = calculateEstimatedCost(model, preferences.usageVolume);

    return {
      model,
      score,
      reasons,
      estimatedMonthlyCost: estimatedCost,
      matchPercentage: Math.round(score)
    };
  });

  // Sort by score and return top recommendations
  return scoredModels
    .sort((a, b) => b.score - a.score)
    .filter(rec => rec.score > 40) // Only show decent matches
    .slice(0, 10); // Top 10 recommendations
}

function calculateUseCaseScore(model: AIModel, useCases: string[]): number {
  if (useCases.length === 0) return 0;
  
  let matchCount = 0;
  const modelUseCases = model.useCases.join(' ').toLowerCase();
  
  useCases.forEach(useCase => {
    if (useCase === 'writing' && (model.category === 'text' || model.category === 'multimodal')) {
      matchCount += modelUseCases.includes('content') || modelUseCases.includes('writing') ? 1 : 0.5;
    } else if (useCase === 'coding' && (model.category === 'code' || model.category === 'text')) {
      matchCount += modelUseCases.includes('code') || modelUseCases.includes('programming') ? 1 : 0.3;
    } else if (useCase === 'data' && model.category === 'text') {
      matchCount += modelUseCases.includes('analysis') || modelUseCases.includes('research') ? 1 : 0.5;
    } else if (useCase === 'creative' && (model.category === 'image' || model.category === 'multimodal')) {
      matchCount += 1;
    } else if (useCase === 'business' && model.category === 'business') {
      matchCount += 1;
    } else if (useCase === 'education' && model.category === 'text') {
      matchCount += 0.7;
    }
  });
  
  return matchCount / useCases.length;
}

function calculateBudgetScore(model: AIModel, budget: string): number {
  const pricing = model.pricing;
  
  if (budget === 'free') {
    return pricing.free ? 1 : 0;
  }
  
  let lowestPrice = Infinity;
  
  if (pricing.free) lowestPrice = 0;
  if (pricing.subscription) {
    const prices = pricing.subscription
      .map(s => s.price)
      .filter(p => typeof p === 'number') as number[];
    if (prices.length > 0) {
      const subPrice = Math.min(...prices);
      lowestPrice = Math.min(lowestPrice, subPrice);
    }
  }
  
  switch (budget) {
    case '1-20':
      return lowestPrice <= 20 ? 1 : lowestPrice <= 30 ? 0.5 : 0;
    case '21-100':
      return lowestPrice <= 100 ? 1 : 0.5;
    case '100+':
      return 1; // All models fit
    default:
      return 0.5;
  }
}

function calculateExperienceScore(model: AIModel, experience: string): number {
  const complexity = model.userInterfaceComplexity;
  
  switch (experience) {
    case 'beginner':
      return complexity === 'simple' ? 1 : complexity === 'moderate' ? 0.5 : 0.2;
    case 'intermediate':
      return complexity === 'moderate' ? 1 : complexity === 'simple' ? 0.8 : 0.5;
    case 'advanced':
      return complexity === 'complex' ? 1 : complexity === 'moderate' ? 0.8 : 0.6;
    case 'developer':
      return model.apiAvailable ? 1 : 0.3;
    default:
      return 0.5;
  }
}

function calculatePriorityScore(model: AIModel, priorities: string[]): number {
  if (priorities.length === 0) return 0.5;
  
  let matchCount = 0;
  
  priorities.forEach(priority => {
    switch (priority) {
      case 'cost':
        if (model.pricing.free || (model.pricing.subscription && 
            typeof model.pricing.subscription[0].price === 'number' && 
            model.pricing.subscription[0].price <= 20)) {
          matchCount += 1;
        }
        break;
      case 'quality':
        if (model.popularity >= 85) matchCount += 1;
        break;
      case 'speed':
        if (model.strengths.some(s => s.toLowerCase().includes('fast'))) matchCount += 1;
        break;
      case 'privacy':
        if (model.dataPrivacy.level === 'high') matchCount += 1;
        break;
      case 'ease':
        if (model.userInterfaceComplexity === 'simple') matchCount += 1;
        break;
      case 'features':
        if (model.strengths.length >= 5) matchCount += 1;
        break;
    }
  });
  
  return matchCount / priorities.length;
}

function calculateIntegrationScore(model: AIModel, methods: string[]): number {
  if (methods.length === 0) return 0.5;
  
  let matchCount = 0;
  
  methods.forEach(method => {
    switch (method) {
      case 'web':
        matchCount += 1; // Most models have web access
        break;
      case 'api':
        if (model.apiAvailable) matchCount += 1;
        break;
      case 'mobile':
        if (model.mobileApp) matchCount += 1;
        break;
      case 'desktop':
        if (model.offlineCapabilities) matchCount += 1;
        break;
    }
  });
  
  return matchCount / methods.length;
}

function calculateRequirementsScore(model: AIModel, requirements: string[]): number {
  if (requirements.length === 0) return 1;
  
  let matchCount = 0;
  
  requirements.forEach(req => {
    switch (req) {
      case 'offline':
        if (model.offlineCapabilities) matchCount += 1;
        break;
      case 'team':
        if (model.teamCollaboration) matchCount += 1;
        break;
      case 'custom':
        if (model.customTraining) matchCount += 1;
        break;
      case 'compliance':
        if (model.dataPrivacy.level === 'high') matchCount += 1;
        break;
      case 'support':
        if (model.pricing.subscription && model.pricing.subscription.some(s => 
            typeof s.price === 'number' && s.price > 50)) {
          matchCount += 1;
        }
        break;
    }
  });
  
  return matchCount / requirements.length;
}

function calculateEstimatedCost(model: AIModel, volume: string): { min: number; max: number } {
  const volumeMultiplier = {
    light: 0.5,
    moderate: 1,
    heavy: 2.5
  }[volume] || 1;

  let minCost = 0;
  let maxCost = 0;

  if (model.pricing.free) {
    minCost = 0;
  }

  if (model.pricing.subscription) {
    const prices = model.pricing.subscription
      .map(s => s.price)
      .filter(p => typeof p === 'number') as number[];
    
    if (prices.length > 0) {
      if (minCost === 0 && model.pricing.free) {
        maxCost = Math.min(...prices);
      } else {
        minCost = Math.min(...prices);
        maxCost = Math.max(...prices);
      }
    }
  }

  if (model.pricing.api) {
    // Estimate API costs based on usage volume
    const tokensPerMonth = volumeMultiplier * 100000; // Base estimate
    const apiCost = (tokensPerMonth / 1000) * ((model.pricing.api.inputCost || 0) + (model.pricing.api.outputCost || 0)) / 2;
    
    if (minCost === 0) {
      minCost = apiCost;
      maxCost = apiCost * 2;
    } else {
      maxCost = Math.max(maxCost, apiCost * 2);
    }
  }

  return { min: Math.round(minCost), max: Math.round(maxCost) };
}

// Comprehensive mode scoring functions
function calculateIndustryScore(model: AIModel, preferences: UserPreferences): number {
  const industry = preferences.industry;
  const useCases = model.useCases.join(' ').toLowerCase();
  const strengths = model.strengths.join(' ').toLowerCase();
  
  switch (industry) {
    case 'tech':
      if (model.category === 'code' || model.apiAvailable) return 1;
      return 0.5;
    case 'healthcare':
      if (model.dataPrivacy.level === 'high' && strengths.includes('complian')) return 1;
      return 0.3;
    case 'finance':
      if (model.dataPrivacy.level === 'high' && strengths.includes('security')) return 1;
      return 0.4;
    case 'education-industry':
      if (useCases.includes('education') || useCases.includes('teaching')) return 1;
      return 0.5;
    case 'marketing':
      if (model.category === 'text' || model.category === 'image') return 0.9;
      return 0.4;
    case 'legal':
      if (model.dataPrivacy.level === 'high' && strengths.includes('accuracy')) return 1;
      return 0.3;
    default:
      return 0.5;
  }
}

function calculateTeamScore(model: AIModel, teamSize: string): number {
  switch (teamSize) {
    case 'individual':
      return model.pricing.free ? 1 : 0.7;
    case 'small-team':
      return model.teamCollaboration ? 1 : 0.5;
    case 'medium-team':
      return model.teamCollaboration && model.pricing.subscription ? 1 : 0.4;
    case 'large-team':
      return model.teamCollaboration && model.pricing.subscription && 
             model.pricing.subscription.some(s => typeof s.price === 'number' && s.price > 50) ? 1 : 0.3;
    default:
      return 0.5;
  }
}

function calculateDataSensitivityScore(model: AIModel, sensitivity: string): number {
  const privacyLevel = model.dataPrivacy.level;
  
  switch (sensitivity) {
    case 'public':
      return 1; // All models are fine
    case 'internal':
      return privacyLevel === 'high' ? 1 : privacyLevel === 'medium' ? 0.7 : 0.3;
    case 'confidential':
      return privacyLevel === 'high' ? 1 : privacyLevel === 'medium' ? 0.4 : 0;
    case 'regulated':
      return privacyLevel === 'high' ? 0.8 : 0; // Even high privacy may not be enough
    default:
      return 0.5;
  }
}

function calculateLanguageScore(model: AIModel, languages: string[]): number {
  const modelStrengths = model.strengths.join(' ').toLowerCase();
  const useCases = model.useCases.join(' ').toLowerCase();
  
  // Check for multilingual capabilities
  if (modelStrengths.includes('multilingual') || modelStrengths.includes('language')) {
    return 1;
  }
  
  // Check for translation capabilities
  if (model.category === 'text' && (useCases.includes('translation') || model.name.toLowerCase().includes('translate'))) {
    return 0.9;
  }
  
  // Basic support for English
  if (languages.length === 1 && languages[0] === 'english') {
    return 0.8;
  }
  
  return 0.3;
}