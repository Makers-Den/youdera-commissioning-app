'use client';

import { Container } from '@src/components/container/Container';
import React from 'react';
import { CustomRadioGroup } from 'ui/radio-group/CustomRadioGroup';
import { RadioGroup } from 'ui/radio-group/RadioGroup';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

const options = [
  { name: 'welcome', value: 'welcome', element: <SvgIcon name="Calendar" /> },
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

      <CustomRadioGroup
        options={options}
        selected={selected}
        onChange={e => {
          setSelected(e);
        }}
      />
    </Container>
  );
};
