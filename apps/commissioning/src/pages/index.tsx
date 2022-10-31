import { FieldCreationDialog } from '@src/components/field-creation/FieldCreationDialog';
import React from 'react';
import { Button } from 'ui/buttons/Button';


const Home = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <div className="flex items-center justify-center min-h-screen space-x-8 flex-wrap">
      <Button onClick={() => setIsOpen(true)}>Click</Button>
      <FieldCreationDialog onClose={() => setIsOpen(false)} open={isOpen} />
    </div>
  );
};

export default Home;
