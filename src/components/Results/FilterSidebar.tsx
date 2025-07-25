import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import type { Recommendation } from '@/types';

interface FilterSidebarProps {
  recommendations: Recommendation[];
  onFilterChange: (filtered: Recommendation[]) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  recommendations, 
  onFilterChange 
}) => {
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [vendorFilters, setVendorFilters] = useState<Set<string>>(new Set());
  const [categoryFilters, setCategoryFilters] = useState<Set<string>>(new Set());
  const [featureFilters, setFeatureFilters] = useState<Set<string>>(new Set());

  // Get unique values for filters
  const vendors = Array.from(new Set(recommendations.map(r => r.model.vendor)));
  const categories = Array.from(new Set(recommendations.map(r => r.model.category)));

  useEffect(() => {
    let filtered = [...recommendations];

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter(rec => {
        const minCost = rec.estimatedMonthlyCost.min;
        switch (priceFilter) {
          case 'free':
            return minCost === 0;
          case 'under20':
            return minCost <= 20;
          case 'under50':
            return minCost <= 50;
          case 'under100':
            return minCost <= 100;
          default:
            return true;
        }
      });
    }

    // Vendor filter
    if (vendorFilters.size > 0) {
      filtered = filtered.filter(rec => vendorFilters.has(rec.model.vendor));
    }

    // Category filter
    if (categoryFilters.size > 0) {
      filtered = filtered.filter(rec => categoryFilters.has(rec.model.category));
    }

    // Feature filter
    if (featureFilters.size > 0) {
      filtered = filtered.filter(rec => {
        const model = rec.model;
        return Array.from(featureFilters).every(feature => {
          switch (feature) {
            case 'api':
              return model.apiAvailable;
            case 'mobile':
              return model.mobileApp;
            case 'offline':
              return model.offlineCapabilities;
            case 'team':
              return model.teamCollaboration;
            case 'privacy':
              return model.dataPrivacy.level === 'high';
            default:
              return true;
          }
        });
      });
    }

    onFilterChange(filtered);
  }, [priceFilter, vendorFilters, categoryFilters, featureFilters, recommendations, onFilterChange]);

  const toggleVendor = (vendor: string) => {
    setVendorFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(vendor)) {
        newSet.delete(vendor);
      } else {
        newSet.add(vendor);
      }
      return newSet;
    });
  };

  const toggleCategory = (category: string) => {
    setCategoryFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const toggleFeature = (feature: string) => {
    setFeatureFilters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(feature)) {
        newSet.delete(feature);
      } else {
        newSet.add(feature);
      }
      return newSet;
    });
  };

  const clearFilters = () => {
    setPriceFilter('all');
    setVendorFilters(new Set());
    setCategoryFilters(new Set());
    setFeatureFilters(new Set());
  };

  const hasActiveFilters = priceFilter !== 'all' || 
    vendorFilters.size > 0 || 
    categoryFilters.size > 0 || 
    featureFilters.size > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Filter */}
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <RadioGroup value={priceFilter} onValueChange={setPriceFilter}>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <RadioGroupItem value="all" />
                <span className="text-sm">All prices</span>
              </label>
              <label className="flex items-center space-x-2">
                <RadioGroupItem value="free" />
                <span className="text-sm">Free only</span>
              </label>
              <label className="flex items-center space-x-2">
                <RadioGroupItem value="under20" />
                <span className="text-sm">Under $20/month</span>
              </label>
              <label className="flex items-center space-x-2">
                <RadioGroupItem value="under50" />
                <span className="text-sm">Under $50/month</span>
              </label>
              <label className="flex items-center space-x-2">
                <RadioGroupItem value="under100" />
                <span className="text-sm">Under $100/month</span>
              </label>
            </div>
          </RadioGroup>
        </div>

        {/* Vendor Filter */}
        <div>
          <h3 className="font-semibold mb-3">Vendor</h3>
          <div className="space-y-2">
            {vendors.map(vendor => (
              <label key={vendor} className="flex items-center space-x-2">
                <Checkbox
                  checked={vendorFilters.has(vendor)}
                  onCheckedChange={() => toggleVendor(vendor)}
                />
                <span className="text-sm">{vendor}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-2">
                <Checkbox
                  checked={categoryFilters.has(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <span className="text-sm capitalize">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Feature Filter */}
        <div>
          <h3 className="font-semibold mb-3">Features</h3>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={featureFilters.has('api')}
                onCheckedChange={() => toggleFeature('api')}
              />
              <span className="text-sm">API Available</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={featureFilters.has('mobile')}
                onCheckedChange={() => toggleFeature('mobile')}
              />
              <span className="text-sm">Mobile App</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={featureFilters.has('offline')}
                onCheckedChange={() => toggleFeature('offline')}
              />
              <span className="text-sm">Offline Mode</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={featureFilters.has('team')}
                onCheckedChange={() => toggleFeature('team')}
              />
              <span className="text-sm">Team Features</span>
            </label>
            <label className="flex items-center space-x-2">
              <Checkbox
                checked={featureFilters.has('privacy')}
                onCheckedChange={() => toggleFeature('privacy')}
              />
              <span className="text-sm">High Privacy</span>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};