/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "0.1em": "0.1em",
        "0.4em": "0.4em",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
