import { zodResolver } from '@hookform/resolvers/zod';
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
import { z, ZodObject, ZodTypeAny } from 'zod';

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
};

export const StringModuleTypeDialog = <
  ResolverType extends ZodObject<RawFormShape>,
>({
  open,
  onClose,
  className,
  onSubmit,
  resolver,
}: StringModuleTypeDialogProps<ResolverType>) => {

  const intl = useIntl();

  const method = useForm({
    resolver: zodResolver(resolver),
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
        <Form onSubmit={handleSubmit(values => onSubmit(values, reset))} className="flex flex-col gap-5" {...method}>
          <Field name='moduleType'>
            {(register: UseFormRegister<FieldValues>, fieldState: FieldState) => {
              const { onChange, ...rest } = register('moduleType', {
                setValueAs: v => (v || ''),
              })
              return <Select
                label={intl.formatMessage({ defaultMessage: 'Module type' })}
                placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
                options={[ //TODO: request on this endpoint - {{YOUDERA_API_BASE}}/catalogue/models/module
                  {
                    key: '21',
                    label: 'Holder',
                  },
                ]}
                onChange={(value) => onChange({ target: { value, name: 'moduleType' } })}
                {...rest}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            }}
          </Field>
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-1 gap-5">
              <Field name='numberOfModules'>
                {(register: UseFormRegister<FieldValues>, fieldState: FieldState) =>
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
                }
              </Field>
              <Field name='cableCrossSection'>
                {(register: UseFormRegister<FieldValues>, fieldState: FieldState) =>
                  <NumberInput
                    label={intl.formatMessage({
                      defaultMessage: 'Cable cross section',
                    })}
                    unit="mm&#xB2;"
                    className="w-full"
                    max="359"
                    {...register('cableCrossSection', {
                      setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                    })}
                    validity={fieldState.invalid ? 'invalid' : undefined}
                  />
                }
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
              type='submit'
            >
              {intl.formatMessage({ defaultMessage: 'Ok' })}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
