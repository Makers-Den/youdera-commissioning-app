import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { H2 } from 'ui/typography/Typography';

export default {
  component: Table,
  title: 'Components/Table',
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = args => <Table {...args} />;

export const Default = Template.bind({});

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

Default.args = {
  children: (
    <Table>
      <Thead>
        <Tr>
          {columnNames.map(name => {
            return <Th key={name}>{name}</Th>;
          })}
        </Tr>
      </Thead>
      <Tbody>
        {fakeValues().map(rowValues => {
          return (
            <Tr>
              {rowValues.map(value => {
                return <Td>{value}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  ),
};
