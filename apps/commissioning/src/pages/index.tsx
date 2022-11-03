import { AddInverterDialog } from '@src/components/add-inverter/AddInverterDialog';
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
  const [isOpen1, setIsOpen1] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [value, setValue] = useState<AutocompleteSelectOption>();
  const handleAutoSelect = (val: AutocompleteSelectOption | undefined) => setValue(val)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <Button onClick={() => setIsOpen1(true)}>Create Field</Button>
      <Button onClick={() => setIsOpen(true)}>Add Inverter</Button>
      <FieldCreationDialog onClose={() => setIsOpen1(false)} open={isOpen1} />
      <AddInverterDialog onClose={() => setIsOpen(false)} open={isOpen} />
      <AutocompleteSelect
        label="Label"
        placeholder="Placeholder"
        options={options}
        className="w-[250px]"
        action={{ label: 'Add', onClick: () => alert('aaa'), icon: 'Plus' }}
        value={value}
        onChange={handleAutoSelect}
        noOptionsString='Nothing found.'
      />
      <Select label="Label" placeholder="sth" options={options} wrapperClassName='w-64' />
    </div>
  );
};

export default Home;
