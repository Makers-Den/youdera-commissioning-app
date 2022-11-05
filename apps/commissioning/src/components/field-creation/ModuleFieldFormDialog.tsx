import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
  onSubmit: (values: z.infer<ResolverType>) => void;
  resolver: ResolverType;
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
}: ModuleFieldFormDialogProps<ResolverType>) => {
  const intl = useIntl();

  const { register, handleSubmit, watch, reset, formState } = useForm({
    resolver: zodResolver(resolver),
  });

  useEffect(() => {
    if (formState.isSubmitted) {
      reset();
    }
  }, [formState.isSubmitted, reset]);

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <Input
            label={intl.formatMessage({ defaultMessage: 'Name' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            className="w-full"
            {...register('name')}
          />
          <Input
            label={intl.formatMessage({ defaultMessage: 'Specific Yield' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Type here' })}
            className="w-full"
            units="kWh/kWp"
            type="number"
            {...register('specificYield', {
              valueAsNumber: true,
            })}
          />

          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-1 flex-col gap-5">
              <NumberInput
                label={intl.formatMessage({ defaultMessage: 'Slant angle' })}
                unit="&deg;"
                className="w-full"
                max="359"
                {...register('slantAngle', {
                  valueAsNumber: true,
                })}
              />
              <NumberInput
                label={intl.formatMessage({ defaultMessage: 'Azimut' })}
                unit="&deg;"
                className="w-full"
                max="359"
                {...register('azimut', {
                  valueAsNumber: true,
                })}
              />
            </div>
            <Compass
              rotationAngle={parseInt(watch('azimut'), 10)}
              className="flex-1"
            />
          </div>

          <div className="mt-3 flex gap-5">
            <Button
              variant="additional-gray"
              className="w-full"
              onChange={onClose}
            >
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button
              isLoading={formState.isSubmitting}
              type="submit"
              variant="main-green"
              className="w-full"
            >
              {submitButtonTitle}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
