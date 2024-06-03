/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#F6F7F8",
        "custom-border": "#D6D6D6",
        "custom-light-gray": "#BBBBBB",
        "custom-very-light-gray": "#F0F1F4",
        "custom-gray": "#63656e",
        "custom-main": "#6647E2",
        "custom-light-main": "#F4F2FF",
        "custom-main-dark": "#4a34a3",
        "custom-green": "#AEFFCF",
        "custom-red": "#F6B3B3",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
      backgroundImage: {
        "abstract-pattern": "url('./src/assets/abstract_bg.jpeg')",
      },
      boxShadow: {
        "custom-shadow": "5px 5px 5px 5px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
