import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
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

type RawFormShape = {
  moduleType: ZodTypeAny;
  numberOfModules: ZodTypeAny;
  cableCrossSection: ZodTypeAny;
};

export type StringCreationFormDialogAProps<
  ResolverType extends ZodObject<RawFormShape>,
> = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: z.infer<ResolverType>, resetForm: () => void) => void;
  resolver: ResolverType;
};

export const StringCreationFormDialogA = <
  ResolverType extends ZodObject<RawFormShape>,
>({
  open,
  onClose,
  className,
  onSubmit,
  resolver,
}: StringCreationFormDialogAProps<ResolverType>) => {

  const intl = useIntl();

  const { register, handleSubmit, watch, reset, formState } = useForm({
    resolver: zodResolver(resolver),
  });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({
            defaultMessage: 'Modify String',
          })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <form onSubmit={handleSubmit(values => onSubmit(values, reset))}>
          <Select
            label={intl.formatMessage({ defaultMessage: 'Module type' })}
            placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
            options={[
              {
                key: '1',
                label: 'Holder',
              },
            ]}
            {...register('moduleType')}
          />
          <div className="flex items-center justify-center gap-5">
            <div className="flex flex-1 gap-5">
              <NumberInput
                label={intl.formatMessage({
                  defaultMessage: 'Number of modules',
                })}
                className="w-full"
                max="359"
                {...register('numberOfModules', {
                  setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                })}
              />
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
              />
            </div>
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
              variant="main-green"
              className="w-full"
              type='submit'
            >
              {intl.formatMessage({ defaultMessage: 'Ok' })}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
