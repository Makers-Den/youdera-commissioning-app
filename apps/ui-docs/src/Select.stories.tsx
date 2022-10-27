import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Select, SelectOption } from 'ui/select/Select';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Select,
  title: 'Components/Select',
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => (
  <CenterWrapper>
    <Select {...args} />
  </CenterWrapper>
);

function createOptions() {
  const options: SelectOption[] = [];

  for (let i = 0; i < 10; i++) {
    options.push({
      key: `${i}`,
      label: `T-${i}00`,
    });
  }

  return options;
}

export const Overview = Template.bind({});

Overview.args = {
  label: 'Model',
  placeholder: 'Select model',
  options: createOptions(),
  wrapperClassName: 'min-w-[240px]',
};
