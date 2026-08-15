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
          DEFAULT: '#0C0C0C',
          surface: '#141414',
          card: '#181818',
          border: 'rgba(215, 226, 234, 0.12)',
        },
        light: {
          DEFAULT: '#F4F2ED',
          surface: '#EAE6DE',
          text: '#0C0C0C',
          muted: 'rgba(12, 12, 12, 0.65)',
          border: 'rgba(12, 12, 12, 0.1)',
        },
        text: {
          primary: '#D7E2EA',
          secondary: 'rgba(215, 226, 234, 0.55)',
          muted: 'rgba(215, 226, 234, 0.35)',
        },
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(123deg, #020B1A 7%, #0066FF 37%, #0A84FF 72%, #00D2FF 100%)',
        'hero-heading-gradient': 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
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
