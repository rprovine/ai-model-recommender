import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Recommendation } from '@/types';
import { analytics } from '@/utils/analytics';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Globe, 
  Smartphone, 
  Code, 
  Shield,
  Users,
  HardDrive,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';

interface ModelCardProps {
  recommendation: Recommendation;
  expanded?: boolean;
  onToggleExpand?: () => void;
}

export const ModelCard: React.FC<ModelCardProps> = ({ 
  recommendation, 
  expanded = false,
  onToggleExpand 
}) => {
  const { model, reasons, estimatedMonthlyCost, matchPercentage } = recommendation;
  const { user, saveRecommendation, removeSavedRecommendation } = useAuth();
  
  const isSaved = user?.preferences?.savedRecommendations?.includes(model.id);

  const handleToggleSave = () => {
    if (!user) {
      alert('Please sign in to save recommendations');
      return;
    }
    
    if (isSaved) {
      removeSavedRecommendation(model.id);
    } else {
      saveRecommendation([model.id]);
    }
  };

  const getPriceDisplay = () => {
    if (model.pricing.free) {
      return 'Free tier available';
    }
    if (estimatedMonthlyCost.min === estimatedMonthlyCost.max) {
      return `$${estimatedMonthlyCost.min}/month`;
    }
    return `$${estimatedMonthlyCost.min} - $${estimatedMonthlyCost.max}/month`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      text: 'bg-blue-100 text-blue-800',
      image: 'bg-purple-100 text-purple-800',
      code: 'bg-green-100 text-green-800',
      business: 'bg-orange-100 text-orange-800',
      multimodal: 'bg-pink-100 text-pink-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">{model.name}</CardTitle>
              <Badge variant="outline" className={getCategoryColor(model.category)}>
                {model.category}
              </Badge>
            </div>
            <CardDescription className="text-sm">
              by {model.vendor} • {model.description}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{matchPercentage}%</div>
            <div className="text-xs text-muted-foreground">match</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {model.apiAvailable && (
            <Badge variant="secondary" className="gap-1">
              <Code className="w-3 h-3" /> API
            </Badge>
          )}
          {model.mobileApp && (
            <Badge variant="secondary" className="gap-1">
              <Smartphone className="w-3 h-3" /> Mobile
            </Badge>
          )}
          {model.offlineCapabilities && (
            <Badge variant="secondary" className="gap-1">
              <HardDrive className="w-3 h-3" /> Offline
            </Badge>
          )}
          {model.dataPrivacy.level === 'high' && (
            <Badge variant="secondary" className="gap-1">
              <Shield className="w-3 h-3" /> High Privacy
            </Badge>
          )}
          {model.teamCollaboration && (
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3 h-3" /> Team Features
            </Badge>
          )}
        </div>

        <div className="bg-accent/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Estimated Cost</span>
            <span className="text-lg font-semibold">{getPriceDisplay()}</span>
          </div>
          {model.pricing.subscription && (
            <div className="text-xs text-muted-foreground">
              Plans from ${model.pricing.subscription[0].price}/month
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Why we recommend this:</h4>
          <div className="space-y-3">
            {reasons.slice(0, expanded ? reasons.length : 2).map((reason, index) => (
              <div key={index} className="text-sm text-muted-foreground bg-muted/30 rounded-md p-3 border-l-4 border-primary/30">
                <p className="leading-relaxed">{reason}</p>
              </div>
            ))}
            {!expanded && reasons.length > 2 && (
              <p className="text-xs text-muted-foreground italic">+{reasons.length - 2} more reasons...</p>
            )}
          </div>
        </div>

        {expanded && (
          <>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Key Strengths:</h4>
              <ul className="space-y-1">
                {model.strengths.slice(0, 5).map((strength, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    • {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Complexity:</span>
                <span className="ml-2 text-muted-foreground">{model.userInterfaceComplexity}</span>
              </div>
              <div>
                <span className="font-medium">Popularity:</span>
                <span className="ml-2 text-muted-foreground">{model.popularity}%</span>
              </div>
            </div>
          </>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button size="sm" asChild>
            <a 
              href={model.website} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => analytics.track('model_visit', 'engagement', model.id)}
            >
              <Globe className="w-4 h-4 mr-1" />
              Visit Site
            </a>
          </Button>
          {model.documentation && (
            <Button size="sm" variant="outline" asChild>
              <a 
                href={model.documentation} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => analytics.track('model_docs', 'engagement', model.id)}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Docs
              </a>
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isSaved ? "default" : "outline"}
            onClick={handleToggleSave}
            className="gap-1"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                Save
              </>
            )}
          </Button>
          {onToggleExpand && (
            <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              onToggleExpand();
              analytics.track('model_expand', 'engagement', model.id, expanded ? 0 : 1);
            }}
            className="gap-1"
          >
            {expanded ? (
              <>
                Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                More <ChevronDown className="w-4 h-4" />
              </>
            )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};