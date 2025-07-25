import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiModels } from '@/data/models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';

export const ToolsDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(aiModels.map(m => m.category))];

  const filteredModels = aiModels.filter(model => {
    const matchesSearch = searchTerm === '' || 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || model.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            AI Tools Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore {aiModels.length}+ AI tools and find the perfect match for your needs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-500" />
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? '' : ''}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filteredModels.length} of {aiModels.length} tools
        </p>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <Link key={model.id} to={`/tools/${model.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge className={getCategoryColor(model.category)}>
                      {model.category}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    by {model.vendor}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {model.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {model.pricing.free && (
                        <Badge variant="secondary" className="text-xs">Free tier</Badge>
                      )}
                      {model.apiAvailable && (
                        <Badge variant="secondary" className="text-xs">API</Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {model.popularity}% popular
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredModels.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No tools found matching your criteria. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-16 prose prose-gray dark:prose-invert max-w-4xl mx-auto">
          <h2>Find the Right AI Tool for Your Needs</h2>
          <p>
            Our comprehensive directory features the latest AI tools across multiple categories including
            text generation, image creation, code assistance, business automation, and multimodal AI.
            Whether you're a developer, designer, writer, or business professional, you'll find the
            perfect AI solution here.
          </p>
          <h3>Popular AI Categories</h3>
          <ul>
            <li><strong>Text AI:</strong> ChatGPT, Claude, Gemini, and more for content creation and writing</li>
            <li><strong>Image AI:</strong> DALL-E, Midjourney, Stable Diffusion for visual content</li>
            <li><strong>Code AI:</strong> GitHub Copilot, Cursor, Replit for programming assistance</li>
            <li><strong>Business AI:</strong> Jasper, Copy.ai, Synthesia for business automation</li>
            <li><strong>Multimodal AI:</strong> GPT-4V, Gemini Pro, Claude for diverse tasks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};