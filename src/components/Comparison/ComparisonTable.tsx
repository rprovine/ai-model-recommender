import React from 'react';
import type { AIModel } from '@/types';
import { Check, X, Minus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ComparisonTableProps {
  models: AIModel[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ models }) => {
  const features = [
    { key: 'pricing', label: 'Starting Price', getValue: (m: AIModel) => {
      if (m.pricing.free) return 'Free';
      if (m.pricing.subscription) return `$${m.pricing.subscription[0].price}/mo`;
      return 'Custom';
    }},
    { key: 'category', label: 'Category', getValue: (m: AIModel) => m.category },
    { key: 'api', label: 'API Available', getValue: (m: AIModel) => m.apiAvailable },
    { key: 'mobile', label: 'Mobile App', getValue: (m: AIModel) => m.mobileApp },
    { key: 'offline', label: 'Offline Mode', getValue: (m: AIModel) => m.offlineCapabilities },
    { key: 'team', label: 'Team Features', getValue: (m: AIModel) => m.teamCollaboration },
    { key: 'privacy', label: 'Privacy Level', getValue: (m: AIModel) => m.dataPrivacy.level },
    { key: 'complexity', label: 'Ease of Use', getValue: (m: AIModel) => m.userInterfaceComplexity },
    { key: 'context', label: 'Key Strength', getValue: (m: AIModel) => m.strengths[0] },
  ];

  const renderValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="w-5 h-5 text-green-600" /> : <X className="w-5 h-5 text-red-600" />;
    }
    if (value === 'high' || value === 'simple') {
      return <Badge variant="default" className="bg-green-100 text-green-800">{value}</Badge>;
    }
    if (value === 'medium' || value === 'moderate') {
      return <Badge variant="secondary">{value}</Badge>;
    }
    if (value === 'low' || value === 'complex') {
      return <Badge variant="outline" className="border-red-200 text-red-700">{value}</Badge>;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-semibold text-gray-700 sticky left-0 bg-white">
              Feature
            </th>
            {models.map(model => (
              <th key={model.id} className="p-4 text-center min-w-[150px]">
                <div className="font-semibold">{model.name}</div>
                <div className="text-xs text-gray-500">{model.vendor}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="p-4 font-medium text-gray-700 sticky left-0 bg-inherit">
                {feature.label}
              </td>
              {models.map(model => (
                <td key={model.id} className="p-4 text-center">
                  {renderValue(feature.getValue(model))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};