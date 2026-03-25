// Tailwind config with custom animations for 3D presentation transitions
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 2s infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'text-reveal': 'text-reveal 0.8s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
        'pulse-live': 'pulse-live 2s ease-in-out infinite',
        'particle-1': 'particle-drift-1 20s linear infinite',
        'particle-2': 'particle-drift-2 25s linear infinite',
        'particle-3': 'particle-drift-3 18s linear infinite',
        'clock-tick': 'clock-tick 1s steps(1) infinite',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-live': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'particle-drift-1': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translate(100vw, -100vh) rotate(360deg)', opacity: '0' },
        },
        'particle-drift-2': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.4' },
          '90%': { opacity: '0.4' },
          '100%': { transform: 'translate(-80vw, -120vh) rotate(-360deg)', opacity: '0' },
        },
        'particle-drift-3': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.5' },
          '85%': { opacity: '0.5' },
          '100%': { transform: 'translate(60vw, 100vh) rotate(180deg)', opacity: '0' },
        },
        'clock-tick': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
};
