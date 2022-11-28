import { zodResolver } from '@hookform/resolvers/zod';
import { ApiFile, Inverter } from '@src/api/youdera/apiTypes';
import {
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
import { FileField } from './FileField';
import { Form } from './Form';
import { StringInputSelectField } from './StringInputSelectField';
import { StringModelInputSelectField } from './StringModelInputSelectField';

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
  const invertersQuery = useInvertersQuery(siteId);
  const inverters = invertersQuery.data as Inverter[];

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
    [inverters, intl],
  );

  const watchedInverter = useWatch({
    control,
    name: 'inverter',
    defaultValue: formState.defaultValues?.inverter as AutocompleteSelectOption,
  });
  const watchedInput = watch('input');

  const watchedManufacturer = watch('manufacturer');
  const watchedModel = watch('model');
  const watchedNewInput = watch('newInput');
  const watchedFile = watch('file');

  useEffect(() => {
    if (watchedInverter) setIsWithNewInverter(watchedInverter.key === '-1');
  }, [watchedInverter]);

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
          {watchedInverter?.key !== '-1' ? (
            <StringInputSelectField
              inverterValue={watchedInverter}
              inverters={inverters}
            />
          ) : (
            <StringModelInputSelectField
              inverterValue={watchedInverter}
              manufacturerValue={watchedManufacturer}
              modelValue={watchedModel}
            />
          )}
          {((watchedInverter?.key !== '-1' && watchedInput) ||
            (watchedInverter?.key === '-1' && watchedNewInput)) && (
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
          {((watchedInverter?.key !== '-1' && watchedInput && watchedFile) ||
            (watchedInverter?.key === '-1' && watchedNewInput && watchedFile)) && (
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
