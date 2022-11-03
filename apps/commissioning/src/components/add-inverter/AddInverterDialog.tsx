import { useModels } from '@src/integrations/youdera/models/hooks/useModels';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { AutocompleteSelect, AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import clsxm from 'ui/utils/clsxm';

export const AddInverterDialog = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {
  const intl = useIntl();
  const { inverterModelsQuery } = useModels();

  const [select, setSelect] = useState<AutocompleteSelectOption>();
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
        <AutocompleteSelect
          options={[{ label: '12', key: '12' }]}
          select={select}
          setSelect={setSelect}
          label={intl.formatMessage({ defaultMessage: 'Manufacturer' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({ defaultMessage: 'Nothing found.' })}
        />
      </DialogContent>
    </Dialog>
  );
};