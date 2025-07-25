import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { aiModels } from '@/data/models';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { analytics } from '@/utils/analytics';
import { 
  Globe, 
  Smartphone, 
  Code, 
  Shield,
  Users,
  HardDrive,
  ExternalLink,
  ArrowLeft,
  Star,
  DollarSign,
  CheckCircle
} from 'lucide-react';

export const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const model = aiModels.find(m => m.id === toolId);

  React.useEffect(() => {
    if (model) {
      analytics.track('tool_page_view', 'engagement', model.id);
    }
  }, [model]);

  if (!model) {
    return <Navigate to="/" replace />;
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      text: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      image: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      code: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      business: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      multimodal: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Main Info Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl mb-2">{model.name}</CardTitle>
                    <CardDescription className="text-lg">
                      by {model.vendor}
                    </CardDescription>
                  </div>
                  <Badge className={getCategoryColor(model.category)}>
                    {model.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-4">{model.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Feature Badges */}
                <div className="flex flex-wrap gap-2">
                  {model.apiAvailable && (
                    <Badge variant="secondary" className="gap-1">
                      <Code className="w-3 h-3" /> API Available
                    </Badge>
                  )}
                  {model.mobileApp && (
                    <Badge variant="secondary" className="gap-1">
                      <Smartphone className="w-3 h-3" /> Mobile App
                    </Badge>
                  )}
                  {model.offlineCapabilities && (
                    <Badge variant="secondary" className="gap-1">
                      <HardDrive className="w-3 h-3" /> Works Offline
                    </Badge>
                  )}
                  {model.dataPrivacy.level === 'high' && (
                    <Badge variant="secondary" className="gap-1">
                      <Shield className="w-3 h-3" /> High Privacy
                    </Badge>
                  )}
                  {model.teamCollaboration && (
                    <Badge variant="secondary" className="gap-1">
                      <Users className="w-3 h-3" /> Team Collaboration
                    </Badge>
                  )}
                </div>

                {/* Strengths */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Key Strengths
                  </h3>
                  <ul className="space-y-2">
                    {model.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Use Cases */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Best For</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {model.useCases.map((useCase, index) => (
                      <div key={index} className="bg-muted/50 rounded-lg p-3">
                        {useCase}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium">Interface Complexity:</span>
                    <span className="ml-2 text-muted-foreground">{model.userInterfaceComplexity}</span>
                  </div>
                  <div>
                    <span className="font-medium">Popularity:</span>
                    <span className="ml-2 text-muted-foreground">{model.popularity}%</span>
                  </div>
                  <div>
                    <span className="font-medium">Learning Curve:</span>
                    <span className="ml-2 text-muted-foreground">
                      {model.userInterfaceComplexity === 'simple' ? 'Easy' : 
                       model.userInterfaceComplexity === 'moderate' ? 'Moderate' : 'Steep'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Update Frequency:</span>
                    <span className="ml-2 text-muted-foreground">{model.updateFrequency}</span>
                  </div>
                </div>

                {model.integrations.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Integrations</h4>
                    <div className="flex flex-wrap gap-2">
                      {model.integrations.map((integration, index) => (
                        <Badge key={index} variant="outline">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {model.supportedLanguages && (
                  <div>
                    <h4 className="font-medium mb-2">Supported Languages</h4>
                    <p className="text-muted-foreground">
                      {model.supportedLanguages.length > 10 
                        ? `${model.supportedLanguages.length}+ languages including English, Spanish, French, German, and more`
                        : model.supportedLanguages.join(', ')
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {model.pricing.free && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <p className="font-semibold text-green-700 dark:text-green-400">Free tier available</p>
                  </div>
                )}
                
                {model.pricing.subscription && (
                  <div>
                    <h4 className="font-medium mb-2">Subscription Plans</h4>
                    <div className="space-y-2">
                      {model.pricing.subscription.map((plan, index) => (
                        <div key={index} className="bg-muted/50 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{plan.name}</span>
                            <span className="text-lg font-semibold">${plan.price}/mo</span>
                          </div>
                          {plan.limits && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {Object.entries(plan.limits).map(([key, value]) => 
                                `${value} ${key}`
                              ).join(', ')}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {model.pricing.payAsYouGo && (
                  <div>
                    <h4 className="font-medium mb-2">Pay As You Go</h4>
                    <div className="space-y-1">
                      {Object.entries(model.pricing.payAsYouGo).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* CTA Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white">
              <CardHeader>
                <CardTitle className="text-white">Ready to get started?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-white/90">
                  Explore {model.name} and see how it can help with your AI needs.
                </p>
                <div className="space-y-2">
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="w-full"
                    asChild
                  >
                    <a 
                      href={model.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => analytics.track('tool_cta_click', 'conversion', model.id)}
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit {model.vendor}
                    </a>
                  </Button>
                  {model.documentation && (
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      asChild
                    >
                      <a 
                        href={model.documentation} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Documentation
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Data Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Data Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Privacy Level:</span>
                    <Badge variant={model.dataPrivacy.level === 'high' ? 'default' : 'secondary'}>
                      {model.dataPrivacy.level}
                    </Badge>
                  </div>
                  {model.dataPrivacy.certifications && model.dataPrivacy.certifications.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Certifications:</p>
                      <div className="flex flex-wrap gap-1">
                        {model.dataPrivacy.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};