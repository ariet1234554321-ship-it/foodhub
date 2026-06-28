/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6B35",
        primaryDark: "#E2542A",
        dark: "#2D2A26",
        cream: "#FFF8F0",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
