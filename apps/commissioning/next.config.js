const withTM = require('next-transpile-modules')(['ui']);

module.exports = withTM({
  output: 'standalone',
  reactStrictMode: true,
  i18n: {
    locales: ['en-GB', 'de-DE'],
    defaultLocale: 'en-GB',
  },
});
