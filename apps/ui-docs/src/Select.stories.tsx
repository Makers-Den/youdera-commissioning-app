import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
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
  const options: JSX.Element[] = [];

  for (let i = 0; i < 10; i += 1) {
    options.push(
      <SelectOption
        value={{
          label: `T-${i}00`,
          icon: 'Battery',
        }}
      >
        {() => `T-${i}00`}
      </SelectOption>,
    );
    options.push();
  }

  return options;
}

export const Overview = Template.bind({});

Overview.args = {
  label: 'Model',
  placeholder: 'Select model',
  children: createOptions(),
  wrapperClassName: 'min-w-[240px]',
};
