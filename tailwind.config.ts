import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './Interfaces/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
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
