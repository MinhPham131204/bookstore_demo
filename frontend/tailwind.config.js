/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'black-ops-one': ['"Black Ops One"', 'system-ui'],
      },
    },
  },
  plugins: [],
}