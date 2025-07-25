export const questions = [
  {
    id: 'useCase',
    title: 'What will you primarily use AI for?',
    description: 'Select all that apply to your intended use cases',
    type: 'multiple' as const,
    options: [
      {
        value: 'writing',
        label: 'Content Writing & Communication',
        description: 'Blog posts, emails, marketing copy, creative writing'
      },
      {
        value: 'coding',
        label: 'Software Development',
        description: 'Code generation, debugging, documentation, learning'
      },
      {
        value: 'data',
        label: 'Data Analysis & Research',
        description: 'Analyzing data, research, fact-checking, reports'
      },
      {
        value: 'creative',
        label: 'Creative Work',
        description: 'Image generation, design, art, music, video'
      },
      {
        value: 'business',
        label: 'Business Automation',
        description: 'Document processing, meeting notes, workflows'
      },
      {
        value: 'education',
        label: 'Learning & Education',
        description: 'Tutoring, explanations, homework help, courses'
      }
    ]
  },
  {
    id: 'experience',
    title: 'What\'s your experience level with AI?',
    description: 'This helps us recommend tools that match your technical comfort',
    type: 'single' as const,
    options: [
      {
        value: 'beginner',
        label: 'Beginner',
        description: 'New to AI, prefer simple interfaces and guidance'
      },
      {
        value: 'intermediate',
        label: 'Intermediate',
        description: 'Some experience, comfortable with basic features'
      },
      {
        value: 'advanced',
        label: 'Advanced',
        description: 'Experienced user, want full control and features'
      },
      {
        value: 'developer',
        label: 'Developer',
        description: 'Technical user, interested in APIs and customization'
      }
    ]
  },
  {
    id: 'budget',
    title: 'What\'s your monthly budget for AI tools?',
    description: 'We\'ll recommend options that fit your budget',
    type: 'single' as const,
    options: [
      {
        value: 'free',
        label: 'Free only',
        description: 'Looking for free tools and trials'
      },
      {
        value: '1-20',
        label: '$1 - $20/month',
        description: 'Basic subscription tier'
      },
      {
        value: '21-100',
        label: '$21 - $100/month',
        description: 'Professional tier'
      },
      {
        value: '100+',
        label: '$100+/month',
        description: 'Enterprise or heavy usage'
      }
    ]
  },
  {
    id: 'priorities',
    title: 'What factors are most important to you?',
    description: 'Select up to 3 priorities',
    type: 'multiple' as const,
    options: [
      {
        value: 'cost',
        label: 'Low Cost',
        description: 'Affordable pricing is crucial'
      },
      {
        value: 'quality',
        label: 'Output Quality',
        description: 'Best possible results'
      },
      {
        value: 'speed',
        label: 'Speed',
        description: 'Fast response times'
      },
      {
        value: 'privacy',
        label: 'Privacy & Security',
        description: 'Data protection is essential'
      },
      {
        value: 'ease',
        label: 'Ease of Use',
        description: 'Simple, intuitive interface'
      },
      {
        value: 'features',
        label: 'Advanced Features',
        description: 'Cutting-edge capabilities'
      }
    ]
  },
  {
    id: 'integration',
    title: 'How do you prefer to use AI tools?',
    description: 'Select all the ways you\'d like to access AI',
    type: 'multiple' as const,
    options: [
      {
        value: 'web',
        label: 'Web Browser',
        description: 'Use through websites'
      },
      {
        value: 'api',
        label: 'API Integration',
        description: 'Integrate into your own apps'
      },
      {
        value: 'mobile',
        label: 'Mobile Apps',
        description: 'iOS or Android apps'
      },
      {
        value: 'desktop',
        label: 'Desktop Software',
        description: 'Native desktop applications'
      }
    ]
  },
  {
    id: 'volume',
    title: 'How much will you use AI tools?',
    description: 'This helps estimate costs and find suitable plans',
    type: 'single' as const,
    options: [
      {
        value: 'light',
        label: 'Light Usage',
        description: 'A few times per week'
      },
      {
        value: 'moderate',
        label: 'Moderate Usage',
        description: 'Daily use for various tasks'
      },
      {
        value: 'heavy',
        label: 'Heavy Usage',
        description: 'Multiple hours per day'
      }
    ]
  },
  {
    id: 'requirements',
    title: 'Any special requirements?',
    description: 'Select any that apply (optional)',
    type: 'multiple' as const,
    optional: true,
    options: [
      {
        value: 'offline',
        label: 'Offline Capability',
        description: 'Must work without internet'
      },
      {
        value: 'team',
        label: 'Team Collaboration',
        description: 'Share with team members'
      },
      {
        value: 'custom',
        label: 'Custom Training',
        description: 'Train on your own data'
      },
      {
        value: 'compliance',
        label: 'Regulatory Compliance',
        description: 'GDPR, HIPAA, SOC 2, etc.'
      },
      {
        value: 'support',
        label: 'Priority Support',
        description: 'Need dedicated support'
      }
    ]
  }
];