import { zodResolver } from '@hookform/resolvers/zod';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import React from 'react';
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
import { FileUploaderWithPreview } from 'ui/file-inputs/FileUploaderWithPreview'
import {
  useFileUploader,
  UseFileUploaderArgs,
} from 'ui/file-inputs/useFileUploader';
import { AutocompleteSelect } from 'ui/select/AutocompleteSelect';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';
import { z, ZodObject, ZodTypeAny } from 'zod';

import { Field, FieldState } from './Field';
import { Form } from './Form';


// TODO: Handlers for Cancel and Save buttons
type RawFormShape = {
  count?: ZodTypeAny;
  moduleType?: ZodTypeAny;
  cabelCrossSection?: ZodTypeAny;
  inverter?: ZodTypeAny;
  input?: ZodTypeAny;
  photo?: ZodTypeAny;
};

export type StringInverterDialogProps<
  ResolverType extends ZodObject<RawFormShape>,
> = {
  inverters: Inverter[]
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
  inverters
}: StringInverterDialogProps<ResolverType>) => {

  const intl = useIntl();
  const method = useForm({
    resolver: zodResolver(resolver),
  });

  const { handleSubmit, reset, formState, watch } = method;

  const watchInverter = watch('inverter')
  const watchInput = watch('input')
  //TODO: Waiting for mpp_trackers on backend side
  // const inverterInputs = watchInverter?.key && inverters.filter((inverter) => inverter.id === watchInverter.key)[0] 

  function asyncTimeout(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  function getRandomIntInRange(min: number, max: number) {
    return Math.floor(Math.random() * max) + min;
  }

  const uploadFileMock: UseFileUploaderArgs['uploadFile'] = (
    event,
    setUploadProgress,
    addNewFile,
    setErrorMessage,
  ) => {
    if (event.currentTarget.files?.length) {
      const file = event.currentTarget.files?.[0];

      const reader = new FileReader();

      reader.addEventListener('load', async ev => {
        for (let i = 0; i < 100; i += getRandomIntInRange(2, 5)) {
          setUploadProgress(i);
          // eslint-disable-next-line no-await-in-loop
          await asyncTimeout(getRandomIntInRange(50, 300));
        }
        addNewFile((ev.target?.result as string) || '');
      });
      // reader.addEventListener('progress', ev => {
      //   setUploadProgress(Math.floor((100 * ev.loaded) / ev.total));
      // });
      reader.addEventListener('error', () => {
        setErrorMessage('Error. try again later');
      });

      reader.readAsDataURL(file);
    }
  };

  const { fileUploaderProps, uploadedFilesUrls, removeFile } = useFileUploader({
    uploadFile: uploadFileMock,
  });

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
          <Field name='inverter'>
            {(register: UseFormRegister<FieldValues>, fieldState: FieldState) => {
              const { onChange, ...rest } = register('inverter', {
                setValueAs: v => (v || undefined),
              })
              return <AutocompleteSelect
                label={intl.formatMessage({ defaultMessage: 'Select inverter' })}
                placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
                noOptionsString={intl.formatMessage({
                  defaultMessage: 'Nothing found.',
                })}
                action={{
                  label: 'Add new inverter',
                  onClick: () => alert('Here will be AddInverterDialog'),
                  icon: 'Plus',
                }}
                options={inverters.map((inverter) => ({
                  key: String(inverter.id),
                  label: inverter.name,
                  icon: 'Table'
                }))}
                onChange={(value) => onChange({ target: { value, name: 'inverter', key: value?.key } })}
                {...rest}
                validity={fieldState.invalid ? 'invalid' : undefined}
              />
            }}
          </Field>
          {watchInverter &&
            <Field name='input'>
              {(register: UseFormRegister<FieldValues>, fieldState: FieldState) => {
                const { onChange, ...rest } = register('input', {
                  setValueAs: v => (v || undefined),
                })
                return <AutocompleteSelect
                  label={intl.formatMessage({ defaultMessage: 'Select input' })}
                  placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
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
                        label: 'TODO'
                      }
                    ]
                  }
                  onChange={(value) => onChange({ target: { value, name: 'input' } })}
                  {...rest}
                  validity={fieldState.invalid ? 'invalid' : undefined}
                />
              }}
            </Field>
          }
          { }
          {watchInput &&
            <FileUploaderWithPreview
              fileUploaderProps={{ ...fileUploaderProps, className: 'w-full' }}
              onDeleteFile={removeFile}
              uploadedFiles={uploadedFilesUrls}
              className="w-full"
              label={intl.formatMessage({ defaultMessage: "String test result" })}
            >
              <div className="flex items-center gap-4">
                <SvgIcon name="Camera" className="w-8 text-green-400" />
                <div>
                  <Typography>{intl.formatMessage({ defaultMessage: 'Take photo by camera', description: 'Context: Take photo by camera or click here to upload' })}</Typography>
                  <Typography>
                    {intl.formatMessage({ defaultMessage: 'or', description: 'Context: Take photo by camera or click here to upload' })}{' '}
                    <span className="text-green-400 underline">
                      {intl.formatMessage({ defaultMessage: 'click here to upload', description: 'Context: Take photo by camera or click here to upload' })}
                    </span>
                  </Typography>
                </div>
              </div>
            </FileUploaderWithPreview>
          }

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
        </Form>
      </DialogContent>
    </Dialog>
  );
};
