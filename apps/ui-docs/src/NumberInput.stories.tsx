/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { NumberInput } from 'ui/inputs/NumberInput';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
	component: NumberInput,
	title: 'Components/NumberInput',
} as ComponentMeta<typeof NumberInput>;


type StoryType = ComponentStory<typeof NumberInput>;

// 👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof NumberInput> = args => {
	const [valueNumber, setValueNumber] = React.useState<string>('');
	return (
		<CenterWrapper>
			<NumberInput {...args} unit='ms' label='Label' placeholder='Placeholder' value={valueNumber} setValue={setValueNumber} />
		</CenterWrapper>
	)
};


export const Playground: StoryType = Template.bind({});

