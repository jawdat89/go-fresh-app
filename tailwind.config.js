/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the file extensions according to your project
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "primary-lightest": "#FCE3D9", // Lightest variation of primary
        "primary-lighter": "#F77C50",
        primary: "#ED5226",
        "primary-darker": "#C4461E",
        "primary-darkest": "#9B3817", // Darkest variation of primary
        "secondary-lightest": "#C2E599", // Lightest variation of secondary
        "secondary-lighter": "#A4D065",
        secondary: "#90C843",
        "secondary-darker": "#78A82B",
        "secondary-darkest": "#5F8B23", // Darkest variation of secondary
        white: "#F4F4F4",
        "gray-100": "#E5E5E5",
        "gray-200": "#CCCCCC",
        "gray-300": "#B3B3B3",
        // Adding more palette colors
        "accent-100": "#FFD700", // Example: Gold
        "accent-200": "#FF5733", // Example: Vibrant Orange
        "accent-300": "#F7F1FE", // Example: Pale Lavender Gray
        "accent-400": "#CF6344", // Example: Terracotta
        "accent-dark": "#333333", // Example: Dark Gray
      },
    },
  },
  plugins: [],
};
