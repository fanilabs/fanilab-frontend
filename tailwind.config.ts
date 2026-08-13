import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#05070d',
          900: '#080b14',
          850: '#0b0f1a',
          800: '#0f1420',
          700: '#141a28',
          600: '#1b2334',
          500: '#293349',
        },
        line: {
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.14)',
        },
        paper: {
          DEFAULT: '#e7eaf3',
          muted: '#9aa4bd',
          faint: '#6c7690',
        },
        accent: {
          DEFAULT: '#4c7cff',
          light: '#7da0ff',
          dim: '#2c4a9e',
        },
        teal: {
          DEFAULT: '#2dd4bf',
          dim: '#1a8f81',
        },
        status: {
          built: '#34d399',
          progress: '#f5a524',
          planned: '#8891a5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '1180px',
      },
      backgroundImage: {
        'grid-lines':
          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
