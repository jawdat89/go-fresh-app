/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust the file extensions according to your project
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Oswald", "sans-serif"], // Use for headings
        body: ["Roboto", "sans-serif"], // Use for body text
      },
      colors: {
        "primary-lightest": "#FAD6CC", // Lightest variation of primary
        "primary-lighter": "#F3997F",
        primary: "#f04f23",
        "primary-darker": "#C03F1D",
        "primary-darkest": "#903017", // Darkest variation of primary
        "secondary-lightest": "#B7D9A8", // Lightest variation of secondary
        "secondary-lighter": "#93C77A",
        secondary: "#69bd45",
        "secondary-darker": "#529336",
        "secondary-darkest": "#3C6A27", // Darkest variation of secondary
        white: "#F4F4F4",
        "gray-100": "#E5E5E5",
        "gray-200": "#CCCCCC",
        "gray-300": "#B3B3B3",
        // More palette colors
        "accent-100": "#FFD700", // Example: Gold
        "accent-200": "#FF5733", // Example: Vibrant Orange
        "accent-300": "#F7F1FE", // Example: Pale Lavender Gray
        "accent-400": "#CF6344", // Example: Terracotta
        "accent-dark": "#333333", // Example: Dark Gray
      },
      screens: {
        "3xl": "1920px", // Example for 3xl breakpoint
        "4xl": "2560px", // Example for 4xl breakpoint
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
