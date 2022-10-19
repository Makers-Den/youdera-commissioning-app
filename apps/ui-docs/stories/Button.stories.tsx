import React from "react";
import { Meta, Story } from "@storybook/react";
import { Typography } from 'ui/typography/Typography'

export default {
    component: Typography,
    title: 'Components/First-2',
} as Meta;

const Template: Story = (args) => <Typography {...args}>This is some cool text</Typography>;

export const H1 = Template.bind({
    variant: 'h1'
});
export const H2 = Template.bind({
    variant: 'h2'
});
