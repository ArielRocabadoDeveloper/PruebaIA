// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // ← Asegúrate que esto esté
    "./src/**/*.{js,jsx,ts,tsx}", // ← Y esto también
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}