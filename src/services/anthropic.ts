import Anthropic from '@anthropic-ai/sdk';
import type { AIModel, UserPreferences, Recommendation } from '@/types';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

interface APIRecommendation {
  modelId: string;
  score: number;
  reasons: string[];
  explanation: string;
}

export async function getAIRecommendations(
  eligibleModels: AIModel[],
  preferences: UserPreferences
): Promise<APIRecommendation[]> {
  // If no API key or static mode, return empty array (fallback to static scoring)
  if (!import.meta.env.VITE_ANTHROPIC_API_KEY || import.meta.env.VITE_USE_STATIC_ONLY === 'true') {
    return [];
  }

  try {
    const modelSummaries = eligibleModels.map(model => ({
      id: model.id,
      name: model.name,
      vendor: model.vendor,
      category: model.category,
      pricing: model.pricing,
      strengths: model.strengths.slice(0, 3),
      useCases: model.useCases.slice(0, 3),
      pros: model.pros.slice(0, 3),
      cons: model.cons.slice(0, 2)
    }));

    const prompt = `You are an objective AI model recommendation expert. Based on the user's preferences and the eligible AI models, provide unbiased recommendations.

User Preferences:
- Primary Use Cases: ${preferences.primaryUseCase.join(', ')}
- Experience Level: ${preferences.experienceLevel}
- Budget Range: $${preferences.budgetRange}/month
- Priority Factors: ${preferences.priorityFactors.join(', ')}
- Integration Methods: ${preferences.integrationMethod.join(', ')}
- Usage Volume: ${preferences.usageVolume}
- Special Requirements: ${preferences.specialRequirements.join(', ') || 'None'}

Eligible AI Models:
${JSON.stringify(modelSummaries, null, 2)}

Provide a JSON response with your top 5 recommendations. For each model:
1. Score it from 0-100 based on fit
2. List 2-3 specific reasons why it matches their needs
3. Provide a brief explanation of trade-offs

Consider:
- Budget constraints are critical - don't recommend models outside their range
- Match use cases precisely
- Weight experience level heavily
- Be honest about limitations

Return ONLY valid JSON in this format:
{
  "recommendations": [
    {
      "modelId": "model-id",
      "score": 85,
      "reasons": ["Reason 1", "Reason 2"],
      "explanation": "Brief explanation of why this is a good fit and any trade-offs"
    }
  ]
}`;

    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Using Haiku for cost efficiency
      max_tokens: 1000,
      temperature: 0.3, // Lower temperature for consistency
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Parse the response
    const content = response.content[0];
    if (content.type === 'text') {
      try {
        const parsed = JSON.parse(content.text);
        return parsed.recommendations || [];
      } catch (parseError) {
        console.error('Failed to parse API response:', parseError);
        return [];
      }
    }

    return [];
  } catch (error) {
    console.error('Anthropic API error:', error);
    // Return empty array to fallback to static scoring
    return [];
  }
}

export function mergeRecommendations(
  staticRecommendations: Recommendation[],
  apiRecommendations: APIRecommendation[]
): Recommendation[] {
  // If we have API recommendations, enhance the static ones
  if (apiRecommendations.length > 0) {
    const apiRecMap = new Map(
      apiRecommendations.map(rec => [rec.modelId, rec])
    );

    return staticRecommendations.map(staticRec => {
      const apiRec = apiRecMap.get(staticRec.model.id);
      
      if (apiRec) {
        // Blend static and API scores (60% API, 40% static)
        const blendedScore = (apiRec.score * 0.6) + (staticRec.score * 0.4);
        
        return {
          ...staticRec,
          score: blendedScore,
          matchPercentage: Math.round(blendedScore),
          reasons: [...apiRec.reasons, ...staticRec.reasons.slice(0, 1)],
          // Add API explanation as first reason if provided
          apiExplanation: apiRec.explanation
        };
      }
      
      return staticRec;
    }).sort((a, b) => b.score - a.score);
  }

  // Fallback to pure static recommendations
  return staticRecommendations;
}