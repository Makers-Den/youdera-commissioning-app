import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense, useEffect, useMemo } from 'react';
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
import { Input } from 'ui/inputs/Input';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { BatteryModelsSelectField } from './BatteryModelsSelectField';
import { Field } from './Field';
import { FileFieldProps } from './FileField';
import { FilesField } from './FilesField';
import { Form } from './Form';
import { InverterInstancesSelectField } from './InverterInstancesSelectField';
import { SelectFallback } from '../SelectFallback';

const validation = z.object({
  manufacturer: z.object({ key: z.string(), label: z.string() }),
  model: z.object({
    id: z.number(),
    manufacturer_name: z.string(),
    manufacturer_id: z.number(),
    name: z.string(),
    autoSerialnumber: z.boolean().optional(),
    label: z.string(),
    dependentKey: z.string(),
  }),
  serialNumber: z.string().optional(),
  inverter: z.object({
    id: z.number(),
    label: z.string(),
    name: z.any(),
  }),
  files: z.array(z.any()).nonempty(),
});

type FormValues = z.infer<typeof validation>;

export type BatteryFormDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
  title: string;
  submitButtonTitle: string;
  siteId: number;
  defaultValues?: Partial<Omit<FormValues, 'files'> & { files: any[] }>;
  fileValueMapper?: FileFieldProps['valueMapper'];
};

export const BatteryFormDialog = ({
  open,
  onClose,
  className,
  onSubmit,
  title,
  submitButtonTitle,
  siteId,
  defaultValues,
  fileValueMapper,
}: BatteryFormDialogProps) => {
  const intl = useIntl();

  const resolver = useMemo(
    () =>
      validation.refine(
        values => values.model.autoSerialnumber || values.serialNumber,
        {
          path: ['serialNumber'],
          message: intl.formatMessage({
            defaultMessage: 'Serial number is required',
          }),
        },
      ),
    [intl],
  );

  const method = useForm({
    resolver: zodResolver(resolver),
    defaultValues,
  });

  const { handleSubmit, reset, formState, watch, getValues } = method;
  console.log(formState.errors)
  // console.log('values!!!!! ', getValues())

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const [model, serialNumber, inverter, file] = watch([
    'model',
    'serialNumber',
    'inverter',
    'files',
  ]);

  const isSerialNumber = (model && model.autoSerialnumber) || !!serialNumber;


  const showFields = {
    first: true,
    second: model && !model.autoSerialnumber,
    third: model && isSerialNumber,
    fourth: !!model && isSerialNumber && !!inverter,
    fifth: !!model && isSerialNumber && !!inverter && !!file,
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle title={title} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={handleClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Form
          onSubmit={handleSubmit(values =>
            onSubmit(values as FormValues, reset),
          )}
          className="flex flex-col gap-5"
          {...method}
        >
          {showFields.first && (
            <Suspense
              fallback={
                <SelectFallback
                  label={intl.formatMessage({ defaultMessage: 'Manufacturer' })}
                />
              }
            >
              <BatteryModelsSelectField />
            </Suspense>
          )}
          {showFields.second && (
            <Field name="serialNumber">
              {(register, fieldState) => (
                <Input
                  label={intl.formatMessage({
                    defaultMessage: 'Serial number',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'S/N',
                  })}
                  className="w-full"
                  {...register('serialNumber', {
                    shouldUnregister: true
                  })}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              )}
            </Field>
          )}
          {showFields.third && (
            <Suspense
              fallback={
                <SelectFallback
                  label={intl.formatMessage({ defaultMessage: 'Inverter' })}
                />
              }
            >
              <InverterInstancesSelectField siteId={siteId} />
            </Suspense>
          )}

          {showFields.fourth && (
            <FilesField name="files" valueMapper={fileValueMapper}>
              <div className="flex items-center gap-4">
                <SvgIcon name="Camera" className="w-8 text-green-400" />
                <div>
                  <Typography>
                    {intl.formatMessage({
                      defaultMessage: 'Take photo by camera',
                      description:
                        'Context: Take photo by camera or click here to upload',
                    })}
                  </Typography>
                  <Typography>
                    {intl.formatMessage({
                      defaultMessage: 'or',
                      description:
                        'Context: Take photo by camera or click here to upload',
                    })}{' '}
                    <span className="text-green-400 underline">
                      {intl.formatMessage({
                        defaultMessage: 'click here to upload',
                        description:
                          'Context: Take photo by camera or click here to upload',
                      })}
                    </span>
                  </Typography>
                </div>
              </div>
            </FilesField>
          )}
          {showFields.fifth && (
            <div className="mt-3 flex gap-5">
              <Button
                variant="additional-gray"
                className="w-full"
                onClick={handleClose}
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
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
