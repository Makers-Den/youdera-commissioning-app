import { zodResolver } from '@hookform/resolvers/zod';
import { Module } from '@src/api/youdera/apiTypes';
import { useModulesQuery } from '@src/api/youdera/hooks/modules/hooks';
import React, { useEffect } from 'react';
import { DeepPartial, FieldValues, useForm, UseFormRegister } from 'react-hook-form';
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
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import clsxm from 'ui/utils/clsxm';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { Form } from './Form';
import { SelectField } from './SelectField';

type RawFormShape = {
  moduleType: ZodTypeAny;
  numberOfModules: ZodTypeAny;
  cableCrossSection: ZodTypeAny;
};

export type StringModuleTypeDialogProps<
  ResolverType extends ZodObject<RawFormShape>,
> = {
  open: DialogProps['open'];
  onClose: (resetForm: () => void) => void;
  className?: string;
  onSubmit: (values: z.infer<ResolverType>, resetForm: () => void, modifiedStringId?: number | undefined) => void;
  resolver: ResolverType;
  modifiedStringId?: number;
  defaultValues?: DeepPartial<z.infer<ResolverType>>
};

export const StringModuleTypeDialog = <
  ResolverType extends ZodObject<RawFormShape>,
>({
  open,
  onClose,
  className,
  onSubmit,
  resolver,
  modifiedStringId,
  defaultValues
}: StringModuleTypeDialogProps<ResolverType>) => {
  const intl = useIntl();

  // * Options
  const modulesQuery = useModulesQuery();
  const modules = modulesQuery.data as Module[];
  const moduleOptions = modules.map(module => ({
    key: module.id.toString(),
    label: module.name,
    value: module,
  }));

  const cableCrossSectionOptions = [
    { key: '4', label: '4 mm²' },
    { key: '6', label: '6 mm²' },
    { key: '10', label: '10 mm²' },
  ];
  // *

  const method = useForm({
    resolver: zodResolver(resolver),
    defaultValues
  });

  const { handleSubmit, reset, formState } = method;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Dialog
      open={open}
      onClose={() => onClose(reset)}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle
          title={
            modifiedStringId
              ? intl.formatMessage({
                defaultMessage: 'Modify String',
              })
              : intl.formatMessage({
                defaultMessage: 'Add String',
              })
          }
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={() => onClose(reset)}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Form
          onSubmit={handleSubmit(values => onSubmit(values, reset, modifiedStringId))}
          className="flex flex-col gap-5"
          {...method}
        >
          <SelectField
            name="moduleType"
            options={moduleOptions}
            label={intl.formatMessage({ defaultMessage: 'Module type' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          />

          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-1 gap-5">
              <Field name="numberOfModules">
                {(
                  register: UseFormRegister<FieldValues>,
                  fieldState: FieldState,
                ) => (
                  <NumberInput
                    label={intl.formatMessage({
                      defaultMessage: 'Number of modules',
                    })}
                    className="w-full"
                    max="359"
                    {...register('numberOfModules', {
                      setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                    })}
                    validity={fieldState.invalid ? 'invalid' : undefined}
                  />
                )}
              </Field>
              <SelectField
                name="cableCrossSection"
                options={cableCrossSectionOptions}
                label={intl.formatMessage({
                  defaultMessage: 'Cable cross section',
                })}
                placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
                wrapperClassName="w-full"
              />
            </div>
          </div>

          <div className="mt-3 flex gap-5">
            <Button
              variant="additional-gray"
              className="w-full"
              onClick={() => onClose(reset)}
            >
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button
              isLoading={formState.isSubmitting}
              variant="main-green"
              className="w-full"
              type="submit"
            >
              {intl.formatMessage({ defaultMessage: 'Ok' })}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
