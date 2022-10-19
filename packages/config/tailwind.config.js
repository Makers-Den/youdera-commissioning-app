/** TODO: use @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#F57E02',
          secondary: '#EA7A04',
        },
        green: {
          DEFAULT: '#5CB85C',
          secondary: '#58B158',
        },
        darkGray: {
          DEFAULT: '#6D7381',
          secondary: '#656B7A',
        },
        gray: {
          DEFAULT: '#E3E6F2',
          secondary: '#D9DDE9',
        },
        white: {
          DEFAULT: '#FFFFFF',
          secondary: '#F6F7FA',
        },
        purple: {
          DEFAULT: '#7058E1',
          secondary: '#5437D7',
        },
        pink: {
          DEFAULT: '#FF504E',
          secondary: '#F14A48',
        },
        darkerGray: {
          DEFAULT: '#505364',
          secondary: '#454856',
        },
        blue: {
          DEFAULT: '#0011FF',
          secondary: '#0614E0',
        },
        yellow: {
          DEFAULT: '#FFCD00',
          secondary: '#EFC000',
        },
      },
      fontFamily: {
        roboto: 'Roboto',
      },
    },
  },
  plugins: [],
};
