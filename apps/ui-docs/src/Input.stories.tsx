import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import { Input } from 'ui/inputs/Input';
import { NumberInput } from 'ui/inputs/NumberInput';
import { H3, Label } from 'ui/typography/Typography';

import { CenterWrapper } from './utils/CenterWrapper';

export default {
  component: Input,
  title: 'Components/Input',
  argTypes: {
    validity: {
      options: ['valid', 'invalid', undefined],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Input>;

type StoryType = ComponentStory<typeof Input>;

const Template: ComponentStory<typeof Input> = args => {
  const [value, setValue] = React.useState<string>('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <CenterWrapper>
      <Input {...args} value={value} onChange={handleValueChange} />
    </CenterWrapper>
  )
};

export const Overview = () => {
  const [value, setValue] = React.useState<string>('');
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const [valueNumber, setValueNumber] = React.useState<string>('');
  const [valueSecNumber, setValueSecNumber] = React.useState<string>('');

  return (
    <div className='space-y-12'>
      <H3>Text Input</H3>
      <div className="grid w-full grid-cols-3 items-center justify-center gap-3">
        <Input
          label="Normal input"
          placeholder="Normal input"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Icons"
          placeholder="Icons"
          icon="Calendar"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Units"
          placeholder="Units"
          units="kWh/kWp"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Invalid"
          placeholder="Invalid"
          validity="invalid"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Valid"
          placeholder="Valid"
          validity="valid"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Validity with units"
          placeholder="Validity with units"
          validity="invalid"
          units="PLN"
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Mandatory"
          placeholder="Mandatory"
          icon="Calendar"
          mandatory
          onChange={handleValueChange}
          value={value}
        />
        <Input
          label="Disabled"
          placeholder="Disabled"
          onChange={handleValueChange}
          icon="Calendar"
          value={value}
          disabled={!!true}
        />
      </div>
      <div>
        <H3>Number Input </H3>
        <Label>Playground is available in NumberInput component</Label>
      </div>
      <div className="grid w-full grid-cols-3 items-center justify-center gap-3">

        <NumberInput
          label="Number Input"
          placeholder="Number Input"
          value={valueNumber}
          setValue={setValueNumber}
        />
        <NumberInput
          label="Number Input with units"
          placeholder="With units"
          value={valueSecNumber}
          setValue={setValueSecNumber}
          unit="ms"
        />
      </div>
    </div>
  );
};

export const Playground: StoryType = Template.bind({});
Playground.args = {
  label: "Label",
  placeholder: "Placeholder",
  validity: undefined,
};