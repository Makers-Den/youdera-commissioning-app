import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Compass } from 'ui/compass/Compass';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { Input } from 'ui/inputs/Input';
import { NumberInput } from 'ui/inputs/NumberInput';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

export const FieldCreationDialog = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const [specificYield, setSpecificYield] = useState<string>('');
  const [slantAngle, setSlantAngle] = useState<string>('0');
  const [azimut, setAzimut] = useState<string>('0');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handleYieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSpecificYield(e.target.value);

  return (
    <Dialog open={open} onClose={onClose} className={className}>
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({
            defaultMessage: 'Module field creation',
          })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col space-y-5">
        <Input
          label={intl.formatMessage({ defaultMessage: 'Name' })}
          placeholder="Type here"
          value={name}
          onChange={handleNameChange}
          sizeClass="w-full"
        />
        <Input
          label={intl.formatMessage({ defaultMessage: 'Specific Yield' })}
          placeholder="Type here"
          value={specificYield}
          onChange={handleYieldChange}
          sizeClass="w-full"
        />

        <div className="flex items-center justify-center">
          <div className='space-y-5'>
            <NumberInput
              label="Slant angle"
              value={slantAngle}
              setValue={setSlantAngle}
              unit="&deg;"
            />
            <NumberInput
              label="Azimut"
              value={azimut}
              setValue={setAzimut}
              unit="&deg;"
            />
          </div>
          <Compass rotationAngle={parseInt(azimut, 10)} />
        </div>

        <div className="flex gap-5">
          <Button variant="additional-gray" className="w-full">
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button variant="main-green" className="w-full">
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
