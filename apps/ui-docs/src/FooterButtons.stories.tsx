import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { FooterButtons } from 'ui/footer/FooterButtons';
import { H3 } from 'ui/typography/Typography';

export default {
	component: FooterButtons,
	title: 'Components/FooterButtons',
} as ComponentMeta<typeof FooterButtons>;

type StoryType = ComponentStory<typeof FooterButtons>;

const Template: ComponentStory<typeof FooterButtons> = args => <FooterButtons {...args} />;

export const Overview = () => (
	<div className="flex flex-col gap-3">
		<H3>FooterButtons</H3>
		<FooterButtons
			buttons={[
				{ content: 'Back', variant: 'additional-white' },
				{ content: 'Ok' },
			]}
		/>
	</div>
);

export const Playground: StoryType = Template.bind({});
Playground.args = {
	buttons: [
		{ content: 'Back', variant: 'additional-white' },
		{ content: 'Ok' },
	]
};
