import { initBearerTokenInterceptorOnClientSide } from '@src/api/youdera/api-instances/youdera';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FunctionComponent, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import '../styles/globals.css';

import German from '../../content/compiled-locales/de.json';
import English from '../../content/compiled-locales/en.json';


if (typeof window !== "undefined") {
  if (process.env.NEXT_PUBLIC_YOUDERA_AUTH_METHOD !== 'SESSION') {
    initBearerTokenInterceptorOnClientSide();
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  // There's some weird type error with @react/types 18+ and NextJs
  // https://github.com/vercel/next.js/issues/36019
  // Working around it with a cast
  const FixedComponent = Component as FunctionComponent;

  const [queryClient] = React.useState(() => new QueryClient());

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
      <QueryClientProvider client={queryClient}>
        {/* @ts-ignore */}
        <Hydrate state={pageProps.dehydratedState}>
          <IntlProvider
            locale={shortLocale}
            messages={messages}
            onError={() => null}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <FixedComponent {...pageProps} />
          </IntlProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
