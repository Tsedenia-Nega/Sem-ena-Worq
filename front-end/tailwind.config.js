/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // <-- this is critical
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
