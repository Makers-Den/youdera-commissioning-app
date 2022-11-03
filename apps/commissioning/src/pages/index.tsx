import { FieldCreationDialog } from '@src/components/field-creation/FieldCreationDialog';
import React, { useState } from 'react';
import { Button } from 'ui/buttons/Button';
import {
  AutocompleteSelect,
  AutocompleteSelectOption,
} from 'ui/select/AutocompleteSelect';
import { Select } from 'ui/select/Select'

const options: AutocompleteSelectOption[] = [];

for (let i = 0; i < 10; i += 1) {
  options.push({
    key: `${i}`,
    label: `T-${i}00`,
    icon: 'Envelope',
  });
}

const Home = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [value, setValue] = useState<AutocompleteSelectOption>();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <FieldCreationDialog onClose={() => setIsOpen(false)} open={isOpen} />
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
      <Select label="Label" placeholder="sth" options={options} wrapperClassName='w-64' />
    </div>
  );
};

export default Home;
