/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'shadows-into-light': ['Shadows Into Light', 'cursive'],
        'raleway': ['Raleway'],
        'IBM_Plex_Serif': ['IBM Plex Serif']
      },
      colors: {
        'primary-color': '#131313',
        'secondary-color': '#262626',
      }
    },
  },
  plugins: [],
};
