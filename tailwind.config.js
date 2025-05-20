/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs', // Scan all EJS files in the views folder and subfolders
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Custom indigo shade
      },
    },
  },
  plugins: [],
}
