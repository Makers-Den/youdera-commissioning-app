import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import '../styles/globals.css';

import German from '../../content/compiled-locales/de.json';
import English from '../../content/compiled-locales/en.json';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // There's some weird type error with @react/types 18+ and NextJs
  // https://github.com/vercel/next.js/issues/36019
  // Working around it with a cast
  const FixedComponent = Component as FunctionComponent;

  const { locale } = useRouter();
  const [shortLocale] = locale ? locale.split('-') : ['en'];

  // @todo move this logic to get server side props?
  const messages = useMemo(() => {
    switch (shortLocale) {
      case 'de':
        return German;
      case 'en':
        return English;
      default:
        return English;
    }
  }, [shortLocale]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <IntlProvider
        locale={shortLocale}
        messages={messages}
        onError={() => null}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FixedComponent {...pageProps} />
      </IntlProvider>
    </>
  );
};

export default MyApp;
