/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF8F5',
        sage: {
          50: '#EFF4EF',
          100: '#D6E6D6',
          200: '#B4CEB4',
          300: '#8FAF8F',
          400: '#6B916B',
          500: '#4E724E',
          600: '#3D5C3D',
          700: '#2F472F',
          800: '#223222',
          900: '#162116',
        },
        terracotta: {
          50: '#FBF0ED',
          100: '#F5D9D0',
          200: '#EDBAAA',
          300: '#E09884',
          400: '#D07A5E',
          500: '#C4603E',
          600: '#A84E30',
          700: '#8A3E25',
          800: '#6B2F1B',
          900: '#4D2112',
        },
        stone: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 4px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.08), 0 2px 4px -1px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};
