/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: '#030303',
          darker: '#070707',
          dark: '#101010',
          card: '#141414',
          border: '#242424',
          accent: '#E50914',
          accentGlow: '#FF1E27',
          muted: '#8E8E93',
          light: '#F2F2F7',
          chrome: '#E0E0E0',
          gunmetal: '#2A2D34',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sora: ['"Sora"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(35px)' },
        }
      }
    },
  },
  plugins: [],
}
