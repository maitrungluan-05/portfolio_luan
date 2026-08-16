/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#08080C',
          base: '#08080C',
          surface: '#0D111A',
          card: '#111622',
          'card-hover': '#161D2E',
          border: 'rgba(0, 163, 255, 0.15)',
          'border-subtle': 'rgba(255, 255, 255, 0.06)',
        },
        light: {
          DEFAULT: '#F5F5F3',
          surface: '#EAEAE7',
          text: '#09090B',
          muted: 'rgba(9, 9, 11, 0.6)',
          border: 'rgba(9, 9, 11, 0.08)',
        },
        accent: {
          DEFAULT: '#00A3FF',
          azure: '#00A3FF',
          sky: '#00B2FE',
          cyan: '#38BDF8',
          deep: '#0284C7',
          slate: '#94A3B8',
        },
        text: {
          primary: '#FAFAFA',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
      },
      fontFamily: {
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        kanit: ['Kanit', 'sans-serif'],
        sans: ['Outfit', 'Plus Jakarta Sans', 'Kanit', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'metallic-text': 'linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 50%, #A1A1AA 100%)',
        'subtle-surface': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'btn-studio': 'linear-gradient(180deg, #FFFFFF 0%, #E4E4E7 100%)',
        'btn-dark': 'linear-gradient(180deg, #1C1C22 0%, #121216 100%)',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
