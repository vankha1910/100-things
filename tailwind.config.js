/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        rale: ['Raleway', 'sans-serif']
      },
      colors: {
        primaryGray: '#cbd5e1'
      }
    }
  },
  plugins: []
}
