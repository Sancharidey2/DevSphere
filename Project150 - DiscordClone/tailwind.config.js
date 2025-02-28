/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        discord: {
          primary: '#5865F2',
          secondary: '#4752C4',
          dark: '#36393f',
          darker: '#2f3136',
          darkest: '#202225',
          light: '#40444b',
          lighter: '#dcddde',
          lightest: '#ffffff',
          success: '#3ba55c',
          danger: '#ed4245',
          warning: '#faa61a',
        },
      },
    },
  },
  plugins: [],
};