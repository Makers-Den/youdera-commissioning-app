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

  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center space-x-8">
      <AutocompleteSelect
        label="Label"
        placeholder="Placeholder"
        options={options}
        className="w-[250px]"
        action={{ label: 'Add', onClick: () => alert('aaa'), icon: 'Plus' }}
        select={value}
        setSelect={setValue}
        noOptionsString='Nothing found.'
      />
      <Select label="Label" placeholder="sth" options={options} />
    </div>
  );
};

export default Home;
