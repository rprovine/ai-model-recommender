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

    // Generate comprehensive detailed reasons
    const detailedReasons = generateDetailedReasons(model, preferences, {
      useCaseScore,
      budgetScore,
      experienceScore,
      priorityScore,
      integrationScore,
      requirementsScore,
      industryScore: preferences.industry ? calculateIndustryScore(model, preferences) : 0,
      teamScore: preferences.teamSize ? calculateTeamScore(model, preferences.teamSize) : 0,
      sensitivityScore: preferences.dataSensitivity ? calculateDataSensitivityScore(model, preferences.dataSensitivity) : 0,
      languageScore: preferences.languages ? calculateLanguageScore(model, preferences.languages) : 0
    });
    
    reasons.push(...detailedReasons);

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

// Generate comprehensive detailed reasons for recommendations
function generateDetailedReasons(
  model: AIModel, 
  preferences: UserPreferences,
  scores: {
    useCaseScore: number;
    budgetScore: number;
    experienceScore: number;
    priorityScore: number;
    integrationScore: number;
    requirementsScore: number;
    industryScore: number;
    teamScore: number;
    sensitivityScore: number;
    languageScore: number;
  }
): string[] {
  const reasons: string[] = [];
  
  // Use case specific reasons with examples
  if (scores.useCaseScore > 0.7) {
    preferences.primaryUseCase.forEach(useCase => {
      switch (useCase) {
        case 'writing':
          if (model.category === 'text' || model.category === 'multimodal') {
            const writingStrengths = model.strengths.filter(s => 
              s.toLowerCase().includes('writing') || 
              s.toLowerCase().includes('content') ||
              s.toLowerCase().includes('creative')
            );
            if (writingStrengths.length > 0) {
              reasons.push(`Perfect for your content writing needs with ${writingStrengths.join(', ').toLowerCase()}. You can use ${model.name} to create blog posts, marketing copy, emails, and creative content with consistent quality and tone.`);
            }
            
            // Content type specific reasons
            if (preferences.contentTypes?.includes('blog-posts')) {
              reasons.push(`Excellent for blog post creation - ${model.name} can help you generate SEO-optimized articles, create engaging headlines, and maintain consistent tone across all your content.`);
            }
            if (preferences.contentTypes?.includes('marketing-copy')) {
              reasons.push(`Ideal for marketing copy - craft compelling ad copy, landing pages, and email campaigns that convert. ${model.name}'s understanding of persuasive writing will help boost your marketing ROI.`);
            }
          }
          break;
          
        case 'coding':
          if (model.category === 'code' || (model.category === 'text' && model.strengths.some(s => s.toLowerCase().includes('code')))) {
            reasons.push(`Outstanding for software development - ${model.name} excels at code generation, debugging, and documentation. It understands ${preferences.programmingLanguages?.join(', ') || 'multiple programming languages'} and can help with everything from quick scripts to complex architectures.`);
            
            // Programming language specific
            if (preferences.programmingLanguages?.includes('python')) {
              reasons.push(`Particularly strong with Python - perfect for data science scripts, automation, web development with Django/FastAPI, and machine learning projects.`);
            }
            if (preferences.programmingLanguages?.includes('javascript')) {
              reasons.push(`Excellent JavaScript/TypeScript support - ideal for React, Node.js, and modern web development. Can help with both frontend and backend code.`);
            }
          }
          break;
          
        case 'data':
          if (model.category === 'text' && model.useCases.some(uc => uc.toLowerCase().includes('analysis') || uc.toLowerCase().includes('research'))) {
            reasons.push(`Powerful for data analysis and research - ${model.name} can help you analyze datasets, generate insights, create visualizations, and compile comprehensive research reports. Its analytical capabilities make it perfect for data-driven decision making.`);
          }
          break;
          
        case 'creative':
          if (model.category === 'image' || model.category === 'multimodal') {
            reasons.push(`Exceptional for creative work - ${model.name} enables you to generate stunning visuals, concept art, and design elements. Perfect for marketing materials, social media content, and creative projects.`);
          }
          break;
          
        case 'business':
          if (model.category === 'business' || model.teamCollaboration) {
            reasons.push(`Tailored for business automation - streamline document processing, automate meeting notes, and create efficient workflows. ${model.name} integrates seamlessly with business tools to boost productivity across your organization.`);
          }
          break;
      }
    });
  }
  
  // Budget-specific detailed reasons
  if (scores.budgetScore === 1) {
    const budgetRange = preferences.budgetRange;
    if (budgetRange === 'free' && model.pricing.free) {
      reasons.push(`Fits perfectly within your free budget requirement - ${model.name} offers a generous free tier with ${model.pricing.free.features.join(', ')}. This gives you ${model.pricing.free.requests || 'unlimited'} requests to get started without any financial commitment.`);
    } else if (budgetRange === '1-20' && model.pricing.subscription) {
      const affordablePlans = model.pricing.subscription.filter(p => typeof p.price === 'number' && p.price <= 20);
      if (affordablePlans.length > 0) {
        reasons.push(`Affordable pricing at $${affordablePlans[0].price}/month fits your budget perfectly. This plan includes ${affordablePlans[0].features.join(', ')}, giving you professional features without breaking the bank.`);
      }
    }
  }
  
  // Experience level detailed matching
  if (scores.experienceScore > 0.8) {
    switch (preferences.experienceLevel) {
      case 'beginner':
        if (model.userInterfaceComplexity === 'simple') {
          reasons.push(`Perfect for beginners - ${model.name} features an intuitive, user-friendly interface that doesn't require technical knowledge. You'll find helpful tutorials, templates, and guided workflows to get started quickly.`);
        }
        break;
      case 'advanced':
        if (model.userInterfaceComplexity === 'complex' || model.apiAvailable) {
          reasons.push(`Ideal for advanced users - ${model.name} provides full control with advanced features, customization options, and ${model.apiAvailable ? 'API access for custom integrations' : 'professional-grade capabilities'}. You can leverage its full potential for complex workflows.`);
        }
        break;
      case 'developer':
        if (model.apiAvailable) {
          reasons.push(`Built for developers - comprehensive API access allows you to integrate ${model.name} directly into your applications. With detailed documentation and SDKs, you can build custom solutions and automate workflows programmatically.`);
        }
        break;
    }
  }
  
  // Industry-specific detailed reasons
  if (preferences.industry && scores.industryScore > 0.7) {
    switch (preferences.industry) {
      case 'tech':
        reasons.push(`Optimized for the tech industry - ${model.name} understands software development workflows, technical documentation, and modern development practices. Perfect for startups and tech companies looking to accelerate development.`);
        break;
      case 'healthcare':
        if (model.dataPrivacy.level === 'high') {
          reasons.push(`Healthcare-compliant with ${model.dataPrivacy.details.join(', ')}. ${model.name} ensures patient data privacy and meets healthcare industry standards, making it suitable for medical documentation and research.`);
        }
        break;
      case 'finance':
        if (model.dataPrivacy.level === 'high') {
          reasons.push(`Financial industry ready - ${model.name} provides enterprise-grade security and compliance features essential for handling sensitive financial data. Perfect for financial analysis, reporting, and secure document processing.`);
        }
        break;
      case 'marketing':
        reasons.push(`Marketing-focused capabilities - ${model.name} excels at creating compelling content, analyzing market trends, and generating creative campaigns. Ideal for agencies and marketing teams looking to scale content production.`);
        break;
      case 'education-industry':
        reasons.push(`Education-optimized - ${model.name} is perfect for creating educational content, lesson plans, and learning materials. Its ability to explain complex concepts simply makes it invaluable for educators.`);
        break;
    }
  }
  
  // Team collaboration detailed reasons
  if (preferences.teamSize && scores.teamScore > 0.7) {
    switch (preferences.teamSize) {
      case 'small-team':
        if (model.teamCollaboration) {
          reasons.push(`Great for small teams - ${model.name} includes collaboration features that let your team share prompts, templates, and results. Perfect for teams of 2-5 people who need to maintain consistency.`);
        }
        break;
      case 'medium-team':
      case 'large-team':
        if (model.teamCollaboration && model.pricing.subscription?.some(p => p.name.toLowerCase().includes('team') || p.name.toLowerCase().includes('business'))) {
          reasons.push(`Enterprise team features - ${model.name} offers dedicated team workspaces, role-based access control, and centralized billing. Scale your AI usage across ${preferences.teamSize === 'large-team' ? '20+' : '6-20'} team members efficiently.`);
        }
        break;
    }
  }
  
  // Data sensitivity detailed reasons
  if (preferences.dataSensitivity && scores.sensitivityScore > 0.7) {
    switch (preferences.dataSensitivity) {
      case 'confidential':
      case 'regulated':
        reasons.push(`High-security standards - ${model.name} provides ${model.dataPrivacy.details.join(', ')}, ensuring your ${preferences.dataSensitivity} data remains protected. Features enterprise-grade encryption and compliance certifications.`);
        break;
    }
  }
  
  // Integration method detailed reasons
  if (preferences.integrationMethod && scores.integrationScore > 0.7) {
    const integrations: string[] = [];
    if (preferences.integrationMethod.includes('api') && model.apiAvailable) {
      integrations.push('RESTful API with comprehensive documentation');
    }
    if (preferences.integrationMethod.includes('mobile') && model.mobileApp) {
      integrations.push('native mobile apps for iOS and Android');
    }
    if (preferences.integrationMethod.includes('desktop') && model.offlineCapabilities) {
      integrations.push('desktop application with offline support');
    }
    if (integrations.length > 0) {
      reasons.push(`Flexible integration options - Access ${model.name} through ${integrations.join(', ')}. This ensures you can use the tool wherever and however you work best.`);
    }
  }
  
  // Workflow integration specific reasons
  if (preferences.workflowIntegration && preferences.workflowIntegration.length > 0) {
    const workflowMatches: string[] = [];
    if (preferences.workflowIntegration.includes('ide-plugin') && model.category === 'code') {
      workflowMatches.push('IDE integration for seamless coding');
    }
    if (preferences.workflowIntegration.includes('slack-teams') && model.integrations.some(i => i.toLowerCase().includes('slack'))) {
      workflowMatches.push('Slack/Teams integration for team collaboration');
    }
    if (preferences.workflowIntegration.includes('zapier') && model.integrations.some(i => i.toLowerCase().includes('zapier'))) {
      workflowMatches.push('Zapier automation for workflow integration');
    }
    if (workflowMatches.length > 0) {
      reasons.push(`Seamless workflow integration - ${model.name} supports ${workflowMatches.join(', ')}, allowing you to incorporate AI into your existing tools and processes without disruption.`);
    }
  }
  
  // Performance needs detailed reasons
  if (preferences.performanceNeeds) {
    switch (preferences.performanceNeeds) {
      case 'fastest':
        if (model.strengths.some(s => s.toLowerCase().includes('fast') || s.toLowerCase().includes('speed'))) {
          reasons.push(`Lightning-fast performance - ${model.name} is optimized for speed, delivering near-instant responses. Perfect when you need quick iterations and rapid prototyping.`);
        }
        break;
      case 'quality':
        if (model.popularity > 85 || model.strengths.some(s => s.toLowerCase().includes('quality') || s.toLowerCase().includes('accurate'))) {
          reasons.push(`Premium output quality - ${model.name} prioritizes accuracy and sophistication over speed, delivering professional-grade results that require minimal editing. Worth the wait for critical projects.`);
        }
        break;
      case 'batch':
        if (model.apiAvailable || model.strengths.some(s => s.toLowerCase().includes('batch') || s.toLowerCase().includes('scale'))) {
          reasons.push(`Batch processing capable - ${model.name} can handle large-scale operations efficiently, processing multiple requests in parallel. Ideal for bulk content generation or data analysis tasks.`);
        }
        break;
    }
  }
  
  // Language support detailed reasons
  if (preferences.languages && preferences.languages.length > 1 && scores.languageScore > 0.7) {
    reasons.push(`Multilingual capabilities - ${model.name} supports ${preferences.languages.join(', ')}, making it perfect for international projects and cross-language content creation. Great for global teams and multilingual content strategies.`);
  }
  
  // Current tools comparison
  if (preferences.currentTools && preferences.currentTools.length > 0 && !preferences.currentTools.includes('none')) {
    const currentToolsStr = preferences.currentTools.join(', ');
    reasons.push(`Complements your existing toolkit - ${model.name} works well alongside ${currentToolsStr}, filling gaps and enhancing your current AI workflow. You can use it to augment capabilities you're already familiar with.`);
  }
  
  // Special requirements detailed reasons
  if (preferences.specialRequirements && scores.requirementsScore > 0.7) {
    preferences.specialRequirements.forEach(req => {
      switch (req) {
        case 'offline':
          if (model.offlineCapabilities) {
            reasons.push(`Offline capability - Work without internet connection using ${model.name}'s offline mode. Perfect for secure environments or when traveling.`);
          }
          break;
        case 'custom':
          if (model.customTraining) {
            reasons.push(`Custom training available - Fine-tune ${model.name} on your specific data and use cases for improved accuracy and relevance to your domain.`);
          }
          break;
        case 'compliance':
          if (model.dataPrivacy.details.some(d => d.includes('GDPR') || d.includes('HIPAA') || d.includes('SOC'))) {
            reasons.push(`Regulatory compliance - ${model.name} meets major compliance standards including ${model.dataPrivacy.details.filter(d => d.includes('GDPR') || d.includes('HIPAA') || d.includes('SOC')).join(', ')}.`);
          }
          break;
      }
    });
  }
  
  // Support level detailed reasons
  if (preferences.supportLevel && preferences.supportLevel !== 'community') {
    if (preferences.supportLevel === 'enterprise' && model.pricing.subscription?.some(p => typeof p.price === 'number' && p.price > 100)) {
      reasons.push(`Enterprise support available - Get dedicated account management, SLA guarantees, and priority support. ${model.name} offers the professional support your organization needs.`);
    } else if (preferences.supportLevel === 'priority') {
      reasons.push(`Priority support options - Access faster response times and dedicated support channels to resolve issues quickly.`);
    }
  }
  
  // Add model-specific unique advantages
  if (model.pros && model.pros.length > 0) {
    const uniqueAdvantages = model.pros.slice(0, 2).join(' and ');
    reasons.push(`Key advantages include ${uniqueAdvantages.toLowerCase()}, setting ${model.name} apart from alternatives in your use case.`);
  }
  
  return reasons.filter(r => r.length > 0); // Remove any empty reasons
}