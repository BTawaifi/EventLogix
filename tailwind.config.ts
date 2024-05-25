import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-pink-orange': 'linear-gradient(to right, #ec4899, #f97316)',
        'gradient-green-blue': 'linear-gradient(to right, #34d399, #3b82f6)',
        'gradient-purple-pink': 'linear-gradient(to right, #a855f7, #ec4899)',
        'gradient-yellow-red': 'linear-gradient(to right, #facc15, #ef4444)',
        'gradient-teal-cyan': 'linear-gradient(to right, #14b8a6, #22d3ee)',
        'gradient-blue-indigo': 'linear-gradient(to right, #3b82f6, #6366f1)',
        'gradient-red-yellow': 'linear-gradient(to right, #ef4444, #facc15)',
        'gradient-gray-blue': 'linear-gradient(to right, #718096, #2b6cb0)',
        'gradient-indigo-purple': 'linear-gradient(to right, #6366f1, #8b5cf6)',
        'gradient-cyan-teal': 'linear-gradient(to right, #22d3ee, #14b8a6)',
        'gradient-orange-yellow': 'linear-gradient(to right, #f97316, #facc15)',
        'gradient-gray-purple': 'linear-gradient(to right, #718096, #8b5cf6)',
        'gradient-pink-purple': 'linear-gradient(to right, #ec4899, #8b5cf6)',
      },
      colors: {
        light: {
          DEFAULT: '#ffffff',
          foreground: 'rgb(var(--foreground-rgb))',
          'background-start': 'rgb(var(--background-start-rgb))',
          'background-end': 'rgb(var(--background-end-rgb))',
        },
        dark: {
          DEFAULT: '#000000',
          foreground: 'rgb(var(--foreground-rgb))',
          'background-start': 'rgb(var(--background-start-rgb))',
          'background-end': 'rgb(var(--background-end-rgb))',
        },
      },
    },
  },
  plugins: [],
};

export default config;
