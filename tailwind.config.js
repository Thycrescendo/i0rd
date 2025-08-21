/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep blue
        secondary: '#3B82F6', // Bright blue
        accent: '#10B981', // Green for success/positive actions
        neutral: '#1F2937', // Dark gray for text/backgrounds
      },
    },
  },
  plugins: [],
}