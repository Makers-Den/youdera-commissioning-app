import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { AutocompleteSelect, AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: AutocompleteSelect,
  title: 'Components/AutocompleteSelect',
} as ComponentMeta<typeof AutocompleteSelect>;

const Template: ComponentStory<typeof AutocompleteSelect> = args => (
  <CenterWrapper>
    <AutocompleteSelect {...args} />
  </CenterWrapper>
);

function createOptions() {
  const options: AutocompleteSelectOption[] = [];

  for (let i = 0; i < 10; i = +1) {
    options.push({
      key: `${i}`,
      label: `T-${i}00`,
      icon: 'Table'
    });
  }

  return options;
}

export const Overview = Template.bind({});

Overview.args = {
  label: 'Label',
  placeholder: 'Select',
  options: createOptions(),
  className: 'w-64',
  action: { label: 'Add', onClick: () => alert('It works!'), icon: 'Plus' },
  noOptionsString: 'Nothing found.'
};
