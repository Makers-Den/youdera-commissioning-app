import React from 'react'

import Head from 'next/head'
import { Button } from 'ui/Button'

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title >Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="text-redtest">This text should use a custom color</h1>
    <Button />
  </div>
)

export default Home
