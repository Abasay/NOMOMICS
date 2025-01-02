import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Open Sans"', 'sans-serif cursive'],
        openSans: ['"Open Sans"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], // For Montserrat
        trebuchet: ['Trebuchet MS', 'Helvetica', 'Arial', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        clash: ['Clash Display', 'sans-serif'],
      },
      colors: {
        background: 'var(--primary)',
        foreground: 'var(--foreground)',
        onHover: 'var(--onHover)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        textBodyColor: 'var(--text-body)',
        bgError: 'var(--bg-error)',
        tertiary: 'var(--tertiary)',
        marketPlace: 'var(--text-market)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--foreground)',
              '&:hover': {
                color: 'var(--foreground)',
              },
            },
            h1: {
              lineHeight: '125%',
              fontSize: '40px',
              fontWeight: '700',
            },
            h2: {
              lineHeight: '125%',
              fontSize: '32px',
              fontWeight: '700',
            },
            h3: {
              lineHeight: '125%',
              fontSize: '24px',
              fontWeight: '700',
            },
            h4: {
              lineHeight: '125%',
              fontSize: '18px',
              fontWeight: '700',
            },
            h5: {
              lineHeight: '125%',
              fontSize: '14px',
              fontWeight: '700',
            },
            h6: {
              lineHeight: '125%',
              fontSize: '40px',
              fontWeight: '700',
            },
          },
        },
      },
      screens: {
        'max-1280': { max: '1280px' },
        'max-1024': { max: '1024px' },
        'min-400': { min: '400px' },
        'max-md': { max: '768px' },
        'min-1280': { min: '1280px' },
        'min-1024': { min: '1024px' },
        'min-1279': { min: '1279px' },
        'max-1281': { max: '1281px' },
        'max-480': { max: '480px' },
        'max-400': { max: '400px' },
      },
    },
  },
  plugins: [],
};
export default config;
