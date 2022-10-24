import { ComponentMeta, ComponentStory, Meta } from '@storybook/react';
import React from 'react';

import { Button } from 'ui/buttons/Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Button,
  title: 'Components/Button',
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

//👇 Each story then reuses that template
export const Default = Template.bind({});
Default.args = { variant: 'main-orange', children: 'MAIN ORANGE' };

export const DefaultLoading = Template.bind({});
DefaultLoading.args = { variant: 'main-orange', isLoading: true, children: 'MAIN ORANGE' };

