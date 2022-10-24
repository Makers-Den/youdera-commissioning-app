import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { Input } from 'ui/inputs/Input';

import { H2 } from 'ui/typography/Typography';

export default {
  component: Input,
  title: 'Components/Input',
} as ComponentMeta<typeof Box>;

type StoryType = ComponentStory<typeof Input>;

const Template: ComponentStory<typeof Input> = args => <Input {...args} />;

export const Default: StoryType = Template.bind({});
