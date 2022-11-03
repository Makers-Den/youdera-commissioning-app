import { useAuth } from '@src/integrations/youdera/auth/hooks/useAuth';
import { useModels } from '@src/integrations/youdera/models/hooks/useModels';
import React, { useEffect, useMemo, useState } from 'react';
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
  const { loginMutation } = useAuth()

  // TEMPORARY FUNC FOR AUTH
  const handleOnLogin = async () => {
    try {
      await loginMutation.mutateAsync({
        email: 'roo@fer.com',
        password: 'roofer123',
        remember: true
      });
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    handleOnLogin()
  }, [])
  //

  const inverterModels: AutocompleteSelectOption[] | [] = useMemo(
    () =>
      (inverterModelsQuery.data || [])
        .map((model) => ({ key: model.id.toString(), label: model.name, icon: "Table" })),
    [inverterModelsQuery.data]
  );

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
          options={[]}
          select={select}
          setSelect={setSelect}
          label={intl.formatMessage({ defaultMessage: 'Model' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({ defaultMessage: 'Nothing found.' })}
        />
        <AutocompleteSelect
          options={inverterModels}
          select={select}
          setSelect={setSelect}
          label={intl.formatMessage({ defaultMessage: 'Model' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({ defaultMessage: 'Nothing found.' })}
        />
      </DialogContent>
    </Dialog>
  );
};