import React from "react";
import { Meta, Story } from "@storybook/react";
import { Toggle } from 'ui/toggle/Toggle';

export default {
    component: Toggle,
    title: 'Components/Toggle',
} as Meta;

const Template: Story = (args) => <Toggle {...args} />;

export const Default = Template.bind({});

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: 'This toggle has a label'
};

export const Enabled = Template.bind({});
Enabled.args = {
  enabled: true
};
