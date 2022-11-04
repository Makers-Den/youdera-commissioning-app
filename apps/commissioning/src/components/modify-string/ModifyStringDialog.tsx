import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { NumberInput } from 'ui/inputs/NumberInput';
import { Select } from 'ui/select/Select';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import clsxm from 'ui/utils/clsxm';

// TODO: Handlers for Cancel and Save buttons

export const ModifyStringDialog = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {

  const intl = useIntl();

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
        <Select
          label={intl.formatMessage({ defaultMessage: 'Module type' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          options={[
            {
              key: '1',
              label: 'Holder'
            }
          ]}
        />
        <div className="flex items-center justify-center gap-5">
          <div className='flex gap-5 flex-1'>
            <NumberInput
              label={intl.formatMessage({ defaultMessage: 'Number of modules' })}
              className='w-full'
              max='359'
            />
            <NumberInput
              label={intl.formatMessage({ defaultMessage: 'Cable cross section' })}
              unit="mm&#xB2;"
              className='w-full'
              max='359'
            />
          </div>
        </div>

        <div className="flex mt-3 gap-5">
          <Button variant="additional-gray" className="w-full" onChange={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button variant="main-green" className="w-full" onChange={() => undefined}>
            {intl.formatMessage({ defaultMessage: 'Ok' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
