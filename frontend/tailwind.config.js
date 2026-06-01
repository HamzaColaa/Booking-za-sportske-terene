/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#10b981",
        secondary: "#0f172a",
        accent: "#06b6d4",

        'sport-zelena': '#10b981',
        'sport-tamna': '#0f172a',
        'sport-svijetla': '#f8fafc',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },

      boxShadow: {
        glow: '0 0 30px rgba(16,185,129,0.15)',
      }
    },
  },
  plugins: [],
}