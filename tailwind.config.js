/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#F6F7F8",
        "custom-border": "#D6D6D6",
        "custom-light-gray": "#BBBBBB",
        "custom-gray": "#63656e",
        "custom-main": "#6647E2",
      },
      fontFamily: {
        montserrat: ["Montserrat"],
      },
    },
  },
  plugins: [],
};
