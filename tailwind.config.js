/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./index.js"],
  theme: {
    extend: {
      fontFamily: {
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: false,
  },
  plugins: [require("daisyui")],
};
