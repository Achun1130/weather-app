/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71"
      }
    },
    fontFamily: {
      "Roboto-Mono": ['"Roboto Mono"', 'monospace']
    },
    container: {
      center: true,
      padding: "2rem"
    },
    screens: {
      sm: "640px",
      md: "768px"
    }
  },
  plugins: [],
}
