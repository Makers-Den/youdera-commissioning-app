'use client';

import { Container } from '@src/components/container/Container';
import React from 'react';
import { RadioGroup } from 'ui/radio-group/RadioGroup';

const options = [
  { name: 'welcome', value: 'welcome' },
  { name: '1', value: '1' },
  { name: '2', value: '2' },
];
export const Development = () => {
  const [selected, setSelected] = React.useState(options[0]);

  return (
    <Container title="Development Page">
      <RadioGroup
        options={options}
        selected={selected}
        onChange={e => {
          setSelected(e);
        }}
      />
    </Container>
  );
};
