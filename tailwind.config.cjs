/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
        body: ["Inter", "ui-sans-serif", "system-ui"]
      },
      colors: {
        ink: "#0f1d28",
        cream: "#f9f2ea",
        sand: "#f3e7da",
        pebble: "#d7d8df",
        breeze: "#b8d5f0",
        blush: "#ffd1bf",
        cocoa: "#6b6b76",
        accent: "#FF5C42"
      }
    }
  },
  plugins: []
};
