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
  },

  // Additional AI Tools for Comprehensive Coverage
  
  // Voice & Audio AI
  {
    id: 'elevenlabs',
    vendor: 'ElevenLabs',
    name: 'ElevenLabs Voice AI',
    category: 'multimodal',
    description: 'Realistic AI voice generation and cloning',
    strengths: [
      'Ultra-realistic voices',
      'Voice cloning',
      'Multiple languages',
      'Emotion control',
      'API access'
    ],
    useCases: [
      'Audiobook creation',
      'Video narration',
      'Podcast production',
      'Voice assistants',
      'Language dubbing'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['10,000 characters/month', '3 custom voices'],
        requests: 10000
      },
      subscription: [
        {
          name: 'Starter',
          price: 5,
          unit: 'month',
          features: ['30,000 characters/month', '10 custom voices'],
          requests: 30000
        },
        {
          name: 'Creator',
          price: 22,
          unit: 'month',
          features: ['100,000 characters/month', '30 custom voices'],
          requests: 100000
        }
      ]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Voice data processing', 'GDPR compliant']
    },
    teamCollaboration: true,
    customTraining: true,
    releaseDate: '2022-01',
    popularity: 85,
    pros: [
      'Best-in-class voice quality',
      'Easy voice cloning',
      'Good API',
      'Reasonable pricing'
    ],
    cons: [
      'Limited free tier',
      'No offline mode',
      'Processing time'
    ],
    integrations: ['API', 'Zapier'],
    website: 'https://elevenlabs.io',
    documentation: 'https://docs.elevenlabs.io'
  },

  // Video AI
  {
    id: 'runway',
    vendor: 'Runway',
    name: 'Runway Gen-2',
    category: 'multimodal',
    description: 'AI-powered video generation and editing',
    strengths: [
      'Text-to-video',
      'Video editing AI',
      'Image animation',
      'Green screen',
      'Multiple AI tools'
    ],
    useCases: [
      'Video creation',
      'Film production',
      'Content creation',
      'Animation',
      'VFX'
    ],
    pricing: {
      free: {
        name: 'Basic',
        price: 0,
        features: ['125 credits', 'Limited exports'],
        requests: 125
      },
      subscription: [
        {
          name: 'Standard',
          price: 15,
          unit: 'month',
          features: ['625 credits/month', 'Upscaling'],
          requests: 625
        },
        {
          name: 'Pro',
          price: 35,
          unit: 'month',
          features: ['2250 credits/month', 'All features'],
          requests: 2250
        }
      ]
    },
    technicalRequirements: ['Modern browser', 'Good internet'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: false,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Content processing', 'Standard privacy']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-06',
    popularity: 82,
    pros: [
      'Cutting-edge video AI',
      'Multiple tools in one',
      'Regular updates',
      'Professional features'
    ],
    cons: [
      'Credit system',
      'Learning curve',
      'Can be expensive'
    ],
    integrations: ['Adobe Premiere', 'Final Cut'],
    website: 'https://runwayml.com',
    documentation: 'https://help.runwayml.com'
  },

  // Music AI
  {
    id: 'suno',
    vendor: 'Suno',
    name: 'Suno AI',
    category: 'multimodal',
    description: 'AI music generation from text prompts',
    strengths: [
      'Full song generation',
      'Lyrics creation',
      'Multiple genres',
      'Custom styles',
      'Vocal generation'
    ],
    useCases: [
      'Music production',
      'Content creation',
      'Game soundtracks',
      'Podcast intros',
      'Commercial music'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['50 credits/month', 'Non-commercial use'],
        requests: 50
      },
      subscription: [
        {
          name: 'Pro',
          price: 10,
          unit: 'month',
          features: ['2500 credits/month', 'Commercial use'],
          requests: 2500
        },
        {
          name: 'Premier',
          price: 30,
          unit: 'month',
          features: ['10000 credits/month', 'Priority generation'],
          requests: 10000
        }
      ]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Content rights', 'User generated content']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2023-12',
    popularity: 78,
    pros: [
      'Impressive quality',
      'Easy to use',
      'Full songs with vocals',
      'Many genres'
    ],
    cons: [
      'Limited control',
      'No API',
      'Credit based'
    ],
    integrations: ['Web only'],
    website: 'https://suno.ai',
    documentation: 'https://suno.ai/about'
  },

  // Research & Academic AI
  {
    id: 'semantic-scholar',
    vendor: 'Allen Institute',
    name: 'Semantic Scholar',
    category: 'text',
    description: 'AI-powered research paper discovery and analysis',
    strengths: [
      'Academic search',
      'Citation analysis',
      'Paper summaries',
      'Research trends',
      'Free access'
    ],
    useCases: [
      'Academic research',
      'Literature review',
      'Citation tracking',
      'Research discovery',
      'Paper analysis'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['Full access', 'API available'],
        requests: -1
      }
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['Academic use', 'Open access']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2015-11',
    popularity: 72,
    pros: [
      'Completely free',
      'Powerful AI features',
      'Large database',
      'API access'
    ],
    cons: [
      'Academic focus only',
      'No general purpose AI'
    ],
    integrations: ['API', 'Browser extensions'],
    website: 'https://semanticscholar.org',
    documentation: 'https://api.semanticscholar.org'
  },

  // Presentation AI
  {
    id: 'gamma',
    vendor: 'Gamma',
    name: 'Gamma',
    category: 'business',
    description: 'AI-powered presentation and document creation',
    strengths: [
      'Auto-design',
      'Content generation',
      'Multiple formats',
      'Real-time editing',
      'Analytics'
    ],
    useCases: [
      'Presentations',
      'Pitch decks',
      'Documents',
      'Websites',
      'Reports'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['400 AI credits', 'Basic features'],
        requests: 400
      },
      subscription: [{
        name: 'Plus',
        price: 10,
        unit: 'month',
        features: ['Unlimited AI', 'Advanced features', 'Analytics'],
        requests: -1
      }]
    },
    technicalRequirements: ['Modern browser'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Standard privacy', 'Cloud storage']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2022-11',
    popularity: 76,
    pros: [
      'Beautiful designs',
      'Fast creation',
      'Multiple formats',
      'Easy to use'
    ],
    cons: [
      'Limited customization',
      'No API',
      'Credit system'
    ],
    integrations: ['Export to PowerPoint', 'PDF'],
    website: 'https://gamma.app',
    documentation: 'https://help.gamma.app'
  },

  // Translation AI
  {
    id: 'deepl',
    vendor: 'DeepL',
    name: 'DeepL Translator',
    category: 'text',
    description: 'Advanced AI translation with nuanced understanding',
    strengths: [
      'Superior translation quality',
      'Context awareness',
      'Document translation',
      'API access',
      'Multiple languages'
    ],
    useCases: [
      'Document translation',
      'Business communication',
      'Academic translation',
      'Website localization',
      'Real-time translation'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['Limited translations', 'Basic features'],
        requests: 5000
      },
      subscription: [
        {
          name: 'Pro',
          price: 8.99,
          unit: 'month',
          features: ['Unlimited translation', 'Document translation', 'API'],
          requests: -1
        },
        {
          name: 'Business',
          price: 30,
          unit: 'user/month',
          features: ['Team features', 'SSO', 'Priority support'],
          requests: -1
        }
      ]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['EU servers', 'GDPR compliant', 'No training on user data']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2017-08',
    popularity: 88,
    pros: [
      'Best translation quality',
      'Fast and reliable',
      'Privacy focused',
      'Good API'
    ],
    cons: [
      'Fewer languages than Google',
      'More expensive',
      'Limited free tier'
    ],
    integrations: ['API', 'CAT tools', 'Browser extensions'],
    website: 'https://deepl.com',
    documentation: 'https://developers.deepl.com'
  },

  // 3D AI
  {
    id: 'spline-ai',
    vendor: 'Spline',
    name: 'Spline AI',
    category: 'creative',
    description: 'AI-powered 3D design and animation',
    strengths: [
      'Text to 3D',
      'AI textures',
      'Animation assistance',
      'Web-based',
      'Real-time collaboration'
    ],
    useCases: [
      '3D web design',
      'Product visualization',
      'Game assets',
      'Interactive experiences',
      'Prototyping'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['Basic features', '1 project'],
        requests: 1
      },
      subscription: [
        {
          name: 'Super',
          price: 9,
          unit: 'month',
          features: ['Unlimited projects', 'AI features'],
          requests: -1
        },
        {
          name: 'Teams',
          price: 49,
          unit: 'month',
          features: ['Team collaboration', 'Advanced features'],
          requests: -1
        }
      ]
    },
    technicalRequirements: ['Modern browser', 'WebGL support'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Cloud-based', 'Standard privacy']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-10',
    popularity: 73,
    pros: [
      'No 3D experience needed',
      'Web-based',
      'AI assistance',
      'Great for web'
    ],
    cons: [
      'Limited compared to pro tools',
      'Internet required',
      'Learning curve'
    ],
    integrations: ['Web export', 'React'],
    website: 'https://spline.design',
    documentation: 'https://docs.spline.design'
  },

  // Data Analysis AI
  {
    id: 'julius-ai',
    vendor: 'Julius',
    name: 'Julius AI',
    category: 'text',
    description: 'AI data analyst for spreadsheets and data visualization',
    strengths: [
      'Natural language queries',
      'Auto visualization',
      'Statistical analysis',
      'Code generation',
      'Multiple file formats'
    ],
    useCases: [
      'Data analysis',
      'Report generation',
      'Statistical modeling',
      'Data visualization',
      'Research'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['15 messages/month', 'Basic features'],
        requests: 15
      },
      subscription: [{
        name: 'Essential',
        price: 20,
        unit: 'month',
        features: ['250 messages/month', 'Advanced analysis'],
        requests: 250
      }]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Data processing', 'Secure storage']
    },
    teamCollaboration: false,
    customTraining: false,
    releaseDate: '2023-01',
    popularity: 71,
    pros: [
      'No coding required',
      'Powerful analysis',
      'Good visualizations',
      'Supports many formats'
    ],
    cons: [
      'Limited free tier',
      'No API',
      'Online only'
    ],
    integrations: ['CSV', 'Excel', 'Google Sheets'],
    website: 'https://julius.ai',
    documentation: 'https://julius.ai/docs'
  },
  
  // Additional comprehensive AI tools
  {
    id: 'adobe-firefly',
    vendor: 'Adobe',
    name: 'Adobe Firefly',
    category: 'image',
    description: 'AI-powered creative tools integrated into Adobe Creative Cloud',
    strengths: [
      'Professional integration with Adobe apps',
      'Commercial-safe image generation',
      'Advanced editing features',
      'Text effects and styling',
      'Generative fill and expand'
    ],
    useCases: [
      'Professional design work',
      'Marketing materials',
      'Photo editing and enhancement',
      'Brand content creation'
    ],
    pricing: {
      subscription: [{
        name: 'Creative Cloud',
        price: 54.99,
        unit: 'month',
        features: ['All Adobe apps', 'Firefly integration', '100GB storage'],
        tokens: 1000
      }]
    },
    technicalRequirements: ['Adobe Creative Cloud subscription'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: false,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Commercial-safe content', 'Enterprise options available']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2023-03',
    popularity: 85,
    pros: [
      'Adobe ecosystem integration',
      'Commercial use safe',
      'Professional features',
      'Regular updates'
    ],
    cons: [
      'Expensive subscription',
      'Requires Creative Cloud',
      'Learning curve'
    ],
    integrations: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Express'],
    website: 'https://www.adobe.com/products/firefly.html',
    documentation: 'https://helpx.adobe.com/firefly/get-started.html'
  },
  {
    id: 'leonardo-ai',
    vendor: 'Leonardo.ai',
    name: 'Leonardo AI',
    category: 'image',
    description: 'AI art generation platform with fine-tuned models for game assets and concept art',
    strengths: [
      'Game asset generation',
      'Fine-tuned style models',
      'Consistent character generation',
      'High-quality outputs',
      'Canvas editor'
    ],
    useCases: [
      'Game development assets',
      'Concept art creation',
      'Character design',
      'Marketing visuals'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['150 tokens daily', 'Public images'],
        tokens: 150
      },
      subscription: [{
        name: 'Apprentice',
        price: 10,
        unit: 'month',
        features: ['8,500 tokens monthly', 'Private generation'],
        tokens: 8500
      }]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: true,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['User data stored', 'Private generation available']
    },
    teamCollaboration: false,
    customTraining: true,
    releaseDate: '2022-12',
    popularity: 75,
    pros: [
      'Great for game art',
      'Custom models',
      'Good quality',
      'Affordable'
    ],
    cons: [
      'Token system',
      'No mobile app',
      'Limited collaboration'
    ],
    integrations: ['API'],
    website: 'https://leonardo.ai',
    documentation: 'https://docs.leonardo.ai'
  },
  {
    id: 'airtable-ai',
    vendor: 'Airtable',
    name: 'Airtable AI',
    category: 'business',
    description: 'AI-powered database and workflow automation platform',
    strengths: [
      'Database with AI features',
      'Workflow automation',
      'Team collaboration',
      'Custom apps',
      'Integration ecosystem'
    ],
    useCases: [
      'Project management',
      'Content calendars',
      'CRM systems',
      'Inventory tracking',
      'Workflow automation'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['Up to 5 creators', '1,000 records per base'],
        requests: 1000
      },
      subscription: [{
        name: 'Team',
        price: 20,
        unit: 'month',
        features: ['50,000 records', 'Advanced features'],
        tokens: 50000
      }]
    },
    technicalRequirements: ['Internet connection'],
    userInterfaceComplexity: 'moderate',
    apiAvailable: true,
    mobileApp: true,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'high',
      details: ['SOC 2 certified', 'GDPR compliant']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2020-09',
    popularity: 80,
    pros: [
      'Flexible database',
      'Great integrations',
      'Team features',
      'Mobile apps'
    ],
    cons: [
      'Learning curve',
      'Can get expensive',
      'Performance at scale'
    ],
    integrations: ['Zapier', 'Slack', 'Google Workspace'],
    website: 'https://airtable.com',
    documentation: 'https://airtable.com/developers'
  },
  {
    id: 'descript',
    vendor: 'Descript',
    name: 'Descript',
    category: 'multimodal',
    description: 'AI-powered audio and video editing platform with transcription',
    strengths: [
      'Edit video by editing text',
      'AI voice cloning',
      'Automatic transcription',
      'Podcast editing',
      'Screen recording'
    ],
    useCases: [
      'Podcast production',
      'Video editing',
      'Content creation',
      'Meeting recordings',
      'Educational content'
    ],
    pricing: {
      free: {
        name: 'Free',
        price: 0,
        features: ['3 hours transcription', 'Basic editing'],
        requests: 3
      },
      subscription: [{
        name: 'Creator',
        price: 12,
        unit: 'month',
        features: ['10 hours/month', 'AI features'],
        tokens: 10
      }]
    },
    technicalRequirements: ['Desktop app', 'Internet connection'],
    userInterfaceComplexity: 'simple',
    apiAvailable: false,
    mobileApp: false,
    offlineCapabilities: false,
    dataPrivacy: {
      level: 'medium',
      details: ['Content processed for AI features']
    },
    teamCollaboration: true,
    customTraining: false,
    releaseDate: '2019-12',
    popularity: 70,
    pros: [
      'Revolutionary editing',
      'Great for podcasts',
      'Easy to use',
      'Good AI features'
    ],
    cons: [
      'Desktop only',
      'Processing time',
      'Limited free tier'
    ],
    integrations: ['YouTube', 'Podcast platforms'],
    website: 'https://www.descript.com',
    documentation: 'https://help.descript.com'
  }
];