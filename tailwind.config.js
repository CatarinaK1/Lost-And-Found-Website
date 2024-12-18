/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      spacing: {
        '100': '100px',
      },
      borderRadius: {
        'top-3xl': '24px 24px 0 0',
      },
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
  plugins: [require('flowbite/plugin')],
  css: {
    '@layer base': [
      `
      @font-face {
        font-family: "Space Grotesk";
        font-display: swap;
        src: url('/path/to/space-grotesk.woff2') format('woff2'); 
      }
      `
    ]
  }
}
}
