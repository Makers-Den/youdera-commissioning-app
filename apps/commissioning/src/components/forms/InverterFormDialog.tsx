import { zodResolver } from '@hookform/resolvers/zod';
import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
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

import { Field } from './Field';
import { FileFieldProps } from './FileField';
import { FilesField } from './FilesField';
import { Form } from './Form';
import { InverterModelSelectFields } from './InverterModelSelectFields';
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
  files: z.array(z.any()).nonempty(),
});

type FormValues = z.infer<typeof validation>;

export type InverterFormDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
  title: string;
  submitButtonTitle: string;
  defaultValues?: Partial<Omit<FormValues, 'files'> & { files: any[] }>;
  fileValueMapper?: FileFieldProps['valueMapper'];
};

export const InverterFormDialog = ({
  open,
  onClose,
  className,
  onSubmit,
  title,
  submitButtonTitle,
  defaultValues,
  fileValueMapper,
}: InverterFormDialogProps) => {
  const intl = useIntl();

  const refinedValidation = useMemo(
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
    resolver: zodResolver(refinedValidation),
  });

  const { handleSubmit, reset, formState, control } = method;

  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const model = useWatch({
    name: 'model',
    defaultValue: formState.defaultValues?.model,
    control,
  });

  const serialNumber = useWatch({
    name: 'serialNumber',
    defaultValue: formState.defaultValues?.serialNumber,
    control,
  });

  const file = useWatch({
    name: 'files',
    defaultValue: formState.defaultValues?.file,
    control,
  });

  const isSerialNumber = (model && model.autoSerialnumber) || !!serialNumber;

  const showFields = {
    first: true,
    second: model && !model.autoSerialnumber,
    third: !!model && isSerialNumber,
    fourth: !!model && isSerialNumber && !!file,
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
              <InverterModelSelectFields />
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
                    shouldUnregister: true,
                  })}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              )}
            </Field>
          )}
          {showFields.third && (
            <FilesField name="files" valueMapper={fileValueMapper}>
              <div className="flex items-center gap-4">
                <SvgIcon name="Camera" className="text-brand-two-400 w-8" />
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
                    <span className="text-brand-two-400 underline">
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
          {showFields.fourth && (
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
                data-cy="submit-btn"
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
