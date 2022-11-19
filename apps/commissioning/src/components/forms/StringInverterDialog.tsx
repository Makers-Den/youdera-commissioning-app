import { zodResolver } from '@hookform/resolvers/zod';
import {
  ApiFile,
  Inverter,
  InverterModel,
  String,
} from '@src/api/youdera/apiTypes';
import {
  useInverterModelsQuery,
  useInvertersQuery,
} from '@src/api/youdera/hooks/inverters/hooks';
import { useStringDetailsQuery } from '@src/api/youdera/hooks/strings/hooks';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FieldValues,
  useForm,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
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
import { IconName, SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { FileField } from './FileField';
import { Form } from './Form';
import { SelectField } from './SelectField';

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

const fileValueMapper = (file: ApiFile | File) => ({
  name: file.name,
  type: file.type,
  url: file instanceof File ? URL.createObjectURL(file) : file.url,
});
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
  modifiedStringId,
}: StringInverterDialogProps<
  ResolverTypeExistingInverter,
  ResolverTypeNewInverter
>) => {
  const intl = useIntl();

  const [isWithNewInverter, setIsWithNewInverter] = useState<boolean>(false);

  const stringDetailsQuery = useStringDetailsQuery(modifiedStringId ?? -1);
  const stringDetails = stringDetailsQuery.data as unknown as String;

  const method = useForm({
    resolver: zodResolver(
      isWithNewInverter ? resolver.newInverter : resolver.existingInverter,
    ),
    defaultValues: modifiedStringId
      ? {
          inverter: {
            key: '53',
            label: ' - ',
            icon: 'Table',
          },
          input: {
            key: '97',
            label: '1',
            icon: 'Chip',
          },
          file: {
            name: 'team.png',
            type: 'image',
            size: 38662,
            visible_for_customer: false,
            url: 'http://5.189.174.75:8096/file/43/team.png?expires=1668775820&signature=c45a4ff5744cdc80e6055b79ce3bf34d81bcc13d78545d25af228b1d08433940',
            url_thumb:
              'http://5.189.174.75:8096/thumb/43/team.png?expires=1668775820&signature=a040e75ac99b6d148957ab02d8b9736c1998f92ff62c0b8cd21e45fea35bb7f2',
            created_at: '2022-11-17T15:09:33+00:00',
            updated_at: '2022-11-17T15:09:33+00:00',
            deleted_at: null,
          },
          manufacturer: {
            key: '97',
            label: '1',
            icon: 'Chip',
          },
          newInput: {
            key: '97',
            label: '1',
            icon: 'Chip',
          },
          model: {
            key: '97',
            label: '1',
            icon: 'Chip',
          },
        }
      : undefined,
  });
  const { handleSubmit, reset, formState, watch, control, getValues } = method;

  const invertersQuery = useInvertersQuery(siteId);
  const inverterModelsQuery = useInverterModelsQuery();
  const inverters = invertersQuery.data as Inverter[];
  const inverterModels = inverterModelsQuery.data as InverterModel[];
  const watchFile = watch('file');

  // * Intersection input
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
          key: inverter.id.toString(),
          label: inverter.name ?? ' - ',
          icon: 'Table',
        })),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [inverters],
  );
  // *

  const defaultInverter = () =>
    stringDetails
      ? inverterOptions.filter(
          inverterOption =>
            inverterOption.key ===
            inverters
              .filter(
                inverter =>
                  !!inverter.mpp_trackers.filter(
                    input => input.id === stringDetails.mpp_tracker.id,
                  )[0],
              )[0]
              .id.toString(),
        )[0]
      : undefined;

  const watchInverter = useWatch({
    name: 'inverter',
    control,
  });

  const watchManufacturer = watch('manufacturer');
  const watchModel = watch('model');
  const watchNewInput = watch('newInput');

  useEffect(() => {
    if (watchInverter) setIsWithNewInverter(watchInverter.key === '-1');
  }, [watchInverter]);

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

  const defaultInput = () =>
    stringDetails
      ? inverterInputsOptions.filter(
          input => input.key === stringDetails.mpp_tracker.id.toString(),
        )[0]
      : undefined;

  const watchInput = watch('input');

  console.log({ watchInput });

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
    if (!watchManufacturer || !inverterModels) return [];
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
      )[0]?.data.inputs;
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
          title={
            modifiedStringId
              ? intl.formatMessage({
                  defaultMessage: 'Modify String',
                })
              : intl.formatMessage({
                  defaultMessage: 'Add String',
                })
          }
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
              <SelectField
                name="input"
                options={inverterInputsOptions}
                label={intl.formatMessage({
                  defaultMessage: 'Input',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select',
                })}
                wrapperClassName="z-40"
              />
            ) : (
              <>
                <SelectField
                  name="manufacturer"
                  options={inverterManufacturesOptions}
                  label={intl.formatMessage({
                    defaultMessage: 'Manufacturer',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Select',
                  })}
                  wrapperClassName="z-30"
                />
                {watchManufacturer && (
                  <SelectField
                    name="model"
                    options={inverterModelsOptions}
                    label={intl.formatMessage({
                      defaultMessage: 'Inverter Mode',
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select',
                    })}
                    wrapperClassName="z-20"
                  />
                )}
                {watchModel && (
                  <SelectField
                    name="newInput"
                    options={inverterNewInputsOptions}
                    label={intl.formatMessage({
                      defaultMessage: 'Input',
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Select',
                    })}
                    wrapperClassName="z-10"
                  />
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
              valueMapper={fileValueMapper}
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
