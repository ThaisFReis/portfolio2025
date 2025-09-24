# 🚀 AI Avatar Portfolio - Cyberpunk Neural Interface

An interactive portfolio website featuring a wireframe AI avatar with eye tracking, starfield background, and an integrated chatbot powered by Google Gemini AI.

## ✨ Features

- 🌌 **Deep Space Starfield** with twinkling stars and floating particles
- 🤖 **3D Avatar Model** with realistic wireframe overlay and mouse tracking
- 💬 **AI Chatbot** (T.H.A.I.S.) powered by Google Gemini with cyberpunk personality
- 🎨 **Authentic 90s Cyberpunk Aesthetic** with terminal styling and neon effects
- 🎯 **Advanced Post-Processing** with bloom, scanlines, and glitch effects
- 📱 **Responsive Design** that works across different screen sizes
- ⚡ **Smooth Animations** with optimized performance

## 🛠️ Technologies

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Lucide React
- **AI Integration**: Google Gemini API
- **Styling**: CSS3 with custom cyberpunk animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meu-avatar-ai
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Add your Gemini API key to `.env`:
   ```
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 How to Use

- **Move your mouse** around the screen to see the 3D avatar track your movement
- **Click sidebar icons** to trigger different system messages
- **Click the chat button** (bottom right) to open the T.H.A.I.S. terminal
- **Type questions** about Thais's portfolio, skills, and experience
- **Watch the typewriter effect** as T.H.A.I.S. responds with cyberpunk flair
- **Enjoy the visual effects** including wireframe overlays, scanning lines, and targeting reticles

## 🤖 T.H.A.I.S. Chatbot

T.H.A.I.S. (Terminal Heurístico de Assistência Interativa e Sistêmica) is an AI assistant with:

- **Cyberpunk personality** with 90s hacker slang
- **Portfolio knowledge** about Thais Ferreira Reis's experience
- **Typewriter effect** for authentic terminal feel
- **Error handling** with themed fallback messages
- **Retry logic** for robust API communication

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── WireframeAvatar.tsx    # 3D wireframe avatar
│   │   ├── ChatInterface.tsx      # AI chatbot interface
│   │   ├── Starfield.tsx          # Background effects
│   │   ├── Sidebar.tsx            # Navigation sidebar
│   │   └── NotificationPopup.tsx  # System notifications
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript type definitions
│   └── index.css           # Global styles with cyberpunk theme
├── public/                  # Static assets
└── .env.example            # Environment variables template
```

## 🎨 Design Features

- **Deep Space Background**: Radial gradient with twinkling stars
- **Blue Particle System**: Floating cyan particles with realistic physics
- **3D Avatar Integration**: High-quality GLTF model with wireframe overlay
- **Advanced Post-Processing**: Bloom, scanlines, chromatic aberration, and glitch effects
- **Wireframe Overlay**: Animated scanning lines, corner frames, and targeting reticle
- **Terminal UI**: Authentic command-line interface styling
- **Glassmorphism**: Backdrop blur effects throughout the interface
- **Smooth Animations**: Eye tracking, particle movement, and UI transitions

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Preview production build
npm run preview
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for chatbot | Yes |

## 🚨 Important Notes

- The chatbot requires a valid Gemini API key to function
- API key usage may incur costs based on Google's pricing
- The avatar eye tracking works best on desktop/laptop devices
- For production deployment, ensure proper API key security

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ and cyberpunk aesthetics** 🌆
