import React from "react";
import { Meta, Story } from "@storybook/react";
import { Foobar } from "./Foobar";


export default {
    component: Foobar,
    title: 'Components/Foobar',
} as Meta;

const Template: Story = (args) => <Foobar text={args.text || 'Default hello'} {...args} />

export const Foobar1 = Template.bind({ text: 'Hello Foo' });
