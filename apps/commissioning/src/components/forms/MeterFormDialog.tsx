import { zodResolver } from '@hookform/resolvers/zod';
import { Inverter } from '@src/api/youdera/apiTypes';
import { useMeterTypeOptions } from '@src/hooks/useMeterTypeOptions';
import React, { Suspense, useEffect, useMemo } from 'react';
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
import { NumberInput } from 'ui/inputs/NumberInput';
import { MultiSelectOption } from 'ui/select/MultiSelect';
import { SelectOption } from 'ui/select/Select';
import { IconName, SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { Field } from './Field';
import { FileFieldProps } from './FileField';
import { FilesField } from './FilesField';
import { Form } from './Form';
import { MeterModelSelectFields } from './MeterModelSelectFields';
import { MultiSelectField } from './MultiSelectField';
import { SelectField } from './SelectField';
import { ToggleField } from './ToggleField';
import { SelectFallback } from '../SelectFallback';

const validation = z.object({
  meterType: z.object({
    key: z.string(),
    label: z.string(),
    icon: z.string(),
  }),
  manufacturer: z.object({ key: z.string(), label: z.string() }),
  model: z.object({
    id: z.number(),
    manufacturer_name: z.string(),
    manufacturer_id: z.number(),
    name: z.string(),
    autoSerialnumber: z.boolean(),
    indirect: z.boolean(),
    label: z.string(),
    dependentKey: z.string(),
  }),
  factor: z.number().optional(),
  serialNumber: z.string().or(z.undefined()),
  connectedInverters: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
    }),
  ),
  auxiliary: z.boolean(),
  files: z.array(z.any()),
});

export type FormValues = z.infer<typeof validation>;

export type MeterFormDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  onSubmit: (values: FormValues, resetForm: () => void) => void;
  title: string;
  submitButtonTitle: string;
  defaultValues?: Partial<FormValues>;
  fileValueMapper?: FileFieldProps['valueMapper'];
  inverters?: Inverter[];
};

export const MeterFormDialog = ({
  open,
  onClose,
  className,
  onSubmit,
  title,
  submitButtonTitle,
  defaultValues,
  inverters,
  fileValueMapper,
}: MeterFormDialogProps) => {
  const intl = useIntl();
  const meterTypeOptions = useMeterTypeOptions();

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

  const { handleSubmit, reset, formState, watch } = method;
  const handleClose = () => {
    onClose();
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      reset({ auxiliary: false, ...defaultValues });
    } else {
      reset({ auxiliary: false });
    }
  }, [defaultValues, reset]);

  const [meterType, model, factor, serialNumber, connectedInverters, file] =
    watch([
      'meterType',
      'model',
      'factor',
      'serialNumber',
      'connectedInverters',
      'files',
    ]);

  const isSerialNumber = !!model?.autoSerialnumber || !!serialNumber;
  const isFactor = !!model?.indirect || !!factor;
  const showFields = {
    first: true,
    second: !!meterType,
    third: !!model && !model?.indirect, //factor
    fourth: !!meterType && !!model && !model?.autoSerialnumber && isFactor, //serialnumber
    fifth: !!meterType && !!model && isFactor && isSerialNumber,
    sixth:
      !!meterType &&
      !!model &&
      !!connectedInverters &&
      isFactor &&
      isSerialNumber,
    seventh:
      !!meterType &&
      !!model &&
      isFactor &&
      isSerialNumber &&
      !!connectedInverters &&
      !!file,
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
            <SelectField
              name="meterType"
              label={intl.formatMessage({
                defaultMessage: 'Meter type',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select',
              })}
              wrapperClassName="z-40"
            >
              {meterTypeOptions.map(value => (
                <SelectOption icon={value.icon as IconName} value={value}>
                  {() => value.label}
                </SelectOption>
              ))}
            </SelectField>
          )}
          {showFields.second && (
            <Suspense
              fallback={
                <SelectFallback
                  label={intl.formatMessage({ defaultMessage: 'Manufacturer' })}
                />
              }
            >
              <MeterModelSelectFields />
            </Suspense>
          )}
          {showFields.third && (
            <Field name="factor">
              {(register, fieldState) => (
                <NumberInput
                  label={intl.formatMessage({
                    defaultMessage: 'Factor',
                  })}
                  min={1}
                  className="w-full"
                  {...register('factor', {
                    setValueAs: v => (v === '' ? undefined : parseInt(v, 10)),
                    shouldUnregister: true,
                  })}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              )}
            </Field>
          )}
          {showFields.fourth && (
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
          {showFields.fifth && (
            <MultiSelectField
              name="connectedInverters"
              label={intl.formatMessage({
                defaultMessage: 'Connected inverters',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select',
              })}
              wrapperClassName="z-10"
            >
              {inverters &&
                inverters.map(inverter => (
                  <MultiSelectOption
                    value={{
                      key: inverter.id.toString(),
                      label: inverter.name || `Inverter ${inverter.id}`,
                      ...inverter,
                    }}
                  >
                    {() => (
                      <div>
                        <Typography variant="body" weight="medium">
                          {inverter.name || `Inverter ${inverter.id}`}
                        </Typography>
                        <Typography variant="label">
                          {' '}
                          {intl.formatMessage({
                            defaultMessage: 'SN',
                            description:
                              'Context: Abbreviation of Serial Number in inverter selection dropdown',
                          })}
                          : {inverter.serial_number}
                        </Typography>
                      </div>
                    )}
                  </MultiSelectOption>
                ))}
            </MultiSelectField>
          )}
          {showFields.sixth && (
            <>
              <div className="flex h-20 min-w-[340px] items-center justify-center rounded-md bg-gray-100">
                <ToggleField
                  name="auxiliary"
                  label={intl.formatMessage({
                    defaultMessage: 'Auxiliary meter',
                  })}
                />
              </div>
              <FilesField
                name="files"
                valueMapper={fileValueMapper}
                className="w-[340px]"
              >
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
            </>
          )}
          {showFields.seventh && (
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
