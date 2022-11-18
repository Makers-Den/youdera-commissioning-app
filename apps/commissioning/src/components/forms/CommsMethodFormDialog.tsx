import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
import { Select, SelectOption } from 'ui/select/Select';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Label } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { Field } from './Field';
import { Form } from './Form';
import { IpAddressInput } from './IpAddressInput';
import { SelectField } from './SelectField';

const validation = z.object({
  method: z.object({ key: z.string(), label: z.string() }),
  ipAddress: z.string().regex(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/).optional(),
  slaveId: z.string().min(1).max(255),
}).refine(schema => schema.method.key === 'fixed_ip' ? !!schema.ipAddress : true, {
  // TODO: localize
  path: ['ipAddress'],
  message: 'Ip is required',
});

type FormValues = z.infer<typeof validation>;

export type CommsMethodFormDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
};

export type CommType = 'fixed_ip' | 'dhcp';

export const CommsMethodFormDialog = ({
  open,
  onClose,
  className,
  onSubmit,
}: CommsMethodFormDialogProps) => {
  const intl = useIntl();

  const rhfProps = useForm({
    resolver: zodResolver(validation),
  });

  const { setValue, handleSubmit, reset, formState, watch, control } = rhfProps;

  const [methodOption]: [(SelectOption<CommType> | undefined)] = watch(['method']);

  const methodOptions: SelectOption<CommType>[] = [
    {
      key: 'fixed_ip',
      label: intl.formatMessage({ defaultMessage: 'TCP - Fixed IP' })
    } as const,
    {
      key: 'dhcp',
      label: intl.formatMessage({ defaultMessage: 'TCP - DHCP' })
    } as const
  ];

  // reset ip address whenever method changes
  useEffect(() => {
    setValue('ipAddress', undefined);
  }, [methodOption, setValue]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle title={intl.formatMessage({ defaultMessage: 'Communication method' })} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Form
          {...rhfProps}
          onSubmit={handleSubmit(values => {
              onSubmit(values as FormValues, reset);
            }
          )}
          className="flex flex-col gap-5"
        >
          <SelectField
            name="method"    
            options={methodOptions}
            placeholder={intl.formatMessage({ defaultMessage: 'Select method' })}
            label={intl.formatMessage({ defaultMessage: 'Select method' })}
          />

          {methodOption?.key === 'fixed_ip' && (
            <Controller
              name="ipAddress"
              control={control}
              render={
                ({ field, formState }) =>
                  <div>
                    <IpAddressInput value={field.value} onChange={val => field.onChange(val)} />
                    <ErrorMessage
                      errors={formState.errors}
                      name="ipAddress"
                      render={({ message }) => (
                        <Label className="text-red-400">{message}</Label>
                      )}
                    />
                  </div>
              }
            />
          )}

          {methodOption && (
            <Field name="slaveId">
              {(register, fieldState) => (
                <NumberInput
                  label={intl.formatMessage({
                    defaultMessage: 'Slave id',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: '1 - 254',
                  })}
                  type="number"
                  className="w-full"
                  {...register('slaveId')}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              )}
            </Field>
          )}

          <div className="mt-3 flex gap-5">
            <Button
              variant="additional-gray"
              onChange={onClose}
            >
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button
              isLoading={formState.isSubmitting}
              type="submit"
              variant="main-green"
              className="flex-1"
            >
              {intl.formatMessage({ defaultMessage: "Test Communication" })}
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
