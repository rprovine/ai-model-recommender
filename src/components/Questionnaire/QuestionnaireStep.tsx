import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface QuestionnaireStepProps {
  title: string;
  description: string;
  type: 'single' | 'multiple';
  options: Option[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  onNext: () => void;
  onPrevious?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  optional?: boolean;
}

export const QuestionnaireStep: React.FC<QuestionnaireStepProps> = ({
  title,
  description,
  type,
  options,
  value,
  onChange,
  onNext,
  onPrevious,
  isFirst = false,
  isLast = false,
  optional = false,
}) => {
  const handleSingleChange = (newValue: string) => {
    onChange(newValue);
  };

  const handleMultipleChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (checked) {
      onChange([...currentValues, optionValue]);
    } else {
      onChange(currentValues.filter(v => v !== optionValue));
    }
  };

  const isValid = optional ? true : (type === 'single' ? !!value : Array.isArray(value) && value.length > 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {type === 'single' ? (
          <RadioGroup value={value as string} onValueChange={handleSingleChange}>
            <div className="space-y-3">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-start space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <RadioGroupItem value={option.value} className="mt-1" />
                  <div className="flex-1">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {option.description}
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex items-start space-x-3 cursor-pointer p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <Checkbox
                  checked={(value as string[]).includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleMultipleChange(option.value, checked as boolean)
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground mt-1">
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="flex items-center gap-2"
          >
            {isLast ? 'Get Recommendations' : (optional && value.length === 0 ? 'Skip' : 'Next')}
            {!isLast && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};