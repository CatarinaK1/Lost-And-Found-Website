/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        'my-green': '#56B040',
        'my-gray': '#444444',
        'my-white' : '#F3F3F3',
      },
    },
    fontFamily: {
      sans: ['"Space Grotesk"', 'sans-serif'],
    },
  plugins: [],
}
}
