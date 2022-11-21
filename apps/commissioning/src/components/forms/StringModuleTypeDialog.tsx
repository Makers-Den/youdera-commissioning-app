import { zodResolver } from '@hookform/resolvers/zod';
import { Module, String } from '@src/api/youdera/apiTypes';
import { useModulesQuery } from '@src/api/youdera/hooks/modules/hooks';
import { useStringDetailsQuery } from '@src/api/youdera/hooks/strings/hooks';
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
  const stringDetails = stringDetailsQuery.data as unknown as String;

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
  const defaultModuleOption = () =>
    moduleOptions.filter(
      module => module.key === stringDetails.module.toString(),
    )[0];
  const defaultCableCrossSectionOption = () =>
    cableCrossSectionOptions.filter(
      section => section.key === stringDetails.cable_cross_section.toString(),
    )[0];
  const method = useForm({
    resolver: zodResolver(resolver),
    defaultValues: modifiedStringId
      ? {
          moduleType: defaultModuleOption(),
          cableCrossSection: defaultCableCrossSectionOption(),
          numberOfModules: stringDetails.count,
        }
      : undefined,
  });

  const { handleSubmit, reset, formState } = method;

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
          onSubmit={handleSubmit(values => onSubmit(values, reset))}
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
                wrapperClassName="z-30"
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
