import { zodResolver } from '@hookform/resolvers/zod';
import { Inverter, InverterModel } from '@src/integrations/youdera/apiTypes';
import { useInverters } from '@src/integrations/youdera/inverters/hooks/useInverters';
import React, { useEffect, useMemo, useState } from 'react';
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

type RawFormShapeExistingInverter = {
  inverter: ZodTypeAny;
  input: ZodTypeAny;
  file: ZodTypeAny;
};

type RawFormShapeNewInverter = {
  model: ZodTypeAny;
  newInput: ZodTypeAny;
  file: ZodTypeAny;
};

export type StringInverterDialogProps<
  ResolverTypeExistingInverter extends ZodObject<RawFormShapeExistingInverter>,
  ResolverTypeNewInverter extends ZodObject<RawFormShapeNewInverter>,
> = {
  siteId: number;
  open: DialogProps['open'];
  onClose: (reset: () => void) => void;
  className?: string;
  onSubmit: {
    existingInverter: (
      values: z.infer<ResolverTypeExistingInverter>,
      resetForm: () => void,
    ) => void;
    newInverter: (
      values: z.infer<ResolverTypeNewInverter>,
      resetForm: () => void,
    ) => void;
  };
  resolver: {
    existingInverter: ResolverTypeExistingInverter;
    newInverter: ResolverTypeNewInverter;
  };
  modifiedStringId?: number;
};

export const StringInverterDialog = <
  ResolverTypeExistingInverter extends ZodObject<RawFormShapeExistingInverter>,
  ResolverTypeNewInverter extends ZodObject<RawFormShapeNewInverter>,
>({
  open,
  onClose,
  className,
  onSubmit,
  resolver,
  siteId,
  modifiedStringId
}: StringInverterDialogProps<
  ResolverTypeExistingInverter,
  ResolverTypeNewInverter
>) => {
  const intl = useIntl();

  const [isWithNewInverter, setIsWithNewInverter] = useState<boolean>(false);

  const method = useForm({
    resolver: zodResolver(isWithNewInverter ? resolver.newInverter : resolver.existingInverter),
  });
  const { handleSubmit, reset, formState, watch } = method;

  const { inverterModelsQuery, invertersQuery } = useInverters(siteId);
  const inverters = invertersQuery.data as Inverter[];
  const inverterModels = inverterModelsQuery.data as InverterModel[];


  const watchInverter = watch('inverter');
  const watchInput = watch('input');
  const watchFile = watch('file');

  const watchManufacturer = watch('manufacturer');
  const watchModel = watch('model');
  const watchNewInput = watch('newInput');

  useEffect(
    () => { if (watchInverter) setIsWithNewInverter(watchInverter.key === '-1') },
    [watchInverter],
  );

  // *  Form with existing inverter
  const inverterOptions: AutocompleteSelectOption[] | [] = useMemo(
    () =>
      [
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
          label: inverter.name ?? ' - ',
          icon: 'Table',
        })),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inverters],
  );

  const inverterInputsOptions: AutocompleteSelectOption[] | [] = useMemo(() => {
    if (!watchInverter?.key || watchInverter?.key === '-1') return [];

    const selectedInverter = inverters.filter(
      inverter => inverter.id.toString() === watchInverter.key,
    )[0];

    return selectedInverter.mpp_trackers.map((input, idx) => ({
      key: input.id.toString(),
      label: (idx + 1).toString(),
      icon: 'Chip',
      value: input.id,
    }));
  }, [watchInverter, inverters]);
  // *

  // * Form with creation of new inverter
  const inverterManufacturesOptions: AutocompleteSelectOption[] | [] =
    useMemo(() => {
      const result: AutocompleteSelectOption[] = [];
      const map = new Map();
      inverterModels.forEach(model => {
        if (!map.has(model.manufacturer_id)) {
          map.set(model.manufacturer_id, true);
          result.push({
            key: model.manufacturer_id.toString(),
            label: model.manufacturer_name,
            value: model.manufacturer_id,
          });
        }
      });
      return result;
    }, [inverterModels]);

  const inverterModelsOptions: AutocompleteSelectOption[] | [] = useMemo(() => {
    if (!watchManufacturer || watchManufacturer?.length < 1 || !inverterModels)
      return [];
    return inverterModels
      .filter(
        model => model.manufacturer_id.toString() === watchManufacturer.key,
      )
      .map(model => ({
        key: model.id.toString(),
        label: model.name,
        value: model.id,
        icon: 'Table',
      }));
  }, [inverterModels, watchManufacturer]);

  const inverterNewInputsOptions: AutocompleteSelectOption[] | [] =
    useMemo(() => {
      if (!watchModel || !inverterModels) return [];
      const numberOfInputs = inverterModels.filter(
        model => model.id.toString() === watchModel.key,
      )[0].data.inputs;
      return Array(numberOfInputs)
        .fill(0)
        .map((_, idx) => ({
          key: idx.toString(),
          label: (idx + 1).toString(),
          icon: 'Chip',
          value: idx.toString(),
        }));
    }, [inverterModels, watchModel]);
  // *

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
          onSubmit={handleSubmit(values =>
            isWithNewInverter
              ? onSubmit.newInverter(values, reset)
              : onSubmit.existingInverter(values, reset),
          )}
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
                  options={inverterOptions}
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
                        defaultMessage: 'Input',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Select',
                      })}
                      noOptionsString={intl.formatMessage({
                        defaultMessage: 'Nothing found.',
                      })}
                      options={inverterInputsOptions}
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
                        options={inverterManufacturesOptions}
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
                          options={inverterModelsOptions}
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
                  <Field name="newInput">
                    {(
                      register: UseFormRegister<FieldValues>,
                      fieldState: FieldState,
                    ) => {
                      const { onChange, ...rest } = register('newInput', {
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
                          options={inverterNewInputsOptions}
                          onChange={value =>
                            onChange({ target: { value, name: 'newInput' } })
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
          {(watchInput || watchNewInput) && (
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
          {((watchInverter && watchInput && watchFile) ||
            (watchInverter && watchNewInput && watchFile)) && (
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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
