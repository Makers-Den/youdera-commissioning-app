import { Container } from '@src/components/container/Container';
import React from 'react';
import { RadioGroup } from 'ui/radio-group/RadioGroup';

const options = [
  { name: 'elo', value: 'elo' },
  { name: '1', value: '1' },
  { name: '2', value: '2' },
];
export const Development = () => (
  <Container title="Development Page">
    <RadioGroup options={options} defaultOption={options[0]} />
  </Container>
);
