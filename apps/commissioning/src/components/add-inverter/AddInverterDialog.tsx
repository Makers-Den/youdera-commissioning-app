import { useInverterModels } from '@src/integrations/youdera/models/hooks/useInverterModels';
import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import {
  AutocompleteSelect,
  AutocompleteSelectOption,
} from 'ui/select/AutocompleteSelect';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import clsxm from 'ui/utils/clsxm';

export const AddInverterDialog = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {
  const intl = useIntl();
  const { inverterModelsQuery } = useInverterModels();

  const [manufacturerValue, setManufacturerValue] =
    useState<AutocompleteSelectOption>();
  const handleManufacturerValue = (
    value: AutocompleteSelectOption | undefined,
  ) => setManufacturerValue(value);

  const inverterManufactures: AutocompleteSelectOption[] | [] = useMemo(() => {
    if (!inverterModelsQuery.data) return [];

    const result: AutocompleteSelectOption[] = [];
    const map = new Map();
    inverterModelsQuery.data.forEach(model => {
      if (!map.has(model.manufacturer_id)) {
        map.set(model.manufacturer_id, true);
        result.push({
          key: model.manufacturer_id.toString(),
          label: model.manufacturer_name,
        });
      }
    });
    return result;
  }, [inverterModelsQuery.data]);

  const [modelValue, setModelValue] = useState<AutocompleteSelectOption>();
  const handleModelValue = (value: AutocompleteSelectOption | undefined) =>
    setModelValue(value);

  const inverterModels: AutocompleteSelectOption[] | [] = useMemo(() => {
    if (!manufacturerValue || !inverterModelsQuery.data) return [];
    return inverterModelsQuery.data
      .filter(
        model => model.manufacturer_id.toString() === manufacturerValue.key,
      )
      .map(model => ({
        key: model.id.toString(),
        label: model.name,
        icon: 'Table',
      }));
  }, [inverterModelsQuery.data, manufacturerValue]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
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
          options={inverterManufactures}
          value={manufacturerValue}
          onChange={handleManufacturerValue}
          label={intl.formatMessage({ defaultMessage: 'Manufacturer' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({
            defaultMessage: 'Nothing found.',
          })}
        />
        <AutocompleteSelect
          options={inverterModels}
          value={modelValue}
          onChange={handleModelValue}
          label={intl.formatMessage({ defaultMessage: 'Model' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({
            defaultMessage: 'Nothing found.',
          })}
        />
      </DialogContent>
    </Dialog>
  );
};
