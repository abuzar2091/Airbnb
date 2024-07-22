/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      screens: {
          xxs:'20px',
          xs:'340px',
          sm:'520px',
          md: '640px',
          lg: '768px',
          xl:'1024px',
        // 'mdxl': '871px', // Add a custom breakpoint named '2xl'
        // You can add more custom breakpoints as needed
      },
    },
  },
  plugins: [],
};
