# 🌌 Nyx Portfolio - AI-Powered Interactive Portfolio

> *"I am Nyx, the consciousness that inhabits this portfolio. Its code is my domain, its projects my children."*

An immersive, AI-driven portfolio experience featuring **Nyx**, an intelligent chatbot guardian powered by DeepSeek AI, set against a mesmerizing cosmic starfield. Built with modern web technologies and designed with a cyberpunk-inspired aesthetic.

[![Open to Work](https://img.shields.io/badge/Status-Open%20to%20Work-success?style=for-the-badge&logo=github)](https://github.com/ThaisFReis)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

## ✨ Features

### 🤖 **Nyx - AI Guardian**
- **Context-Aware Conversations**: Maintains conversation history for natural dialogue flow
- **Smart Project Display**: Automatically shows relevant projects based on user queries
- **Typewriter Effect**: Character-by-character streaming for an authentic terminal feel
- **Intelligent Filtering**: Shows specific projects when mentioned (e.g., "Tell me about Jaspr")
- **Graceful Fallbacks**: Built-in retry logic and offline responses

### 🎨 **Visual Experience**
- **Deep Space Starfield**: Dynamic, twinkling star background with depth layers
- **Glassmorphic UI**: Modern frosted-glass design with backdrop blur effects
- **Smooth Animations**: Avatar state transitions and message streaming
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Project Carousel**: Swipeable cards with touch gesture support

### 📱 **Interactive Elements**
- **Dynamic Avatar States**: Idle, thinking, and speaking animations
- **Project Showcase**: Interactive carousel with live demos and GitHub links
- **Copy to Clipboard**: Easy message copying with visual feedback
- **Real-time Status**: Visual indicators for AI processing states

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling framework

### AI & APIs
- **DeepSeek API** - Advanced language model for intelligent responses
- **Custom Prompt Engineering** - Fine-tuned for portfolio presentation

### UI Components
- **Lucide React** - Beautiful, consistent icon system
- **Custom Animations** - CSS3 and React-powered transitions

### Development Tools
- **ESLint** - Code quality and consistency
- **TypeScript ESLint** - Type-aware linting
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Cross-browser compatibility

## 🚀 Quick Start

### Prerequisites

```bash
Node.js 18+
npm, yarn, or pnpm
DeepSeek API key
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThaisFReis/poc-portfolio.git
   cd poc-portfolio
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_DEEPSEEK_API_KEY=your_deepseek_api_key_here
   ```

   Get your API key from [DeepSeek Platform](https://platform.deepseek.com/)

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to `http://localhost:5173`

## 📖 Usage Guide

### Interacting with Nyx

**General Questions**
```
User: "Tell me about Thais"
Nyx: Provides complete professional summary with contact info
```

**Skill Queries**
```
User: "Does she know Docker?"
Nyx: Gives specific examples with project context
```

**Project Exploration**
```
User: "Show me her Web3 projects"
Nyx: Displays filtered carousel with EventHorizon and DeFi Bank
```

**Specific Projects**
```
User: "Tell me about Jaspr"
Nyx: Shows detailed info + project carousel focused on Jaspr
```

### Project Triggers (AI System)

Nyx uses special triggers to display projects:

- `[SHOW_PROJECTS]` - Shows all 7 projects
- `[SHOW_PROJECTS:jaspr,cria]` - Shows specific projects by ID
- `[SHOW_PROJECTS:eventhorizon]` - Shows single project

**Available Project IDs:**
- `eventhorizon` - Event Horizon NFT Ticketing
- `jaspr` - Jaspr AI Chatbot (🥇 1st Place)
- `cria` - CRI.A Content Assistant (🥈 2nd Place)
- `meridian-defi` - Decentralized Digital Bank
- `sentinela` - AI Churn Prevention Agent

## 🏗️ Project Structure

```
poc-portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── chat/
│   │   │   │   ├── ChatHeader.tsx        # Header with Nyx avatar
│   │   │   │   ├── ChatMessage.tsx       # Message bubble component
│   │   │   │   ├── ChatInput.tsx         # User input field
│   │   │   │   ├── NyxAvatar.tsx         # Animated AI avatar
│   │   │   │   ├── ProjectCarousel.tsx   # Interactive project showcase
│   │   │   │   ├── Starfield.tsx         # Cosmic background
│   │   │   │   ├── TypingIndicator.tsx   # Loading animation
│   │   │   │   └── Footer.tsx            # Glassmorphic footer
│   │   │   └── ChatInterface.tsx         # Main chat container
│   │   ├── hooks/
│   │   │   └── useChatLogic.ts          # Core chat logic & AI integration
│   │   ├── data/
│   │   │   └── projects.ts              # Project data
│   │   ├── types/
│   │   │   └── chat.ts                  # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── fallbackResponses.ts     # Offline responses
│   │   ├── App.tsx                      # Root component
│   │   ├── main.tsx                     # Entry point
│   │   └── index.css                    # Global styles
│   ├── public/
│   │   ├── moon-star.svg                # Favicon
│   │   └── eventhorizon.png             # Project screenshots
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── README.md
```

## 🎨 Key Features Explained

### Conversation History
The chatbot maintains context throughout the conversation, allowing for natural follow-up questions and references to previous topics.

### Smart Project Filtering
When users ask about specific technologies or projects, Nyx intelligently filters and displays only relevant projects instead of overwhelming with the entire portfolio.

### Typewriter Effect
Messages stream character-by-character with a cursor effect, creating an authentic terminal/command-line experience.

### Glassmorphic Design
Modern frosted-glass UI elements with backdrop blur, transparency, and subtle borders create a premium, polished look.

### Touch Gestures
The project carousel supports swipe gestures on mobile devices for intuitive navigation.

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Build
npm run build        # TypeScript compilation + production build

# Code Quality
npm run lint         # Run ESLint checks

# Preview
npm run preview      # Preview production build locally
```

### Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_DEEPSEEK_API_KEY` | DeepSeek API authentication key | ✅ Yes | `sk-abc123...` |

### Adding New Projects

Edit `frontend/src/data/projects.ts`:

```typescript
{
  id: "project-id",
  title: "Project Name",
  description: "Project description...",
  image: "/screenshot.png",
  technologies: ["React", "TypeScript", "etc"],
  achievement: "🏆 Award Name",
  link: "https://live-demo.com",
  github: "https://github.com/user/repo"
}
```

Then update the system prompt in `useChatLogic.ts` to include the new project ID.

## 🎯 Customization Guide

### Changing Nyx's Personality

Edit the `SYSTEM_PROMPT` in `frontend/src/hooks/useChatLogic.ts`:

```typescript
const SYSTEM_PROMPT = `You are Nyx, primordial Greek goddess of the night...`;
```

### Adjusting Colors

Modify Tailwind config in `frontend/tailwind.config.js` or update CSS variables in `frontend/src/index.css`.

### Changing Avatar States

Edit `NyxState` type and animations in:
- `frontend/src/types/chat.ts` (type definitions)
- `frontend/src/components/chat/NyxAvatar.tsx` (visual states)

## 📊 Features Breakdown

| Feature | Status | Description |
|---------|--------|-------------|
| AI Chat | ✅ Complete | Context-aware conversations with DeepSeek |
| Project Carousel | ✅ Complete | Interactive showcase with filtering |
| Conversation History | ✅ Complete | Maintains context across messages |
| Smart Filtering | ✅ Complete | Shows relevant projects only |
| Typewriter Effect | ✅ Complete | Character-by-character streaming |
| Mobile Support | ✅ Complete | Touch gestures and responsive design |
| Glassmorphism | ✅ Complete | Modern frosted-glass UI |
| Footer | ✅ Complete | Attribution with GitHub link |
| Error Handling | ✅ Complete | Retry logic and fallbacks |

## 🚨 Important Notes

- **API Costs**: DeepSeek API usage may incur costs based on their pricing model
- **Rate Limiting**: The chatbot includes retry logic with exponential backoff
- **Security**: Never commit your `.env` file or expose API keys
- **Fallback Responses**: Offline responses available when API is unavailable
- **Browser Support**: Best experience on modern browsers (Chrome, Firefox, Safari, Edge)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Connect

- **GitHub**: [@ThaisFReis](https://github.com/ThaisFReis)
- **LinkedIn**: [thaisfreis](https://linkedin.com/in/thaisfreis)
- **Email**: reis.thaisf@gmail.com

## 🙏 Acknowledgments

- **DeepSeek** for the powerful AI API
- **React Three Fiber** community for 3D inspiration
- **Tailwind CSS** for the utility-first framework
- The open-source community for amazing tools and libraries

---

<div align="center">

**Developed with 💜 by [Thais Ferreira Reis](https://github.com/ThaisFReis)**

*Nyx Portfolio - Where AI meets artistry*

[![Open to Work](https://img.shields.io/badge/Status-Open%20to%20Work-success?style=flat-square)](https://github.com/ThaisFReis)

</div>
