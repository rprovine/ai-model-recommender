# AI Model Recommender

An intelligent web application that helps users find the perfect AI tool for their needs using a hybrid approach combining a curated database with Anthropic's Claude API for enhanced recommendations.

![AI Model Recommender](https://img.shields.io/badge/AI-Model%20Recommender-blue)
![React](https://img.shields.io/badge/React-18.0-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🌟 Features

### Intelligent Recommendation System
- **Hybrid Approach**: Combines static scoring with Claude API for nuanced recommendations
- **Smart Filtering**: Pre-filters models based on budget and use case constraints
- **Transparent Scoring**: Shows users why each model was recommended
- **Fallback Support**: Works seamlessly even without API access

### Comprehensive Model Database
- 20+ AI models including:
  - **Text/Chat**: GPT-4, Claude, Gemini, Llama
  - **Image Generation**: DALL-E 3, Midjourney, Stable Diffusion
  - **Code Assistants**: GitHub Copilot, Cursor
  - **Business Tools**: Microsoft Copilot, Notion AI
- Detailed specifications, pricing, and capabilities
- Regular updates with latest models and pricing

### User Experience
- **Interactive Questionnaire**: 7-step guided process
- **Real-time Filtering**: Filter by vendor, price, category, features
- **Cost Estimation**: Calculate monthly costs based on usage
- **Export Options**: Download recommendations as CSV
- **Mobile Responsive**: Works on all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Anthropic API key (optional, for enhanced recommendations)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-model-recommender.git
cd ai-model-recommender
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your Anthropic API key to `.env`:
```env
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

6. Open http://localhost:5173 in your browser

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Questionnaire/   # Multi-step form components
│   ├── ModelCard/       # AI model display cards
│   ├── Results/         # Results and filtering
│   └── Comparison/      # Model comparison tools
├── data/
│   └── models.ts        # AI model database
├── services/
│   └── anthropic.ts     # Claude API integration
├── utils/
│   └── recommendation-engine.ts  # Scoring logic
└── types/               # TypeScript definitions
```

## 🔧 Configuration

### Environment Variables
- `VITE_ANTHROPIC_API_KEY`: Your Anthropic API key (optional)
- `VITE_USE_STATIC_ONLY`: Set to 'true' to disable API calls

### Customization
- Edit `src/data/models.ts` to add/update AI models
- Modify scoring weights in `recommendation-engine.ts`
- Adjust UI theme in `tailwind.config.js`

## 📊 How It Works

### 1. User Input
Users answer questions about:
- Primary use cases (writing, coding, creative work, etc.)
- Experience level (beginner to developer)
- Budget constraints
- Priority factors (cost, quality, privacy, etc.)
- Integration preferences
- Usage volume
- Special requirements (optional)

### 2. Recommendation Process
```javascript
1. Filter models by hard constraints (budget, use case)
2. Calculate static scores based on:
   - Use case matching (30%)
   - Budget compatibility (25%)
   - Experience level (15%)
   - Priority factors (20%)
   - Integration methods (5%)
   - Special requirements (5%)
3. Enhance with Claude API (if available):
   - Send eligible models to Claude
   - Get nuanced recommendations
   - Blend scores (60% AI, 40% static)
4. Present results with transparency
```

### 3. Results Display
- Match percentage for each model
- Specific reasons for recommendation
- Cost estimation based on usage
- Filtering and comparison tools

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 🛡️ Security Considerations

- **API Key Protection**: Never commit API keys to version control
- **Environment Variables**: Use `.env` files for sensitive data
- **Production Setup**: Consider using a backend proxy for API calls
- **Rate Limiting**: Implement rate limiting for API endpoints

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Maintaining the Database

To keep recommendations accurate:

1. **Monthly Updates**: Check vendor pricing pages
2. **New Models**: Add to `src/data/models.ts`
3. **Performance Data**: Update from Chatbot Arena leaderboards
4. **User Feedback**: Incorporate user reports

### Data Sources
- Official vendor documentation
- Pricing pages
- Performance benchmarks
- Community feedback

## 🐛 Troubleshooting

### Common Issues

**Blank Screen**
- Check browser console for errors
- Ensure all dependencies are installed
- Verify Node.js version compatibility

**API Not Working**
- Verify API key in `.env`
- Check API key permissions
- Ensure not hitting rate limits

**Styling Issues**
- Run `npm install` to ensure Tailwind CSS is installed
- Check `postcss.config.js` exists
- Restart dev server after config changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Anthropic](https://anthropic.com) for Claude API
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Tailwind CSS](https://tailwindcss.com) for styling
- AI model vendors for their innovation

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-model-recommender/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-model-recommender/discussions)
- **Email**: support@lenilani.com

---

Built with ❤️ by [LeniLani Consulting](https://lenilani.com)