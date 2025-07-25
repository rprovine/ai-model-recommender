import type { AIModel } from '@/types';

export const aiModels: AIModel[] = [
  // OpenAI Models
  {
    id: 'gpt-4-turbo',
    vendor: 'OpenAI',
    name: 'GPT-4 Turbo',
    category: 'text',
    description: 'Most capable OpenAI model with 128K context window, optimized for performance and cost',
    strengths: [
      'Superior reasoning and analysis',
      'Large context window (128K tokens)',
      'Vision capabilities',
      'Function calling',
      'JSON mode'
    ],
    useCases: [
      'Complex problem solving',
      'Code generation and debugging',
      'Advanced data analysis',
      'Creative writing',
      'Image understanding'
    ],
    pricing: {
      subscription: [{
        name: 'ChatGPT Plus',
        price: 20,
        unit: 'month',
        features: ['GPT-4 access', '40 messages/3 hours', 'DALL-E 3', 'Advanced Data Analysis'],
        tokens: 50000
      }],
      api: {
        inputCost: 0.01,
        outputCost: 0.03,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['Internet connection', 'API key for programmatic access'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Data used for model improvement unless opted out', 'Enterprise options available']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-11',
    popularity: 95,
    pros: [
      'Industry-leading performance',
      'Extensive ecosystem',
      'Regular updates',
      'Strong developer support'
    ],
    cons: [
      'Can be expensive for heavy use',
      'Rate limits on API',
      'No offline access'
    ],
    integrations: ['Microsoft products', 'Zapier', 'Make', 'Thousands of apps'],
    website: 'https://openai.com',
    documentation: 'https://platform.openai.com/docs'
  },
  {
    id: 'gpt-3.5-turbo',
    vendor: 'OpenAI',
    name: 'GPT-3.5 Turbo',
    category: 'text',
    description: 'Fast and cost-effective model for most tasks',
    strengths: [
      'Very fast response times',
      'Cost-effective',
      'Good for most tasks',
      '16K context window'
    ],
    useCases: [
      'Customer support',
      'Content generation',
      'Simple coding tasks',
      'Language translation',
      'Summarization'
    ],
    pricing: {
      free: {
        name: 'ChatGPT Free',
        price: 0,
        features: ['Limited GPT-3.5 access', 'Basic features'],
        requests: 100
      },
      api: {
        inputCost: 0.0005,
        outputCost: 0.0015,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Standard OpenAI privacy policy applies']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2023-03',
    popularity: 90,
    pros: [
      'Very affordable',
      'Fast responses',
      'Reliable performance',
      'Wide availability'
    ],
    cons: [
      'Less capable than GPT-4',
      'Smaller context window',
      'No vision capabilities'
    ],
    integrations: ['Same as GPT-4'],
    website: 'https://openai.com',
    documentation: 'https://platform.openai.com/docs'
  },

  // Anthropic Models
  {
    id: 'claude-4',
    vendor: 'Anthropic',
    name: 'Claude 4 (Opus)',
    category: 'text',
    description: 'Most capable Claude model with exceptional reasoning and safety',
    strengths: [
      'Exceptional reasoning abilities',
      'Strong coding capabilities',
      'Excellent at following instructions',
      'More nuanced responses',
      '200K context window'
    ],
    useCases: [
      'Complex analysis and research',
      'Software development',
      'Academic writing',
      'Legal document analysis',
      'Creative projects'
    ],
    pricing: {
      subscription: [{
        name: 'Claude Pro',
        price: 20,
        unit: 'month',
        features: ['5x more usage', 'Priority access', 'Early access to new features'],
        tokens: 100000
      }],
      api: {
        inputCost: 0.015,
        outputCost: 0.075,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['No training on user data', 'Strong privacy commitments', 'Constitutional AI approach']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2024-03',
    popularity: 85,
    pros: [
      'Excellent safety and reliability',
      'Very large context window',
      'Strong at complex reasoning',
      'Better at refusing harmful requests'
    ],
    cons: [
      'More expensive than competitors',
      'No official mobile app',
      'Smaller ecosystem'
    ],
    integrations: ['API integrations', 'Some third-party tools'],
    website: 'https://claude.ai',
    documentation: 'https://docs.anthropic.com'
  },
  {
    id: 'claude-3.5-sonnet',
    vendor: 'Anthropic',
    name: 'Claude 3.5 Sonnet',
    category: 'text',
    description: 'Balanced Claude model offering great performance at lower cost',
    strengths: [
      'Excellent balance of capability and cost',
      'Strong coding abilities',
      'Good instruction following',
      '200K context window'
    ],
    useCases: [
      'General purpose assistance',
      'Code generation',
      'Content creation',
      'Data analysis',
      'Customer support'
    ],
    pricing: {
      free: {
        name: 'Claude.ai Free',
        price: 0,
        features: ['Limited daily messages', 'Access to Claude 3.5'],
        requests: 30
      },
      api: {
        inputCost: 0.003,
        outputCost: 0.015,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['Same as Claude 3 Opus']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2024-06',
    popularity: 88,
    pros: [
      'Great value for performance',
      'Large context window',
      'Strong safety features',
      'Rapid improvements'
    ],
    cons: [
      'Limited ecosystem',
      'No mobile app',
      'Fewer integrations than OpenAI'
    ],
    integrations: ['Growing third-party support'],
    website: 'https://claude.ai',
    documentation: 'https://docs.anthropic.com'
  },

  // Google Models
  {
    id: 'gemini-pro',
    vendor: 'Google',
    name: 'Gemini Pro',
    category: 'multimodal',
    description: 'Google\'s flagship AI model with multimodal capabilities',
    strengths: [
      'Native multimodal understanding',
      'Integration with Google services',
      'Large context window (1M tokens)',
      'Fast processing',
      'Available in free tier'
    ],
    useCases: [
      'Document analysis',
      'Image understanding',
      'Google Workspace integration',
      'Research and analysis',
      'Multilingual tasks'
    ],
    pricing: {
      free: {
        name: 'Gemini Free',
        price: 0,
        features: ['Access to Gemini Pro', 'Limited usage', 'Google integration'],
        requests: 60
      },
      subscription: [{
        name: 'Gemini Advanced',
        price: 19.99,
        unit: 'month',
        features: ['Gemini Ultra access', 'Priority access', '2TB storage', 'Google One benefits'],
        tokens: 150000
      }],
      api: {
        inputCost: 0.00025,
        outputCost: 0.00125,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['Google account', 'Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Google privacy policy applies', 'Data may be used for improvement']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-12',
    popularity: 80,
    pros: [
      'Excellent Google integration',
      'Very large context window',
      'Multimodal from the ground up',
      'Competitive pricing'
    ],
    cons: [
      'Newer model with less track record',
      'Can be inconsistent',
      'Privacy concerns for some users'
    ],
    integrations: ['Google Workspace', 'Android', 'Google Cloud'],
    website: 'https://gemini.google.com',
    documentation: 'https://ai.google.dev'
  },

  // Meta Models
  {
    id: 'llama-3',
    vendor: 'Meta',
    name: 'Llama 3',
    category: 'text',
    description: 'Open-source model available for self-hosting and customization',
    strengths: [
      'Completely open source',
      'Can run locally',
      'Customizable',
      'No usage limits when self-hosted',
      'Strong performance'
    ],
    useCases: [
      'Self-hosted applications',
      'Privacy-sensitive tasks',
      'Custom fine-tuning',
      'Research projects',
      'Offline applications'
    ],
    pricing: {
      free: {
        name: 'Open Source',
        price: 0,
        features: ['Full model access', 'Commercial use allowed', 'Self-hosting required'],
        requests: -1
      }
    },
    technicalRequirements: ['Significant GPU resources for self-hosting', 'Technical expertise'],
    userInterfaceComplexity: 'complex',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: true,
    dataPrivacy: {
      level: 'high',
      details: ['Complete control over data', 'No data leaves your infrastructure']
    },
    teamCollaboration: false,
    customTraining: true,
    releaseDate: '2024-04',
    popularity: 75,
    pros: [
      'Free to use',
      'Complete privacy control',
      'Can be fine-tuned',
      'Run offline'
    ],
    cons: [
      'Requires technical setup',
      'Hardware costs',
      'No official support',
      'Complex deployment'
    ],
    integrations: ['Various open-source tools', 'Custom integrations'],
    website: 'https://llama.meta.com',
    documentation: 'https://github.com/meta-llama'
  },

  // Image Generation Models
  {
    id: 'dall-e-3',
    vendor: 'OpenAI',
    name: 'DALL-E 3',
    category: 'image',
    description: 'Advanced image generation with excellent prompt understanding',
    strengths: [
      'Excellent prompt adherence',
      'High quality outputs',
      'Integrated with ChatGPT',
      'Good at text in images',
      'Safety features'
    ],
    useCases: [
      'Marketing materials',
      'Concept art',
      'Illustrations',
      'Product mockups',
      'Creative projects'
    ],
    pricing: {
      subscription: [{
        name: 'ChatGPT Plus',
        price: 20,
        unit: 'month',
        features: ['Included with ChatGPT Plus', '40 images per month'],
        requests: 40
      }],
      api: {
        inputCost: 0.04,
        outputCost: 0,
        unit: 'image (1024x1024)'
      }
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['OpenAI policies apply', 'Images may be reviewed']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2023-10',
    popularity: 85,
    pros: [
      'Easy to use',
      'Great prompt understanding',
      'High quality',
      'Fast generation'
    ],
    cons: [
      'Limited style control',
      'No image editing',
      'Strict content policies'
    ],
    integrations: ['ChatGPT', 'API access'],
    website: 'https://openai.com/dall-e-3',
    documentation: 'https://platform.openai.com/docs/guides/images'
  },
  {
    id: 'midjourney',
    vendor: 'Midjourney',
    name: 'Midjourney V6',
    category: 'image',
    description: 'Artistic image generation with unique aesthetic styles',
    strengths: [
      'Exceptional artistic quality',
      'Unique aesthetic',
      'Great community',
      'Regular updates',
      'Style consistency'
    ],
    useCases: [
      'Digital art',
      'Concept design',
      'Book illustrations',
      'Game assets',
      'Artistic exploration'
    ],
    pricing: {
      subscription: [
        {
          name: 'Basic',
          price: 10,
          unit: 'month',
          features: ['200 generations/month', 'General commercial use'],
          requests: 200
        },
        {
          name: 'Standard',
          price: 30,
          unit: 'month',
          features: ['15 hours fast time', 'Unlimited relaxed', 'General commercial use'],
          requests: 900
        },
        {
          name: 'Pro',
          price: 60,
          unit: 'month',
          features: ['30 hours fast time', 'Unlimited relaxed', 'Stealth mode'],
          requests: 1800
        }
      ]
    },
    technicalRequirements: ['Discord account', 'Internet connection'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'low',
      details: ['Public by default', 'Stealth mode in Pro plan', 'Community visible']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2024-01',
    popularity: 90,
    pros: [
      'Stunning artistic quality',
      'Active community',
      'Constant improvements',
      'Unique style'
    ],
    cons: [
      'Discord-only interface',
      'No API',
      'Public by default',
      'Learning curve'
    ],
    integrations: ['Discord only'],
    website: 'https://midjourney.com',
    documentation: 'https://docs.midjourney.com'
  },
  {
    id: 'stable-diffusion',
    vendor: 'Stability AI',
    name: 'Stable Diffusion XL',
    category: 'image',
    description: 'Open-source image generation model with full control',
    strengths: [
      'Open source',
      'Can run locally',
      'Highly customizable',
      'No censorship',
      'Fine-tuning possible'
    ],
    useCases: [
      'Custom applications',
      'Batch processing',
      'NSFW content',
      'Research',
      'Commercial products'
    ],
    pricing: {
      free: {
        name: 'Open Source',
        price: 0,
        features: ['Full model access', 'Unlimited use', 'Requires own hardware'],
        requests: -1
      },
      subscription: [{
        name: 'DreamStudio',
        price: 10,
        unit: 'month credits',
        features: ['Cloud hosted', 'No setup required', 'Pay per generation'],
        requests: 1000
      }]
    },
    technicalRequirements: ['GPU with 8GB+ VRAM for local', 'Technical knowledge'],
    userInterfaceComplexity: 'complex',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: true,
    dataPrivacy: {
      level: 'high',
      details: ['Complete control when self-hosted', 'No data sharing']
    },
    teamCollaboration: false,
    customTraining: true,
    releaseDate: '2023-07',
    popularity: 80,
    pros: [
      'Free and open source',
      'Complete control',
      'Can run offline',
      'Highly customizable'
    ],
    cons: [
      'Requires technical knowledge',
      'Hardware requirements',
      'Quality varies',
      'No official support'
    ],
    integrations: ['ComfyUI', 'Automatic1111', 'Various tools'],
    website: 'https://stability.ai',
    documentation: 'https://huggingface.co/stabilityai'
  },

  // Code-Specific Models
  {
    id: 'github-copilot',
    vendor: 'GitHub (Microsoft)',
    name: 'GitHub Copilot',
    category: 'code',
    description: 'AI pair programmer integrated into your IDE',
    strengths: [
      'IDE integration',
      'Context-aware suggestions',
      'Multi-language support',
      'Code completion',
      'Test generation'
    ],
    useCases: [
      'Code completion',
      'Bug fixing',
      'Test writing',
      'Documentation',
      'Learning new languages'
    ],
    pricing: {
      subscription: [
        {
          name: 'Individual',
          price: 10,
          unit: 'month',
          features: ['Unlimited suggestions', 'All IDEs', 'Chat features'],
          requests: -1
        },
        {
          name: 'Business',
          price: 19,
          unit: 'user/month',
          features: ['Everything in Individual', 'Organization management', 'Policy controls'],
          requests: -1
        }
      ]
    },
    technicalRequirements: ['Supported IDE', 'Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Code snippets sent to cloud', 'Enterprise privacy options']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2021-06',
    popularity: 92,
    pros: [
      'Seamless IDE integration',
      'Constantly learning',
      'Great for boilerplate',
      'Time-saving'
    ],
    cons: [
      'Can suggest incorrect code',
      'Privacy concerns',
      'Subscription only',
      'Internet required'
    ],
    integrations: ['VS Code', 'JetBrains', 'Neovim', 'Visual Studio'],
    website: 'https://github.com/features/copilot',
    documentation: 'https://docs.github.com/copilot'
  },
  {
    id: 'cursor',
    vendor: 'Cursor',
    name: 'Cursor',
    category: 'code',
    description: 'AI-first code editor built for pair programming with AI',
    strengths: [
      'Built-in AI chat',
      'Codebase understanding',
      'Multi-file editing',
      'Custom AI models',
      'Privacy options'
    ],
    useCases: [
      'Full-stack development',
      'Code refactoring',
      'Bug fixing',
      'Code reviews',
      'Learning'
    ],
    pricing: {
      free: {
        name: 'Hobby',
        price: 0,
        features: ['200 AI completions/month', 'Basic features'],
        requests: 200
      },
      subscription: [
        {
          name: 'Pro',
          price: 20,
          unit: 'month',
          features: ['Unlimited AI usage', 'GPT-4 access', 'Advanced features'],
          requests: -1
        },
        {
          name: 'Business',
          price: 40,
          unit: 'user/month',
          features: ['Everything in Pro', 'Team features', 'Priority support'],
          requests: -1
        }
      ]
    },
    technicalRequirements: ['Modern computer', 'Internet connection'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['Privacy mode available', 'Can use own API keys', 'Local indexing']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-03',
    popularity: 78,
    pros: [
      'Purpose-built for AI',
      'Great UI/UX',
      'Privacy options',
      'Fast and responsive'
    ],
    cons: [
      'Another editor to learn',
      'Smaller ecosystem',
      'Relatively new',
      'Limited extensions'
    ],
    integrations: ['Built-in AI models', 'Custom API support'],
    website: 'https://cursor.sh',
    documentation: 'https://docs.cursor.sh'
  },

  // Business/Enterprise Models
  {
    id: 'microsoft-copilot',
    vendor: 'Microsoft',
    name: 'Microsoft 365 Copilot',
    category: 'business',
    description: 'AI assistant integrated across Microsoft Office suite',
    strengths: [
      'Deep Office integration',
      'Enterprise security',
      'Cross-app intelligence',
      'Meeting summaries',
      'Document generation'
    ],
    useCases: [
      'Email drafting',
      'Document creation',
      'Data analysis in Excel',
      'PowerPoint generation',
      'Meeting notes'
    ],
    pricing: {
      subscription: [{
        name: 'Microsoft 365 Copilot',
        price: 30,
        unit: 'user/month',
        features: ['All Office apps', 'Enterprise security', 'Admin controls'],
        requests: -1
      }]
    },
    technicalRequirements: ['Microsoft 365 subscription', 'Compatible Office versions'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['Enterprise-grade security', 'Data stays in tenant', 'Compliance features']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-11',
    popularity: 82,
    pros: [
      'Seamless Office integration',
      'Enterprise ready',
      'Familiar interface',
      'Productivity boost'
    ],
    cons: [
      'Expensive',
      'Requires M365',
      'Limited customization',
      'Corporate only'
    ],
    integrations: ['All Microsoft 365 apps', 'Teams', 'SharePoint'],
    website: 'https://www.microsoft.com/microsoft-365/copilot',
    documentation: 'https://learn.microsoft.com/copilot'
  },
  {
    id: 'notion-ai',
    vendor: 'Notion',
    name: 'Notion AI',
    category: 'business',
    description: 'AI writing and productivity assistant built into Notion',
    strengths: [
      'Native Notion integration',
      'Document enhancement',
      'Summary generation',
      'Translation',
      'Brainstorming'
    ],
    useCases: [
      'Note-taking enhancement',
      'Meeting summaries',
      'Content generation',
      'Knowledge base Q&A',
      'Project planning'
    ],
    pricing: {
      subscription: [{
        name: 'Add-on',
        price: 10,
        unit: 'member/month',
        features: ['Unlimited AI usage', 'All Notion features', 'Priority support'],
        requests: -1
      }]
    },
    technicalRequirements: ['Notion account', 'Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Notion privacy policy applies', 'Data used for AI features']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-02',
    popularity: 75,
    pros: [
      'Perfect Notion integration',
      'Easy to use',
      'Good value',
      'Collaborative'
    ],
    cons: [
      'Notion-only',
      'Limited AI capabilities',
      'Additional cost',
      'Basic compared to others'
    ],
    integrations: ['Notion ecosystem only'],
    website: 'https://notion.so/product/ai',
    documentation: 'https://notion.so/help/notion-ai'
  },

  // Additional Models
  {
    id: 'perplexity',
    vendor: 'Perplexity',
    name: 'Perplexity AI',
    category: 'text',
    description: 'AI-powered search engine with real-time information',
    strengths: [
      'Real-time web search',
      'Source citations',
      'Up-to-date information',
      'Research focused',
      'Multiple AI models'
    ],
    useCases: [
      'Research',
      'Fact-checking',
      'Current events',
      'Academic work',
      'Market analysis'
    ],
    pricing: {
      free: {
        name: 'Basic',
        price: 0,
        features: ['Limited searches', 'Basic models'],
        requests: 100
      },
      subscription: [{
        name: 'Pro',
        price: 20,
        unit: 'month',
        features: ['Unlimited Pro searches', 'GPT-4 access', 'Claude access', 'File upload'],
        requests: -1
      }]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Standard privacy policy', 'Search history saved']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2022-12',
    popularity: 77,
    pros: [
      'Always current info',
      'Great for research',
      'Source transparency',
      'Multiple AI models'
    ],
    cons: [
      'Limited creative tasks',
      'Search-focused',
      'Smaller context window',
      'Less conversational'
    ],
    integrations: ['API access', 'Chrome extension'],
    website: 'https://perplexity.ai',
    documentation: 'https://docs.perplexity.ai'
  },
  {
    id: 'mistral-large',
    vendor: 'Mistral AI',
    name: 'Mistral Large',
    category: 'text',
    description: 'European AI model with strong multilingual capabilities',
    strengths: [
      'Excellent multilingual support',
      'Good reasoning',
      'Competitive pricing',
      'European data privacy',
      'Function calling'
    ],
    useCases: [
      'Multilingual tasks',
      'European compliance needs',
      'General assistance',
      'Code generation',
      'Analysis'
    ],
    pricing: {
      api: {
        inputCost: 0.004,
        outputCost: 0.012,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['API access', 'Internet connection'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['European data protection', 'GDPR compliant', 'Data stays in EU']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2024-02',
    popularity: 70,
    pros: [
      'Strong European option',
      'Good multilingual',
      'Competitive pricing',
      'Privacy focused'
    ],
    cons: [
      'Smaller ecosystem',
      'Less established',
      'Limited interfaces',
      'Fewer features'
    ],
    integrations: ['API-based integrations'],
    website: 'https://mistral.ai',
    documentation: 'https://docs.mistral.ai'
  },
  {
    id: 'cohere-command',
    vendor: 'Cohere',
    name: 'Command R+',
    category: 'text',
    description: 'Enterprise-focused model with RAG capabilities',
    strengths: [
      'Excellent RAG support',
      'Enterprise features',
      'Multilingual',
      'Customizable',
      'Good pricing'
    ],
    useCases: [
      'Enterprise search',
      'Customer support',
      'Content generation',
      'Data analysis',
      'Chatbots'
    ],
    pricing: {
      api: {
        inputCost: 0.0003,
        outputCost: 0.0015,
        unit: '1K tokens'
      }
    },
    technicalRequirements: ['API access', 'Internet connection'],
    userInterfaceComplexity: 'complex',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['Enterprise privacy options', 'On-premise available', 'SOC 2 compliant']
    },
    teamCollaboration: true,
    customTraining: true,
    releaseDate: '2024-03',
    popularity: 68,
    pros: [
      'Great for RAG',
      'Enterprise ready',
      'Good pricing',
      'Customizable'
    ],
    cons: [
      'Developer focused',
      'No consumer UI',
      'Smaller community',
      'Complex setup'
    ],
    integrations: ['Enterprise tools', 'Custom integrations'],
    website: 'https://cohere.com',
    documentation: 'https://docs.cohere.com'
  }
];