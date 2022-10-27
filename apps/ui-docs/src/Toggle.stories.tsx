import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Toggle } from 'ui/toggle/Toggle';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Toggle,
  title: 'Components/Toggle',
} as Meta;

const Template: Story = args => (
  <CenterWrapper>
    <Toggle {...args} />{' '}
  </CenterWrapper>
);

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'This toggle has a label',
};

export const Enabled = Template.bind({});
Enabled.args = {
  checked: true,
};
