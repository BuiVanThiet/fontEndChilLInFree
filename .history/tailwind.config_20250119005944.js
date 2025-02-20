/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Karla: ['Karla', 'serif']
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        fadeIn: {
          from: {
            opacity: 0
          },
          to: {
            opacity: 1
          }
        },
        scroll: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slideDown: 'slideDown .6s ease-in-out',
        fadeIn: 'fadeIn .6s ease-in-out',
        scroll: 'scroll 10s linear infinite',
      }

      // backgroundImage: {
      //   'slider-bg': 'url("/img/banner/banner-shoe.jpg")'
      // }
    },
  },
  plugins: [],
}

