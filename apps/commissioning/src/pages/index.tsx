import React, { useState } from 'react';
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
        className="w-[250px]"
        action={{ label: 'Add', onClick: () => alert('aaa'), icon: 'Plus' }}
        value={value}
        onChange={handleAutoSelect}
        noOptionsString="Nothing found."
      />
      <Select
        label="Label"
        placeholder="sth"
        options={options}
        wrapperClassName="w-64"
      />
    </div>
  );
};

export default Home;
