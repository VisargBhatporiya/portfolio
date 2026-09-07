/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#e2b714',
        cream: '#f4f0ea',
        darkBg: '#070709',
        cardBg: '#0d0d11'
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        handwritten: ['Italianno', 'cursive']
      }
    },
  },
  plugins: [],
}
