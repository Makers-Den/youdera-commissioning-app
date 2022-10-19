import React from 'react'

import { H1, H2, H3, BodyText } from 'ui/typography/Typography'
import { Button } from 'ui/buttons/Button'
import { Input } from 'ui/inputs/Input'

const Home = () => (
  <div className="flex items-center justify-center min-h-screen py-2 space-x-8">
    <div className="flex flex-col space-y-8">
      <H1>Test of headers</H1>
      <H2>Test of headers</H2>
      <H3>Test of headers</H3>
    </div>
    <div className="flex flex-col space-y-8">
      <BodyText weight='normal'>Test of boldness</BodyText>
      <BodyText weight='medium'>Test of boldness</BodyText>
      <BodyText weight='bold'>Test of boldness</BodyText>
    </div>

    <div className="flex flex-col space-y-8">
      <Button variant='main-orange'>MAIN-ORANGE</Button>
      <Button variant='main-green'>MAIN-GREEN</Button>
      <Button variant='main-gray'>MAIN-GRAY</Button>
      <Button variant='additional-gray'>ADDITIONAL-GRAY</Button>
      <Button variant='additional-white'>ADDITIONAL-WHITE</Button>
      <Button variant='danger'>DANGER</Button>
    </div>

    <div className="flex flex-col space-y-8">
      <Button variant='main-orange' isLoading={!!'true'}>Loading</Button>
      <Button variant='main-green' isLoading={!!'true'}>Loading</Button>
      <Button variant='main-gray' isLoading={!!'true'}>Loading</Button>
      <Button variant='additional-gray' isLoading={!!'true'}>Loading</Button>
      <Button variant='additional-white' isLoading={!!'true'}>Loading</Button>
      <Button variant='danger' isLoading={!!'true'}>Loading</Button>
    </div>

    <div className="flex flex-col space-y-8">
      <Input label='Label Test' />
    </div>
  </div>
)

export default Home
