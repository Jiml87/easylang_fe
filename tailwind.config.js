/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [require('@tailwindcss/typography')],
};
