# Contributing to AI Model Recommender

Thank you for your interest in contributing to AI Model Recommender! This document provides guidelines for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive criticism
- Accept feedback gracefully

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/rprovine/ai-model-recommender.git
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment example:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Making Changes

### Adding New AI Models

To add a new AI model to the database:

1. Edit `src/data/models.ts`
2. Follow the existing `AIModel` interface structure
3. Include all required fields:
   - Basic info (id, vendor, name, category, description)
   - Strengths and use cases
   - Pricing information
   - Technical requirements
   - Privacy details

Example:
```typescript
{
  id: 'new-model-id',
  vendor: 'Company Name',
  name: 'Model Name',
  category: 'text', // or 'image', 'code', 'business', 'multimodal'
  description: 'Brief description',
  strengths: ['Strength 1', 'Strength 2'],
  useCases: ['Use case 1', 'Use case 2'],
  pricing: {
    free: {
      name: 'Free Tier',
      price: 0,
      features: ['Feature 1'],
      requests: 100
    },
    subscription: [{
      name: 'Pro',
      price: 20,
      unit: 'month',
      features: ['All features'],
      tokens: 100000
    }]
  },
  // ... other required fields
}
```

### Updating Scoring Logic

To modify the recommendation algorithm:

1. Edit `src/utils/recommendation-engine.ts`
2. Adjust scoring weights in the respective functions
3. Test thoroughly with different user preferences

### UI Components

- Follow the existing component structure
- Use TypeScript for all new components
- Utilize shadcn/ui components where possible
- Ensure mobile responsiveness

## 🧪 Testing

Before submitting:

1. Test your changes locally
2. Ensure no TypeScript errors:
   ```bash
   npm run build
   ```
3. Check for linting issues:
   ```bash
   npm run lint
   ```

## 📤 Submitting Changes

1. Commit your changes:
   ```bash
   git commit -m "feat: add new AI model"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request with:
   - Clear title and description
   - Screenshots if UI changes
   - Reference any related issues

### Commit Message Format

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions or changes
- `chore:` Build process or auxiliary tool changes

## 🐛 Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## 💡 Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Describe the feature clearly
- Explain why it would be valuable
- Consider submitting a PR

## 🔍 Code Review Process

1. All submissions require review
2. We aim to review within 48 hours
3. Be patient and responsive to feedback
4. Make requested changes promptly

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

## ❓ Questions?

- Open a [GitHub Discussion](https://github.com/rprovine/ai-model-recommender/discussions)
- Email: support@lenilani.com

Thank you for contributing! 🎉