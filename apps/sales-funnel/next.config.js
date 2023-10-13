/** @type {import('next').NextConfig} */

const nextConfig = {
  transpilePackages: ['ui'],
  i18n: {
    locales: ['en-US', 'fr-CH'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
