import { zodResolver } from '@hookform/resolvers/zod';
import { Inverter } from '@src/api/youdera/apiTypes';
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
import { MultiSelectOption } from 'ui/select/MultiSelect'
import { SelectOption } from 'ui/select/Select';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z } from 'zod';

import { Field } from './Field';
import { FileField, FileFieldProps } from './FileField';
import { Form } from './Form';
import { MeterModelSelectFields } from './MeterModelSelectFields';
import { MultiSelectField } from './MultiSelectField';
import { SelectField } from './SelectField';
import { ToggleField } from './ToggleField';

const validation = z.object({
  manufacturer: z.object({ key: z.string(), label: z.string() }),
  model: z.object({
    key: z.string(),
    label: z.string(),
    dependentKey: z.string(),
  }),
  connectedInverters: z.array(z.object({
    key: z.string(),
    label: z.string(),
  })),
  serialNumber: z.string(),
  auxiliary: z.boolean(),
  file: z.any(),
  type: z.object({
    key: z.string(),
    label: z.string(),
    icon: z.string(),
  })
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

  const method = useForm({
    resolver: zodResolver(validation),
  });

  const { handleSubmit, reset, formState, control, getValues } = method;
  console.log(getValues())
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const meterType = useWatch({
    name: 'meterType',
    defaultValue: formState.defaultValues?.meterType,
    control,
  });

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


  const connectedInverters = useWatch({
    name: 'connectedInverters',
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
    second: !!meterType,
    third: !!meterType && !!model,
    fourth: !!meterType && !!model && !!serialNumber,
    fifth: !!meterType && !!model && !!serialNumber && !!connectedInverters,
    sixth: !!meterType && !!model && !!serialNumber && !!connectedInverters && !!file
  };

  // * Options
  const meterTypeOptions: SelectOption[] = [
    {
      key: 'generation',
      label: intl.formatMessage({
        defaultMessage: 'Generation',
      }),
      icon: 'Industry',
    },
    {
      key: 'import-export',
      label: intl.formatMessage({
        defaultMessage: 'Import/Export',
      }),
      icon: 'Download',
    },
    {
      key: 'consumption',
      label: intl.formatMessage({
        defaultMessage: 'Consumption',
      }),
      icon: 'Plug',
    },
    {
      key: 'own-consumption',
      label: intl.formatMessage({
        defaultMessage: 'Own consumption',
      }),
      icon: 'Lightbulb',
    },
  ]
  // *

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
            <SelectField
              name="meterType"
              options={meterTypeOptions}
              label={intl.formatMessage({
                defaultMessage: 'Meter type',
              })}
              placeholder={intl.formatMessage({
                defaultMessage: 'Select',
              })}
            />

          )}
          {showFields.second && (
            <Suspense fallback="loading">
              <MeterModelSelectFields />
            </Suspense>
          )}
          {showFields.third && (
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
          {showFields.fourth &&
            (
              <MultiSelectField
                name='connectedInverters'
                label={intl.formatMessage({
                  defaultMessage: 'Connected inverters'
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select'
                })}
                wrapperClassName='z-10'
              >

                {inverters && inverters.map((inverter, idx) => (
                  <MultiSelectOption value={{
                    key: inverter.id.toString(),
                    label: inverter.name ?? 'Inverter',
                  }}
                  >
                    {() => (
                      <div>
                        <Typography variant="body" weight="medium">
                          {intl.formatMessage({
                            defaultMessage: 'Inverter',
                          })} {idx} {inverter.name ? `– ${inverter.name}` : ''}
                        </Typography>
                        <Typography variant="label"> {intl.formatMessage({
                          defaultMessage: 'SN',
                          description: 'Context: Shortcut from Serial Number'
                        })}: {inverter.serial_number}</Typography>
                      </div>)}
                  </MultiSelectOption>
                ))}
              </MultiSelectField>
            )
          }
          {
            showFields.fifth && (
              <>
                <div className='flex h-20 min-w-[340px] bg-gray-100 justify-center items-center rounded-md'>
                  <ToggleField
                    name='auxiliary'
                    label={intl.formatMessage({
                      defaultMessage: 'Auxiliary meter'
                    })}
                  />
                </div>
                <FileField name="file" valueMapper={fileValueMapper} className="w-[340px]">
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
              </>
            )
          }
          {
            showFields.sixth && (
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
            )
          }
        </Form>
      </DialogContent>
    </Dialog>
  );
};
