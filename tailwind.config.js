/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // background
        'primary': '#0c1348',
        'light-primary': '#e7f0fe',
        'secondary': '#f5f5f5',

        //typography
        'tprimary': '#252422',
        't-secondary': '#9c9c9c'
      }
    },
  },
  plugins: [],
}