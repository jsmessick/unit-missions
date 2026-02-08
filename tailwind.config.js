/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        duo: {
          green: '#58CC02',
          'green-dark': '#46A302',
          blue: '#1CB0F6',
          'blue-dark': '#1899D6',
          orange: '#FF9600',
          'orange-dark': '#E08600',
          purple: '#CE82FF',
          'purple-dark': '#B866FF',
          red: '#FF4B4B',
          'red-dark': '#E04343',
          gray: '#AFAFAF',
          'gray-light': '#E5E5E5',
          'gray-bg': '#F7F7F7',
          dark: '#131F24',
          'dark-card': '#1B2B32',
          'dark-lighter': '#233A42',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        duo: '16px',
      },
    },
  },
  plugins: [],
}
