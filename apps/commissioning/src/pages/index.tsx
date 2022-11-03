import { AddInverterDialog } from '@src/components/add-inverter/AddInverterDialog';
import { FieldCreationDialog } from '@src/components/field-creation/FieldCreationDialog';
import React from 'react';
import { Button } from 'ui/buttons/Button';


const Home = () => {
  const [isOpen1, setIsOpen1] = React.useState<boolean>(false)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)


  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8">
      <Button onClick={() => setIsOpen1(true)}>Create Field</Button>
      <Button onClick={() => setIsOpen(true)}>Add Inverter</Button>
      <FieldCreationDialog onClose={() => setIsOpen1(false)} open={isOpen1} />
      <AddInverterDialog onClose={() => setIsOpen(false)} open={isOpen} />
    </div>
  );
};

export default Home;
