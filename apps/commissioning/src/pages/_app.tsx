import React, { FunctionComponent } from 'react'

import { AppProps } from 'next/app'
import '../styles/globals.css'
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  // There's some weird type error with @react/types 18+ and NextJs
  // https://github.com/vercel/next.js/issues/36019
  // Working around it with a cast
  const FixedComponent = Component as FunctionComponent;

  return <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <FixedComponent {...pageProps} />
  </>
}

export default MyApp
