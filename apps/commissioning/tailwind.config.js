/** TODO: use @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  ...require('config/tailwind.config'),

  theme: {
    extend: {
      ...require('config/tailwind.config').theme.extend,
      colors: {
        ...require('config/tailwind.config').theme.extend.colors,
        'brand-one': {
          default: '#F57E02',
          100: '#FFE0B2',
          300: '#F0950D',
          400: '#F3E',
          600: '#EA7A04',
        },
      },
    },
  },
  plugins: [],
};
