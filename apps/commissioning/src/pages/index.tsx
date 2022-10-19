import React from 'react'

import { Button } from 'ui/Button'
import { H1, H2, H3, BodyText } from 'ui/typography/Typography'

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <H1>Test of headers</H1>
    <H2>Test of headers</H2>
    <H3>Test of headers</H3>

    <BodyText weight='normal'>Test of boldness</BodyText>
    <BodyText weight='medium'>Test of boldness</BodyText>
    <BodyText weight='bold'>Test of boldness</BodyText>

    <h1 className="text-redtest">This text should use a custom color</h1>
    <Button />
  </div>
)

export default Home
