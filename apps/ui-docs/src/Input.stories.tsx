import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Input } from 'ui/inputs/Input';

export default {
  component: Input,
  title: 'Components/Input',
} as ComponentMeta<typeof Input>;

type StoryType = ComponentStory<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default: StoryType = Template.bind({});
