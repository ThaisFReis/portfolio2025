/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#00FFFF',
        'magenta': '#FF00FF',
        'deep-purple': '#240046',
        'light-gray': '#C0C0C0',
        'dark-gray': '#808080',
        'cyber-dark': '#0d0221',
        'neon-cyan': '#06b6d4',
        'neon-purple': '#9333ea',
        'cyber-orange': '#f97316',
      },
      backgroundImage: {
        'gradient-cyberpunk': 'linear-gradient(45deg, #06b6d4, #9333ea, #f97316)',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      textShadow: {
        'glow-cyan': '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF, 0 0 20px #00FFFF',
        'glow-magenta': '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF',
        'glow-blue': '0 0 5px #0080FF, 0 0 10px #0080FF, 0 0 15px #0080FF, 0 0 20px #0080FF',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-glow-cyan': {
          textShadow: '0 0 5px #00FFFF, 0 0 10px #00FFFF, 0 0 15px #00FFFF, 0 0 20px #00FFFF',
        },
        '.text-glow-magenta': {
          textShadow: '0 0 5px #FF00FF, 0 0 10px #FF00FF, 0 0 15px #FF00FF, 0 0 20px #FF00FF',
        },
        '.text-glow-blue': {
          textShadow: '0 0 5px #0080FF, 0 0 10px #0080FF, 0 0 15px #0080FF, 0 0 20px #0080FF',
        },
        '.win95-outset': {
          borderTop: '2px solid #C0C0C0',
          borderLeft: '2px solid #C0C0C0',
          borderRight: '2px solid #808080',
          borderBottom: '2px solid #808080',
        },
        '.win95-inset': {
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderRight: '2px solid #C0C0C0',
          borderBottom: '2px solid #C0C0C0',
        },
        '.border-gradient-cyberpunk': {
          background: 'linear-gradient(45deg, #06b6d4, #9333ea, #f97316)',
          padding: '2px',
        },
        '.cyberpunk-glow': {
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(147, 51, 234, 0.3)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
