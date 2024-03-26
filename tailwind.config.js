/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      screens: {
        'mdxl': '871px', // Add a custom breakpoint named '2xl'
        // You can add more custom breakpoints as needed
      },
    },
  },
  plugins: [],
};
