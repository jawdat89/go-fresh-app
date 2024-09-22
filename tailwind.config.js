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
        // Light Theme
        "primary-lightest": "#FFDAD4",
        "primary-lighter": "#FF8A75",
        primary: "#FF6F61",
        "secondary-lightest": "#C8E6C9",
        "secondary-lighter": "#81C784",
        secondary: "#4CAF50",
        white: "#FFFFFF",
        "gray-100": "#F5F5F5",
        "gray-200": "#E0E0E0",
        "accent-100": "#FFC107",
        "accent-200": "#FF9800",

        // Dark Theme
        "primary-darkest": "#D84315",
        "primary-darker": "#FF6F61",
        "secondary-darkest": "#1B5E20",
        "secondary-darker": "#2E7D32",
        "gray-100-dark": "#424242",
        "gray-200-dark": "#616161",
        "accent-100-dark": "#FFEB3B",
        "accent-200-dark": "#FFC107",
        "background-dark": "#121212",
        "text-dark": "#E0E0E0",
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
