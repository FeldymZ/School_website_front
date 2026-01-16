/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0b3c53",
        secondary: "#00A4E0",
        blue: "#00A4E0",
        lightBlue: "#cfe3ff",
        darkBlue: "#00124d",

      },
    },
  },
  plugins: [],
};
