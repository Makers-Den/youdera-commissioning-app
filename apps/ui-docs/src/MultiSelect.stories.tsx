import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MultiSelect, MultiSelectOption } from 'ui/select/MultiSelect';

import { CenterWrapper } from './utils/CenterWrapper';
import { Typography } from 'ui/typography/Typography';

export default {
  component: MultiSelect,
  title: 'Components/MultiSelect',
} as ComponentMeta<typeof MultiSelect>;

function createOptions() {
  const options: MultiSelectOption[] = [];

  for (let i = 0; i < 10; i++) {
    options.push({
      key: `${i}`,
      label: {
        selected: `Inverter ${i}`,
        option: (
          <div>
            <Typography variant="body" weight="medium">
              Inverter {i} – AXITEC AXIpremium XXL
            </Typography>
            <Typography variant="label">SN: fb653d4f-32aa-44b8</Typography>
          </div>
        ),
      },
    });
  }

  return options;
}

const Template: ComponentStory<typeof MultiSelect> = args => {
  const [values, setValues] = useState<MultiSelectOption[]>([]);
  return (
    <CenterWrapper>
      <MultiSelect {...args} onChange={setValues} value={values} />
    </CenterWrapper>
  );
};

export const Overview = Template.bind({});

Overview.args = {
  label: 'Inverter',
  placeholder: 'Select',
  options: createOptions(),
  wrapperClassName: 'w-[270px]',
};
