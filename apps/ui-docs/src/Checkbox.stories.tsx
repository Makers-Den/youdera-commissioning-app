import React from 'react';
import { Meta, Story, ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from 'ui/checkboxes/Checkbox';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Checkbox,
  title: 'Components/Checkbox',
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = args => (
  <CenterWrapper>
    <Checkbox {...args} />
  </CenterWrapper>
);

export const Overview = () => (
  <CenterWrapper>
    <div className="flex flex-col items-start gap-2">
      <Checkbox isChecked={false} onClick={() => undefined} />
      <Checkbox isChecked={true} onClick={() => undefined} />
      <Checkbox
        isChecked={false}
        onClick={() => undefined}
        label="This checkbox has a label"
      />
      <Checkbox
        isChecked={true}
        onClick={() => undefined}
        label="This checkbox has a label"
      />
    </div>
  </CenterWrapper>
);

export const Playground = Template.bind({});
