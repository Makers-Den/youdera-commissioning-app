/** TODO: use @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-one': {
          default: '#F57E02',
          100: '#FFE0B2',
          300: '#F0950D',
          400: '#F57E02',
          600: '#EA7A04',
        },
        'brand-two': {
          default: '#5CB85C',
          50: '#EFF8EF',
          100: '#DCEDC8',
          200: '#B4DEB4',
          300: '#70B71C',
          400: '#5CB85C',
          // Should we remove this one? It's very close to 400
          600: '#58B158',
        },
        danger: {
          default: '#FF504E',
          100: '#FFCCBC',
          300: '#FF602E',
          400: '#FF504E',
          600: '#F14A48',
        },
        gray: {
          default: '#D9DDE9',
          100: '#F6F7FA',
          300: '#E3E6F2',
          400: '#D9DDE9',
          450: '#CCCCCC',
          500: '#C0C9DF',
          600: '#6D7381',
          700: '#656B7A',
          800: '#585D6A',
          900: '#505364',
          1000: '#454856',
        },
        yellow: {
          default: '#FFCD00',
          200: '#FFE0B2',
          400: '#FFCD00',
          600: '#EFC000',
        },
        blue: {
          default: '#3A9BEB',
          200: '#BBDEFB',
          400: '#3A9BEB',
          700: '#0011FF',
          800: '#0614E0',
        },

        purple: {
          default: '#CD54E1',
          200: '#E1BEE7',
          400: '#CD54E1',
          600: '#7058E1',
          800: '#5437D7',
        },
      },

      fontFamily: {
        primary: ['Roboto', 'sans-serif'],
      },

      dropShadow: {
        small: '0px 1px 3px rgba(0, 0, 0, 0.25)',
        medium: '0px 3px 4px rgba(0, 0, 0, 0.25)',
        large: '0px 7px 15px rgba(40, 46, 124, 0.1)',
      },

      boxShadow: {
        '3xl': '0px -2px 2px 0px rgba(0, 0, 0, 0.10)',
      },

      borderRadius: {
        button: '0.25rem',
      },

      animation: {
        'spin-slow': 'spin 45s linear infinite',
      },

      maxWidth: {
        container: '28rem',
      },
    },
  },
  plugins: [],
};
