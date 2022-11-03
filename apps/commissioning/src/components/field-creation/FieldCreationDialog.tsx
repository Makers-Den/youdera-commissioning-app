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
import clsxm from 'ui/utils/clsxm';

// TODO: Handlers for Cancel and Save buttons

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
    <Dialog open={open} onClose={onClose} className={clsxm('w-[400px]', className)}>
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
      <DialogContent className="flex flex-col gap-5">
        <Input
          label={intl.formatMessage({ defaultMessage: 'Name' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
          value={name}
          onChange={handleNameChange}
          className="w-full"
        />
        <Input
          label={intl.formatMessage({ defaultMessage: 'Specific Yield' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
          value={specificYield}
          onChange={handleYieldChange}
          className="w-full"
          units='kWh/kWp'
        />

        <div className="flex items-center justify-center gap-5">
          <div className='flex flex-col gap-5 flex-1'>
            <NumberInput
              label={intl.formatMessage({ defaultMessage: 'Slant angle' })}
              value={slantAngle}
              setValue={setSlantAngle}
              unit="&deg;"
              className='w-full'
              max='359'
            />
            <NumberInput
              label={intl.formatMessage({ defaultMessage: 'Azimut' })}
              value={azimut}
              setValue={setAzimut}
              unit="&deg;"
              className='w-full'
              max='359'
            />
          </div>
          <Compass rotationAngle={parseInt(azimut, 10)} className='flex-1' />
        </div>

        <div className="flex mt-3 gap-5">
          <Button variant="additional-gray" className="w-full" onChange={() => undefined}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button variant="main-green" className="w-full" onChange={() => undefined}>
            {intl.formatMessage({ defaultMessage: 'Save' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
