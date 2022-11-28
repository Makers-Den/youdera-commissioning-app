const withTM = require('next-transpile-modules')(['ui']);
const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  dryRun: process.env.NEXT_PUBLIC_ENABLE_SENTRY !== 'TRUE',
};

module.exports = withSentryConfig(
  withTM({
    output: 'standalone',
    reactStrictMode: true,
    i18n: {
      locales: ['en-GB', 'de-DE'],
      defaultLocale: 'en-GB',
    },
    sentry: {
      // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
      // for client-side builds. (This will be the default starting in
      // `@sentry/nextjs` version 8.0.0.) See
      // https://webpack.js.org/configuration/devtool/ and
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
      // for more information.
      hideSourceMaps: true,
    },
  }),
  sentryWebpackPluginOptions,
);
