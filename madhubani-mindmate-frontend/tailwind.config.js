/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violetSoft: "#f3e8ff",
        violetDeep: "#6B21A8",
        pinkAccent: "#FF6FB5",
        textDark: "#2d1b4e",
      },
    },
  },
  plugins: [],
};
