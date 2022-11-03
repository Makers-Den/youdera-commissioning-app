import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Table,
  title: 'Components/Table',
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => (
  <CenterWrapper>
    <Table {...args} />
  </CenterWrapper>
);

export const Overview = Template.bind({});

const columnNames = [
  'Name',
  'Azimut angle',
  'Inclination',
  'Modules#',
  'Specific Yield',
];

function fakeValues() {
  const rowValues = ['Module field', '167°', '167°', '6', '300 kWh/kWp'];

  const result = [];

  for (let i = 0; i < 6; i++) {
    result.push(rowValues);
  }

  return result;
}

Overview.args = {
  children: (
    <>
      <Thead>
        <Tr>
          {columnNames.map(name => (
            <Th key={name}>{name}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {fakeValues().map(rowValues => (
          <Tr>
            {rowValues.map(value => (
              <Td>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </>
  ),
};
