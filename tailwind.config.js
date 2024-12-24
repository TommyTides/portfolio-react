/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          light: '#64B5F6',
          DEFAULT: '#2196F3',
          dark: '#1976D2',
        }
      }
    },
  },
  plugins: [],
}