import { hasSecureLoginMethod, initBearerTokenInterceptorOnClientSide } from '@src/api/youdera/api-instances/youdera';
import { useLocalizedZodMessages } from '@src/hooks/useLocalizedZodMessages';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NProgress from 'nprogress'
import React, { FunctionComponent, ReactNode, useEffect, useMemo } from 'react';
import { IntlProvider } from 'react-intl';

import 'nprogress/nprogress.css'
import '../styles/globals.css';

import German from '../../content/compiled-locales/de.json';
import English from '../../content/compiled-locales/en.json';


if (typeof window !== "undefined") {
  if (!hasSecureLoginMethod) {
    initBearerTokenInterceptorOnClientSide();
  }
}

const WithLocalizedZod = ({ children }: { children?: ReactNode }) => {
  // This will fetch intl and localize all the generic error messages.
  // Schema specific messages need to be defined together with schema.
  useLocalizedZodMessages();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

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

  const router = useRouter()

  useEffect(() => {
    const handleStart = (_url: string) => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

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
            <WithLocalizedZod>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <FixedComponent {...pageProps} />
            </WithLocalizedZod>
          </IntlProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
};


export default MyApp;
