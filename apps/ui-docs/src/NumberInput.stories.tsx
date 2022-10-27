import { ComponentMeta, ComponentStory, Meta } from '@storybook/react';
import React from 'react';

import { NumberInput } from 'ui/inputs/NumberInput';
import { CenterWrapper } from './utils/CenterWrapper';

export default {
	component: NumberInput,
	title: 'Components/NumberInput',
} as ComponentMeta<typeof NumberInput>;


type StoryType = ComponentStory<typeof NumberInput>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NumberInput> = args => {
	return (
		<CenterWrapper>
			<NumberInput {...args} />
		</CenterWrapper>
	)
};


export const Playground: StoryType = Template.bind({});

