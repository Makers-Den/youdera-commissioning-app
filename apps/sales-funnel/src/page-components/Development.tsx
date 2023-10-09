'use client';

import { Container } from '@src/components/container/Container';
import React from 'react';
import { CheckboxGroup } from 'ui/checkboxes/CheckboxGroup';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

const options = [
  { name: 'welcome', value: 'welcome', element: <SvgIcon name="Calendar" /> },
  { name: '1', value: '1' },
  { name: '2', value: '2' },
];
export const Development = () => {
  //CheckboxGroup
  const [selected, setSelected] = React.useState([options[0]]);
  //RadioGroup
  // const [selected, setSelected] = React.useState(options[0]);

  return (
    <Container title="Development Page">
      {/* <RadioGroup
        options={options}
        selected={selected}
        onChange={e => {
          setSelected(e);
        }}
      /> */}

      {/* <CustomRadioGroup
        options={options}
        selected={selected}
        onChange={e => {
          setSelected(e);
        }}
      /> */}

      <CheckboxGroup
        options={options}
        selected={selected}
        onChange={e => {
          if (selected.find(item => item.value === e.value)) {
            setSelected(selected.filter(item => item.value !== e.value));
            return;
          }
          setSelected([...selected, e]);
        }}
      />
    </Container>
  );
};