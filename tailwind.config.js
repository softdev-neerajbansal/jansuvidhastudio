/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        saffron: { 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
        india:   { green: '#138808', blue: '#000080' },
      },
    },
  },
  plugins: [],
}
