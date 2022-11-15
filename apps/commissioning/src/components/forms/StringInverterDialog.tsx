import { zodResolver } from '@hookform/resolvers/zod';
import { InverterModel } from '@src/integrations/youdera/apiTypes';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import React, { useMemo } from 'react';
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
import {
  AutocompleteSelect,
  AutocompleteSelectOption,
} from 'ui/select/AutocompleteSelect';
import { Select } from 'ui/select/Select';
import { IconName, SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { FileField } from './FileField';
import { Form } from './Form';

// TODO: Handlers for Cancel and Save buttons
type RawFormShape = {
  count?: ZodTypeAny;
  moduleType?: ZodTypeAny;
  cabelCrossSection?: ZodTypeAny;
  inverter?: ZodTypeAny;
  input?: ZodTypeAny;
  file?: ZodTypeAny;
};

export type StringInverterDialogProps<
  ResolverType extends ZodObject<RawFormShape>,
> = {
  inverters: Inverter[];
  inverterModels: InverterModel[];
  open: DialogProps['open'];
  onClose: (reset: () => void) => void;
  className?: string;
  onSubmit: (values: z.infer<ResolverType>, resetForm: () => void) => void;
  resolver: ResolverType;
};

export const StringInverterDialog = <
  ResolverType extends ZodObject<RawFormShape>,
>({
  open,
  onClose,
  className,
  onSubmit,
  resolver,
  inverters,
  inverterModels,
}: StringInverterDialogProps<ResolverType>) => {
  const intl = useIntl();
  const method = useForm({
    resolver: zodResolver(resolver),
  });

  const { handleSubmit, reset, formState, watch } = method;

  const watchInverter = watch('inverter');
  const watchInput = watch('input');
  const watchManufacturer = watch('manufacturer');
  const watchModel = watch('model');
  const watchFile = watch('file');
  //TODO: Waiting for mpp_trackers on backend side
  // const inverterInputs = watchInverter?.key && inverters.filter((inverter) => inverter.id === watchInverter.key)[0]

  const inverterManufactures: AutocompleteSelectOption[] | [] = useMemo(() => {
    if (!inverterModels) return [];

    const result: AutocompleteSelectOption[] = [];
    const map = new Map();
    inverterModels.forEach(model => {
      if (!map.has(model.manufacturer_id)) {
        map.set(model.manufacturer_id, true);
        result.push({
          key: model.manufacturer_id.toString(),
          label: model.manufacturer_name,
        });
      }
    });
    return result;
  }, [inverterModels]);

  const inverterFilteredModels: AutocompleteSelectOption[] | [] =
    useMemo(() => {
      if (
        !watchManufacturer ||
        watchManufacturer?.length < 1 ||
        !inverterModels
      )
        return [];
      return inverterModels
        .filter(
          model => model.manufacturer_id.toString() === watchManufacturer.key,
        )
        .map(model => ({
          key: model.id.toString(),
          label: model.name,
          icon: 'Table',
        }));
    }, [inverterModels, watchManufacturer]);

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
        <Form
          onSubmit={handleSubmit(values => onSubmit(values, reset))}
          className="flex flex-col gap-5"
          {...method}
        >
          <Field name="inverter">
            {(
              register: UseFormRegister<FieldValues>,
              fieldState: FieldState,
            ) => {
              const { onChange, ...rest } = register('inverter', {
                setValueAs: v => v || undefined,
              });
              return (
                <AutocompleteSelect
                  label={intl.formatMessage({
                    defaultMessage: 'Select inverter',
                  })}
                  placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
                  noOptionsString={intl.formatMessage({
                    defaultMessage: 'Nothing found.',
                  })}
                  options={[
                    {
                      key: '-1',
                      label: intl.formatMessage({
                        defaultMessage: 'Add new inverter',
                      }),
                      icon: 'Plus' as IconName,
                    },
                  ].concat(
                    inverters.map(inverter => ({
                      key: String(inverter.id),
                      label: inverter.name,
                      icon: 'Table',
                    })),
                  )}
                  onChange={value =>
                    onChange({
                      target: { value, name: 'inverter', key: value?.key },
                    })
                  }
                  {...rest}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              );
            }}
          </Field>
          {watchInverter &&
            (watchInverter.key !== '-1' ? (
              <Field name="input">
                {(
                  register: UseFormRegister<FieldValues>,
                  fieldState: FieldState,
                ) => {
                  const { onChange, ...rest } = register('input', {
                    setValueAs: v => v || undefined,
                  });
                  return (
                    <AutocompleteSelect
                      label={intl.formatMessage({
                        defaultMessage: 'Select input',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select',
                      })}
                      noOptionsString={intl.formatMessage({
                        defaultMessage: 'Nothing found.',
                      })}
                      options={
                        // TODO: Waiting for mpp_trackers on backend side
                        // inverterInputs.mpp_trackers.map(() => ({
                        //   key: '1', // unknown values
                        //   label: 'TODO' // unknown values
                        // }))
                        [
                          {
                            key: '1',
                            label: 'I11',
                          },
                        ]
                      }
                      onChange={value =>
                        onChange({ target: { value, name: 'input' } })
                      }
                      {...rest}
                      validity={fieldState.invalid ? 'invalid' : undefined}
                    />
                  );
                }}
              </Field>
            ) : (
              <>
                <Field name="manufacturer">
                  {(
                    register: UseFormRegister<FieldValues>,
                    fieldState: FieldState,
                  ) => {
                    const { onChange, ...rest } = register('manufacturer', {
                      setValueAs: v => v || '',
                    });
                    return (
                      <Select
                        wrapperClassName="z-30"
                        label={intl.formatMessage({
                          defaultMessage: 'Manufacturer',
                        })}
                        placeholder={intl.formatMessage({
                          defaultMessage: 'Select',
                        })}
                        options={inverterManufactures}
                        onChange={value =>
                          onChange({ target: { value, name: 'manufacturer' } })
                        }
                        {...rest}
                        validity={fieldState.invalid ? 'invalid' : undefined}
                      />
                    );
                  }}
                </Field>
                {watchManufacturer && (
                  <Field name="model">
                    {(
                      register: UseFormRegister<FieldValues>,
                      fieldState: FieldState,
                    ) => {
                      const { onChange, ...rest } = register('model', {
                        setValueAs: v => v || '',
                      });
                      return (
                        <Select
                          wrapperClassName="z-20"
                          label={intl.formatMessage({
                            defaultMessage: 'Inverter Model',
                          })}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Select',
                          })}
                          options={inverterFilteredModels}
                          onChange={value =>
                            onChange({ target: { value, name: 'model' } })
                          }
                          {...rest}
                          validity={fieldState.invalid ? 'invalid' : undefined}
                        />
                      );
                    }}
                  </Field>
                )}
                {watchModel && (
                  <Field name="input">
                    {(
                      register: UseFormRegister<FieldValues>,
                      fieldState: FieldState,
                    ) => {
                      const { onChange, ...rest } = register('input', {
                        setValueAs: v => v || '',
                      });
                      return (
                        <Select
                          wrapperClassName="z-10"
                          label={intl.formatMessage({
                            defaultMessage: 'Input',
                          })}
                          placeholder={intl.formatMessage({
                            defaultMessage: 'Select',
                          })}
                          options={[
                            {
                              key: '1',
                              label: 'I11',
                            },
                          ]}
                          onChange={value =>
                            onChange({ target: { value, name: 'input' } })
                          }
                          {...rest}
                          validity={fieldState.invalid ? 'invalid' : undefined}
                        />
                      );
                    }}
                  </Field>
                )}
              </>
            ))}
          {watchInput && (
            <FileField
              className="w-full"
              label={intl.formatMessage({
                defaultMessage: 'String test result',
              })}
              name="file"
            >
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
          {/* {watchInput && (
            <FileUploaderWithPreview
              fileUploaderProps={{ ...fileUploaderProps, className: 'w-full' }}
              onDeleteFile={removeFile}
              uploadedFiles={uploadedFilesUrls}
              className="w-full"
              label={intl.formatMessage({
                defaultMessage: 'String test result',
              })}
            >
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
            </FileUploaderWithPreview>
          )} */}
          {watchInverter && watchInput && watchFile && (
            <div className="mt-3 flex gap-5">
              <Button
                variant="additional-gray"
                className="w-full"
                onClick={() => onClose(reset)}
              >
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
              <Button
                variant="main-green"
                className="w-full"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                {intl.formatMessage({ defaultMessage: 'Ok' })}
              </Button>
            </div>
          )}
          {/* {watchInverter && watchInput && uploadedFilesUrls.length > 0 && (
            <div className="mt-3 flex gap-5">
              <Button
                variant="additional-gray"
                className="w-full"
                onClick={() =>
                  onClose(reset, () => removeFile(uploadedFilesUrls[0]))
                }
              >
                {intl.formatMessage({ defaultMessage: 'Cancel' })}
              </Button>
              <Button
                variant="main-green"
                className="w-full"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                {intl.formatMessage({ defaultMessage: 'Ok' })}
              </Button>
            </div>
          )} */}
        </Form>
      </DialogContent>
    </Dialog>
  );
};
