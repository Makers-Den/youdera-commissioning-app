import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import {
  DeepPartial,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
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
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { Form } from './Form';

type RawFormShape = {
  name: ZodTypeAny;
  specificYield: ZodTypeAny;
  slantAngle: ZodTypeAny;
  azimut: ZodTypeAny;
};

export type ModuleFieldFormDialogProps<
  ResolverType extends ZodObject<RawFormShape>,
> = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  dialogTitle: string;
  submitButtonTitle: string;
  onSubmit: (values: z.infer<ResolverType>, resetForm: () => void) => void;
  resolver: ResolverType;
  defaultValues?: DeepPartial<z.infer<ResolverType>>;
};

export const ModuleFieldFormDialog = <
  ResolverType extends ZodObject<RawFormShape>,
>({
  open,
  onClose,
  className,
  dialogTitle,
  submitButtonTitle,
  onSubmit,
  resolver,
  defaultValues,
}: ModuleFieldFormDialogProps<ResolverType>) => {
  const intl = useIntl();

  const method = useForm({
    resolver: zodResolver(resolver),
  });

  const { handleSubmit, watch, reset, formState } = method;

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle title={dialogTitle} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Form
          onSubmit={handleSubmit(values => onSubmit(values, reset))}
          className="flex flex-col gap-5"
          {...method}
        >
          <Field name="name">
            {(
              register: UseFormRegister<FieldValues>,
              fieldState: FieldState,
            ) => (
              <Input
                label={intl.formatMessage({ defaultMessage: 'Name' })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Type here',
                })}
                className="w-full"
                {...register('name')}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>
          <Field name="specificYield">
            {(
              register: UseFormRegister<FieldValues>,
              fieldState: FieldState,
            ) => (
              <Input
                label={intl.formatMessage({ defaultMessage: 'Specific Yield' })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Type here',
                })}
                className="w-full"
                units="kWh/kWp"
                type="number"
                {...register('specificYield', {
                  setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                })}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            )}
          </Field>

          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <Field name="slantAngle">
                {(
                  register: UseFormRegister<FieldValues>,
                  fieldState: FieldState,
                ) => (
                  <NumberInput
                    label={intl.formatMessage({
                      defaultMessage: 'Slant angle',
                    })}
                    unit="&deg;"
                    className="w-full"
                    max="359"
                    {...register('slantAngle', {
                      setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                    })}
                    validity={fieldState.invalid ? 'invalid' : undefined}
                  />
                )}
              </Field>
              <Field name="azimut">
                {(
                  register: UseFormRegister<FieldValues>,
                  fieldState: FieldState,
                ) => (
                  <NumberInput
                    label={intl.formatMessage({ defaultMessage: 'Azimut' })}
                    unit="&deg;"
                    className="w-full"
                    max="359"
                    {...register('azimut', {
                      setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                    })}
                    validity={fieldState.invalid ? 'invalid' : undefined}
                  />
                )}
              </Field>
            </div>
            <Compass
              //@ts-ignore
              rotationAngle={parseInt(watch('azimut'), 10)}
              className="flex-1"
            />
          </div>

          <div className="mt-3 flex gap-5">
            <Button
              variant="additional-gray"
              className="w-full"
              onClick={onClose}
            >
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button
              isLoading={formState.isSubmitting}
              type="submit"
              variant="main-green"
              className="w-full"
              data-cy='submit-btn'
            >
              {submitButtonTitle}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
