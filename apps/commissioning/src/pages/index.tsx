import React, { useState } from 'react';
import {
  AutocompleteSelect,
  AutocompleteSelectOption,
} from 'ui/select/AutocompleteSelect';
import { Select, SelectOption } from 'ui/select/Select';

const Home = () => {
  function createOptions() {
    const options: AutocompleteSelectOption[] = [];

    for (let i = 0; i < 10; i += 1) {
      options.push({
        key: `${i}`,
        label: `T-${i}00`,
        icon: 'Envelope',
      });
    }

    return options;
  }
  const [value, setValue] = useState<string>();
  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center space-x-8">
      <AutocompleteSelect
        label="Label"
        placeholder="Placeholder"
        options={createOptions()}
        className="w-[250px]"
        action={{ label: 'Add', onClick: () => alert('aaa'), icon: 'Plus' }}
        value={value}
        setValue={setValue}
        noOptionsString='Nothing found.'
      />
      <Select label="Label" placeholder="sth" options={createOptions()} />
    </div>
  );
};

export default Home;
