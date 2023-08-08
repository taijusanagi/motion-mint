/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#49c5b6",
        accent: "#DF6C4F",
        default: "#ffffff",
        secondary: "#e5e7eb",
        "accent-light": "#EFA785",
      },
      textColor: {
        primary: "#49c5b6",
        accent: "#DF6C4F",
        default: "#444444",
      },
    },
  },
  plugins: [],
};
