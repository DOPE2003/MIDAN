import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002060',
          50:  '#e6eaf3',
          100: '#c0cbe2',
          200: '#96a9cf',
          300: '#6b87bc',
          400: '#4d6fae',
          500: '#2e57a0',
          600: '#234f98',
          700: '#15448e',
          800: '#063984',
          900: '#002060',
        },
        secondary: {
          DEFAULT: '#7030A0',
          50:  '#f3eaf9',
          100: '#e0c9f0',
          200: '#c9a3e4',
          300: '#b07dd8',
          400: '#9d60ce',
          500: '#8a43c4',
          600: '#7030A0',
          700: '#5c2585',
          800: '#481a6a',
          900: '#340f4f',
        },
        accent: {
          DEFAULT: '#00B09B',
          300: '#4dcfc2',
          800: '#008f7e',
        },
      },
      fontFamily: {
        cairo:    ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        inter:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        nastaliq: ['var(--font-nastaliq)', 'Noto Nastaliq Urdu', 'serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #002060 0%, #7030A0 100%)',
      },
    },
  },
  plugins: [],
}

export default config
