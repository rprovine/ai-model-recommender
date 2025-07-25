export const comprehensiveQuestions = [
  // All basic questions first
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
  
  // Industry-specific question
  {
    id: 'industry',
    title: 'What industry do you work in?',
    description: 'This helps us recommend tools with relevant features and compliance',
    type: 'single' as const,
    options: [
      {
        value: 'tech',
        label: 'Technology & Software',
        description: 'Software development, IT, tech startups'
      },
      {
        value: 'healthcare',
        label: 'Healthcare & Medical',
        description: 'Hospitals, clinics, medical research, pharma'
      },
      {
        value: 'finance',
        label: 'Finance & Banking',
        description: 'Banks, insurance, fintech, accounting'
      },
      {
        value: 'education-industry',
        label: 'Education',
        description: 'Schools, universities, e-learning, training'
      },
      {
        value: 'marketing',
        label: 'Marketing & Advertising',
        description: 'Digital marketing, agencies, content creation'
      },
      {
        value: 'legal',
        label: 'Legal',
        description: 'Law firms, legal departments, compliance'
      },
      {
        value: 'retail',
        label: 'Retail & E-commerce',
        description: 'Online stores, physical retail, marketplaces'
      },
      {
        value: 'other',
        label: 'Other',
        description: 'Different industry or personal use'
      }
    ]
  },

  // Specific content types for writers
  {
    id: 'contentTypes',
    title: 'What types of content will you create?',
    description: 'Select all that apply',
    type: 'multiple' as const,
    conditional: {
      field: 'useCase',
      includes: ['writing']
    },
    options: [
      {
        value: 'blog-posts',
        label: 'Blog Posts & Articles',
        description: 'Long-form content, SEO articles'
      },
      {
        value: 'social-media',
        label: 'Social Media Content',
        description: 'Posts, captions, threads'
      },
      {
        value: 'marketing-copy',
        label: 'Marketing Copy',
        description: 'Ad copy, landing pages, email campaigns'
      },
      {
        value: 'technical-docs',
        label: 'Technical Documentation',
        description: 'User manuals, API docs, guides'
      },
      {
        value: 'creative-writing',
        label: 'Creative Writing',
        description: 'Stories, scripts, novels'
      },
      {
        value: 'academic',
        label: 'Academic Writing',
        description: 'Research papers, essays, reports'
      }
    ]
  },

  // Programming languages for developers
  {
    id: 'programmingLanguages',
    title: 'Which programming languages do you use?',
    description: 'Select all that apply',
    type: 'multiple' as const,
    conditional: {
      field: 'useCase',
      includes: ['coding']
    },
    options: [
      {
        value: 'javascript',
        label: 'JavaScript/TypeScript',
        description: 'Web development, Node.js'
      },
      {
        value: 'python',
        label: 'Python',
        description: 'Data science, AI/ML, backend'
      },
      {
        value: 'java',
        label: 'Java/Kotlin',
        description: 'Enterprise, Android'
      },
      {
        value: 'csharp',
        label: 'C#/.NET',
        description: 'Microsoft ecosystem'
      },
      {
        value: 'go',
        label: 'Go',
        description: 'Cloud, microservices'
      },
      {
        value: 'rust',
        label: 'Rust',
        description: 'Systems programming'
      },
      {
        value: 'swift',
        label: 'Swift',
        description: 'iOS development'
      },
      {
        value: 'other-lang',
        label: 'Other',
        description: 'PHP, Ruby, C++, etc.'
      }
    ]
  },

  // Team size
  {
    id: 'teamSize',
    title: 'How many people will use this AI tool?',
    description: 'This helps with collaboration features and pricing',
    type: 'single' as const,
    options: [
      {
        value: 'individual',
        label: 'Just me',
        description: 'Personal use only'
      },
      {
        value: 'small-team',
        label: '2-5 people',
        description: 'Small team or department'
      },
      {
        value: 'medium-team',
        label: '6-20 people',
        description: 'Medium-sized team'
      },
      {
        value: 'large-team',
        label: '20+ people',
        description: 'Large team or organization'
      }
    ]
  },

  // Current tools
  {
    id: 'currentTools',
    title: 'Are you currently using any AI tools?',
    description: 'This helps us recommend complementary or replacement options',
    type: 'multiple' as const,
    options: [
      {
        value: 'chatgpt',
        label: 'ChatGPT',
        description: 'OpenAI\'s chatbot'
      },
      {
        value: 'github-copilot',
        label: 'GitHub Copilot',
        description: 'AI coding assistant'
      },
      {
        value: 'midjourney',
        label: 'Midjourney',
        description: 'AI image generation'
      },
      {
        value: 'grammarly',
        label: 'Grammarly',
        description: 'Writing assistant'
      },
      {
        value: 'notion-ai',
        label: 'Notion AI',
        description: 'Workspace AI'
      },
      {
        value: 'other-tools',
        label: 'Other tools',
        description: 'Different AI tools'
      },
      {
        value: 'none',
        label: 'None yet',
        description: 'New to AI tools'
      }
    ]
  },

  // Workflow integration
  {
    id: 'workflowIntegration',
    title: 'How should the AI integrate with your workflow?',
    description: 'Select your preferred integration methods',
    type: 'multiple' as const,
    options: [
      {
        value: 'standalone',
        label: 'Standalone tool',
        description: 'Separate app or website'
      },
      {
        value: 'browser-extension',
        label: 'Browser extension',
        description: 'Works within your browser'
      },
      {
        value: 'ide-plugin',
        label: 'IDE/Editor plugin',
        description: 'VS Code, IntelliJ, etc.'
      },
      {
        value: 'api-integration',
        label: 'API integration',
        description: 'Custom integration with your apps'
      },
      {
        value: 'slack-teams',
        label: 'Slack/Teams integration',
        description: 'Chat platform integration'
      },
      {
        value: 'zapier',
        label: 'Zapier/Make automation',
        description: 'No-code automation'
      }
    ]
  },

  // Output format preferences
  {
    id: 'outputFormats',
    title: 'What output formats do you need?',
    description: 'Select all required formats',
    type: 'multiple' as const,
    options: [
      {
        value: 'plain-text',
        label: 'Plain text',
        description: 'Simple text output'
      },
      {
        value: 'markdown',
        label: 'Markdown',
        description: 'Formatted text with structure'
      },
      {
        value: 'code',
        label: 'Code files',
        description: 'Source code in various languages'
      },
      {
        value: 'images',
        label: 'Images',
        description: 'PNG, JPEG, etc.'
      },
      {
        value: 'documents',
        label: 'Documents',
        description: 'PDF, Word, Google Docs'
      },
      {
        value: 'spreadsheets',
        label: 'Spreadsheets',
        description: 'Excel, CSV, Google Sheets'
      },
      {
        value: 'api-json',
        label: 'API/JSON',
        description: 'Structured data for integration'
      }
    ]
  },

  // Language requirements
  {
    id: 'languages',
    title: 'What languages do you need support for?',
    description: 'Select all languages you\'ll use',
    type: 'multiple' as const,
    options: [
      {
        value: 'english',
        label: 'English',
        description: 'Primary language'
      },
      {
        value: 'spanish',
        label: 'Spanish',
        description: 'Español'
      },
      {
        value: 'french',
        label: 'French',
        description: 'Français'
      },
      {
        value: 'german',
        label: 'German',
        description: 'Deutsch'
      },
      {
        value: 'chinese',
        label: 'Chinese',
        description: '中文'
      },
      {
        value: 'japanese',
        label: 'Japanese',
        description: '日本語'
      },
      {
        value: 'other-languages',
        label: 'Other languages',
        description: 'Additional language support needed'
      }
    ]
  },

  // Data sensitivity
  {
    id: 'dataSensitivity',
    title: 'How sensitive is your data?',
    description: 'This affects privacy and security recommendations',
    type: 'single' as const,
    options: [
      {
        value: 'public',
        label: 'Public/Non-sensitive',
        description: 'Marketing content, public information'
      },
      {
        value: 'internal',
        label: 'Internal business data',
        description: 'Company documents, strategies'
      },
      {
        value: 'confidential',
        label: 'Confidential',
        description: 'Client data, financial information'
      },
      {
        value: 'regulated',
        label: 'Highly regulated',
        description: 'Healthcare, legal, government data'
      }
    ]
  },

  // Performance expectations
  {
    id: 'performanceNeeds',
    title: 'What are your performance requirements?',
    description: 'Speed vs quality trade-offs',
    type: 'single' as const,
    options: [
      {
        value: 'fastest',
        label: 'Speed is critical',
        description: 'Need instant responses, okay with lower quality'
      },
      {
        value: 'balanced',
        label: 'Balanced',
        description: 'Good speed with good quality'
      },
      {
        value: 'quality',
        label: 'Quality first',
        description: 'Best possible output, speed is secondary'
      },
      {
        value: 'batch',
        label: 'Batch processing',
        description: 'Can wait for results, need to process many items'
      }
    ]
  },

  // Customization needs
  {
    id: 'customization',
    title: 'Do you need to customize the AI\'s behavior?',
    description: 'Training on your data or specific instructions',
    type: 'single' as const,
    options: [
      {
        value: 'none',
        label: 'No customization needed',
        description: 'Default behavior is fine'
      },
      {
        value: 'prompts',
        label: 'Custom prompts/instructions',
        description: 'Ability to save and reuse prompts'
      },
      {
        value: 'fine-tuning',
        label: 'Fine-tuning on our data',
        description: 'Train on specific examples'
      },
      {
        value: 'full-custom',
        label: 'Full customization',
        description: 'Complete control over model behavior'
      }
    ]
  },

  // Support requirements
  {
    id: 'supportLevel',
    title: 'What level of support do you need?',
    description: 'Technical support and documentation',
    type: 'single' as const,
    options: [
      {
        value: 'community',
        label: 'Community support',
        description: 'Forums, Discord, community help'
      },
      {
        value: 'standard',
        label: 'Standard support',
        description: 'Email support, documentation'
      },
      {
        value: 'priority',
        label: 'Priority support',
        description: 'Fast response times, dedicated contact'
      },
      {
        value: 'enterprise',
        label: 'Enterprise support',
        description: 'SLA, dedicated account manager'
      }
    ]
  },

  // All the original required questions
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
    maxSelections: 3,
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