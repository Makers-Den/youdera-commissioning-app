import React from 'react'

import Head from 'next/head'
import { Button } from 'ui/Button'
import { CoolInterface } from 'server/src/lib/CoolInterface'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const coolKid: CoolInterface = {
  amICool: false,
}

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Button />
  </div>
)

export default Home
