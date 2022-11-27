import { zodResolver } from '@hookform/resolvers/zod';
import { ApiFile, Inverter, InverterModel } from '@src/api/youdera/apiTypes';
import {
  useInverterModelsQuery,
  useInvertersQuery,
} from '@src/api/youdera/hooks/inverters/hooks';
import React, { useEffect, useMemo, useState } from 'react';
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
import { AutocompleteSelectOption } from 'ui/select/AutocompleteSelect';
import { IconName, SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { AutocompleteSelectField } from './AutocompleteField';
import { ExistingInverterSelectField } from './ExistingInverterSelectField';
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
export type InverterDefaultValuesProps = {
  inverter: AutocompleteSelectOption;
  input: any;
  file: ApiFile;
  manufacturer: undefined;
  model: undefined;
  newInput: undefined;
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
      modifiedStringId?: number,
    ) => void;
    newInverter: (
      values: z.infer<ResolverTypeNewInverter>,
      resetForm: () => void,
      modifiedStringId?: number,
    ) => void;
  };
  resolver: {
    existingInverter: ResolverTypeExistingInverter;
    newInverter: ResolverTypeNewInverter;
  };
  modifiedStringId?: number;
  defaultValues?: InverterDefaultValuesProps;
};

const fileValueMapper = (file: ApiFile | File) => ({
  name: file.name,
  type: file.type,
  url: file instanceof File ? URL.createObjectURL(file) : file.url,
  thumbnailUrl:
    file instanceof File ? URL.createObjectURL(file) : file.url_thumb,
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
  defaultValues,
}: StringInverterDialogProps<
  ResolverTypeExistingInverter,
  ResolverTypeNewInverter
>) => {
  const intl = useIntl();

  const [isWithNewInverter, setIsWithNewInverter] = useState<boolean>(false);

  const method = useForm({
    defaultValues,
    resolver: zodResolver(
      isWithNewInverter ? resolver.newInverter : resolver.existingInverter,
    ),
  });
  const { handleSubmit, reset, formState, watch, control } = method;
  const inverterModelsQuery = useInverterModelsQuery();
  const inverterModels = inverterModelsQuery.data as InverterModel[];
  const invertersQuery = useInvertersQuery(siteId);
  const inverters = invertersQuery.data as Inverter[];

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

  const watchInverter = useWatch({
    control,
    name: 'inverter',
    defaultValue: formState.defaultValues?.inverter as any,
  });
  const watchInput = watch('input');

  const watchManufacturer = watch('manufacturer');
  const watchModel = watch('model');
  const watchNewInput = watch('newInput');
  const watchFile = watch('file');

  useEffect(() => {
    if (watchInverter) setIsWithNewInverter(watchInverter.key === '-1');
  }, [watchInverter]);

  const inverterInputsOptions = useMemo(() => {
    if (!watchInverter?.key || watchInverter?.key === '-1') return [];

    const selectedInverter = inverters.filter(
      inverter => inverter.id.toString() === watchInverter.key,
    )[0];

    return selectedInverter.mpp_trackers.map((input, idx) => ({
      value: {
        key: input.id.toString(),
        label: (idx + 1).toString(),
        value: input.id,
        dependentKey: watchInverter?.key ?? '',
      },
      icon: 'Chip' as IconName,
      children: () => (idx + 1).toString(),
    }));
  }, [watchInverter, inverters]);

  // * Form with creation of new inverter
  const inverterManufacturersOptions = useMemo(() => {
    const result: unknown[] = [];
    const map = new Map();
    inverterModels.forEach(model => {
      if (!map.has(model.manufacturer_id)) {
        map.set(model.manufacturer_id, true);
        result.push({
          key: model.manufacturer_id.toString(),
          label: model.manufacturer_name,
          value: model.manufacturer_id,
          dependentKey: (watchInverter as AutocompleteSelectOption)?.key ?? '',
        });
      }
    });
    return result;
  }, [inverterModels, watchInverter]);

  const inverterModelsOptions = useMemo(() => {
    if (!watchManufacturer || !inverterModels) return [];
    return inverterModels
      .filter(
        //@ts-ignore
        model => model.manufacturer_id.toString() === watchManufacturer.key,
      )
      .map(model => ({
        key: model.id.toString(),
        label: model.name,
        value: model.id,
        icon: 'Table',
        //@ts-ignore
        dependentKey: watchManufacturer.key,
      }));
  }, [inverterModels, watchManufacturer]);

  const inverterNewInputsOptions = useMemo(() => {
    if (!watchModel || !inverterModels) return [];
    const numberOfInputs = inverterModels.filter(
      //@ts-ignore
      model => model.id.toString() === watchModel.key,
    )[0]?.data.inputs;
    return Array(numberOfInputs)
      .fill(0)
      .map((_, idx) => ({
        key: idx.toString(),
        label: (idx + 1).toString(),
        icon: 'Chip',
        value: idx.toString(),
        //@ts-ignore
        dependentKey: watchModel.key,
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
              ? onSubmit.newInverter(values, reset, modifiedStringId)
              : onSubmit.existingInverter(values, reset, modifiedStringId),
          )}
          className="flex flex-col gap-5"
          {...method}
        >
          <AutocompleteSelectField
            name="inverter"
            label={intl.formatMessage({
              defaultMessage: 'Select inverter',
            })}
            placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
            noOptionsString={intl.formatMessage({
              defaultMessage: 'Nothing found.',
            })}
            options={inverterOptions}
          />
          {watchInverter?.key !== '-1' ? (
            <ExistingInverterSelectField
              inverterValue={watchInverter}
              inverterInputsOptions={inverterInputsOptions}
            />
          ) : null
          // <NewInverterSelectField
          //   inverterValue={watchInverter}
          //   inverterManufacturerOptions={inverterManufacturersOptions}
          //   inverterModelOptions={inverterModelsOptions}
          //   inverterInputsOptions={inverterNewInputsOptions}
          // />
          }
          {((watchInverter.key !== '-1' && watchInput) ||
            (watchInverter.key === '-1' && watchNewInput)) && (
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
          {((watchInverter.key !== '-1' && watchInput && watchFile) ||
            (watchInverter.key === '-1' && watchNewInput && watchFile)) && (
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
