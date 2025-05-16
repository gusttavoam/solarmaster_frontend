/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0088CC',
          dark: '#006699',
          light: '#33AADD',
        },
        secondary: {
          DEFAULT: '#F9A826',
          dark: '#E08E0B',
          light: '#FABC55',
        },
      },
    },
  },
  plugins: [],
}; 