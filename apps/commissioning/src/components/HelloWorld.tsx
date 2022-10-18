import React from 'react'

import { Button } from 'ui/src/Button'

const HelloWorld = () => (
  <>
    <h1>Hello There!</h1>
    Boop
    <label htmlFor="name">
      <input id="name" name="name" type="text" />
    </label>
    <Button />
  </>
)

export default HelloWorld
