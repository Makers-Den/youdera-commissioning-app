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

export const AddInverterDialog = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {
  const intl = useIntl();
  const [name, setName] = useState<string>('');
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  return (
    <Dialog open={open} onClose={onClose} className={clsxm('w-[400px]', className)}>
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({
            defaultMessage: 'Add Inverter',
          })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        holder
      </DialogContent>
    </Dialog>
  );
};