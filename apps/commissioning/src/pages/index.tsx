import React, { useState } from 'react';
import { Input } from 'ui/inputs/Input';
import { NumberInput } from 'ui/inputs/NumberInput';
import {
  AutocompleteSelect,
  AutocompleteSelectOption,
} from 'ui/select/AutocompleteSelect';
import { Select } from 'ui/select/Select';

const options: AutocompleteSelectOption[] = [];

for (let i = 0; i < 10; i += 1) {
  options.push({
    key: `${i}`,
    label: `T-${i}00`,
    icon: 'Envelope',
  });
}

const Home = () => {
  const [value, setValue] = useState<AutocompleteSelectOption>();
  const handleAutoSelect = (val: AutocompleteSelectOption | undefined) =>
    setValue(val);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-8">
      <AutocompleteSelect
        label="Label"
        placeholder="Placeholder"
        options={options}
        className="z-20"
        action={{ label: 'Add', onClick: () => alert('aaa'), icon: 'Plus' }}
        value={value}
        onChange={handleAutoSelect}
        noOptionsString="Nothing found."
        validity='invalid'
      />
      <Select
        label="Label"
        placeholder="sth"
        options={options}
        wrapperClassName="w-64"
        validity='invalid'
      />
      <Input label='Input' validity='invalid' />
      <NumberInput label='NumberInput' validity='invalid' />
    </div>
  );
};

export default Home;
