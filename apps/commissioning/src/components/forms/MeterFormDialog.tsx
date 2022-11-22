import { zodResolver } from '@hookform/resolvers/zod';
import React, { Suspense, useEffect } from 'react';
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
import { MultiSelect } from 'ui/select/MultiSelect'
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Toggle } from 'ui/toggle/Toggle'
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { Field } from './Field';
import { FileField, FileFieldProps } from './FileField';
import { Form } from './Form';
import { MeterModelSelectFields } from './MeterModelSelectFields';

const validation = z.object({
  manufacturer: z.object({ key: z.string(), label: z.string() }),
  model: z.object({
    key: z.string(),
    label: z.string(),
    dependentKey: z.string(),
  }),
  serialNumber: z.string(),
  file: z.any(),
});

type FormValues = z.infer<typeof validation>;

export type MeterFormDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
  title: string;
  submitButtonTitle: string;
  defaultValues?: Partial<FormValues>;
  fileValueMapper?: FileFieldProps['valueMapper'];
};

export const MeterFormDialog = ({
  open,
  onClose,
  className,
  onSubmit,
  title,
  submitButtonTitle,
  defaultValues,
  fileValueMapper,
}: MeterFormDialogProps) => {
  const intl = useIntl();

  const method = useForm({
    resolver: zodResolver(validation),
  });

  const { handleSubmit, reset, formState, control } = method;

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


  const inverters = useWatch({
    name: 'inverters',
    defaultValue: formState.defaultValues?.inverters,
    control,
  })

  const auxiliary = useWatch({
    name: 'auxiliary',
    defaultValue: formState.defaultValues?.auxiliary,
    control,
  })

  const file = useWatch({
    name: 'file',
    defaultValue: formState.defaultValues?.file,
    control,
  });

  const showFields = {
    first: true,
    second: !!model,
    third: !!model && !!serialNumber,
    fourth: !!model && !!serialNumber && !!inverters,
    fifth: !!model && !!serialNumber && !!inverters && !!auxiliary,
    sixth: !!model && !!serialNumber && !!inverters && !!auxiliary && !!file
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle title={title} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
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
            <Suspense fallback="loading">
              <MeterModelSelectFields />
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
                  {...register('serialNumber')}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              )}
            </Field>
          )}
          {showFields.third && (
            <MultiSelect
              label={intl.formatMessage({
                defaultMessage: 'Connected inverters'
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select'
              })}
              options={[]}
              value={[]}
              onChange={() => undefined}
            />
          )}
          {showFields.fourth && (
            <Toggle
              label={intl.formatMessage({
                defaultMessage: 'Auxiliary meter'
              })}
            // checked={}
            // onChange={}
            />
          )}
          {showFields.fifth && (
            <FileField name="file" valueMapper={fileValueMapper}>
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
            </FileField>
          )}
          {showFields.sixth && (
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
          )}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
