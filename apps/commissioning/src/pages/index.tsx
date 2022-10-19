import React from 'react'

import Head from 'next/head'
import { Button } from 'ui/src/Button'
import { H1, H2, H3, BodyText } from 'ui/src/typography/Typography'

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <H1>Test of headers</H1>
      <H2>Test of headers</H2>
      <H3>Test of headers</H3>

      <BodyText weight='normal'>Test of boldness</BodyText>
      <BodyText weight='medium'>Test of boldness</BodyText>
      <BodyText weight='bold'>Test of boldness</BodyText>

      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="text-redtest">This text should use a custom color</h1>
    <Button />
  </div>
)

export default Home
