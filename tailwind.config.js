/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          500: '#156d90',
          700: '#156d90',
          900: '#0e3a53',
        },
        sand: {
          200: '#f2ebe2',
        },
        coral: {
          400: '#ff8f70',
        },
        foam: '#fafafa',
        ink: '#0a0a0a',
        brand: '#e9bd4d',
      },
    },
  },
  plugins: [],
};
