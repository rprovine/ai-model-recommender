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
    const subPrice = Math.min(...pricing.subscription.map(s => s.price));
    lowestPrice = Math.min(lowestPrice, subPrice);
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
        if (model.pricing.free || (model.pricing.subscription && model.pricing.subscription[0].price <= 20)) {
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
        if (model.pricing.subscription && model.pricing.subscription.some(s => s.price > 50)) {
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
    const prices = model.pricing.subscription.map(s => s.price);
    if (minCost === 0 && model.pricing.free) {
      maxCost = Math.min(...prices);
    } else {
      minCost = Math.min(...prices);
      maxCost = Math.max(...prices);
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