/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F5',
          50: '#FDFCFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EBE4D8',
          400: '#DDD3C1',
          500: '#C9BBA5',
        },
        charcoal: {
          DEFAULT: '#161514',
          900: '#11100F',
          850: '#161514',
          800: '#21201D',
          700: '#32302C',
          600: '#48443E',
          500: '#69635B',
          400: '#8A8278',
          300: '#ADA498',
        },
        stone: {
          DEFAULT: '#8C8275',
          100: '#EFEBE5',
          200: '#E2DBD2',
          300: '#C7BCAD',
          400: '#A79B8A',
          500: '#8C8275',
          600: '#6D6459',
        },
        wood: {
          DEFAULT: '#7C6752',
          light: '#B09A80',
          dark: '#4A3B2C',
        },
        gold: {
          subtle: '#C2A676',
          muted: '#A58B5E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.25em',
        'super-wide': '0.35em',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  plugins: [],
}
