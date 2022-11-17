import { zodResolver } from '@hookform/resolvers/zod';
import { Module, String } from '@src/integrations/youdera/apiTypes';
import { useGetModules } from '@src/integrations/youdera/modules/hooks/useGetModules';
import { useStringDetailsQuery } from '@src/integrations/youdera/stringsApiHooks';
import { defaultConfig } from 'next/dist/server/config-shared';
import React from 'react';
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form';
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
import { string, z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { Form } from './Form';

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
  onSubmit: (values: z.infer<ResolverType>, resetForm: () => void) => void;
  resolver: ResolverType;
  modifiedStringId?: number;
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
}: StringModuleTypeDialogProps<ResolverType>) => {
  const intl = useIntl();

  const stringDetailsQuery = useStringDetailsQuery(modifiedStringId ?? -1);
  const stringDetails = stringDetailsQuery.data as String;
  console.log({ stringDetails })
  // * Options
  const { modulesQuery } = useGetModules();
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
  const defaultModuleOption = moduleOptions.filter(
    module => module.key === stringDetails.module.toString(),
  )[0];
  const defaultCableCrossSectionOption = cableCrossSectionOptions.filter(
    section => section.key === stringDetails.cable_cross_section.toString(),
  )[0];
  const method = useForm({
    resolver: zodResolver(resolver),
    defaultValues: modifiedStringId
      ? {
        moduleType: defaultModuleOption,
        cableCrossSection: defaultCableCrossSectionOption,
        numberOfModules: stringDetails.count,
      }
      : undefined,
  });

  const { handleSubmit, reset, formState, getValues } = method;

  return (
    <Dialog
      open={open}
      onClose={() => onClose(reset)}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({
            defaultMessage: 'Add String',
          })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={() => onClose(reset)}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Form
          onSubmit={handleSubmit(values => onSubmit(values, reset))}
          className="flex flex-col gap-5"
          {...method}
        >
          <Field name="moduleType">
            {(
              register: UseFormRegister<FieldValues>,
              fieldState: FieldState,
            ) => {
              const { onChange, ...rest } = register('moduleType', {
                setValueAs: v => v || '',
              });
              return (
                <Select
                  label={intl.formatMessage({ defaultMessage: 'Module type' })}
                  placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
                  options={moduleOptions}
                  onChange={value =>
                    onChange({ target: { value, name: 'moduleType' } })
                  }
                  {...rest}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              );
            }}
          </Field>
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
              <Field name="cableCrossSection">
                {(
                  register: UseFormRegister<FieldValues>,
                  fieldState: FieldState,
                ) => {
                  const { onChange, ...rest } = register('cableCrossSection', {
                    setValueAs: v => v || '',
                  });
                  return (
                    <Select
                      wrapperClassName="z-30"
                      label={intl.formatMessage({
                        defaultMessage: 'Cable cross section',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select',
                      })}
                      options={cableCrossSectionOptions}
                      onChange={value =>
                        onChange({
                          target: { value, name: 'cableCrossSection' },
                        })
                      }
                      {...rest}
                      validity={fieldState.invalid ? 'invalid' : undefined}
                    />
                  );
                }}
              </Field>
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
