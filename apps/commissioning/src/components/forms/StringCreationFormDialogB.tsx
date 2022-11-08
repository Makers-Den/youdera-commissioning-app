import React from 'react';
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



// TODO: Handlers for Cancel and Save buttons

export const StringCreationFormDialogB = ({
  open,
  onClose,
  className,
}: Omit<DialogProps, 'children'>) => {

  const intl = useIntl();

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
    <Dialog open={open} onClose={onClose} className={clsxm('w-[400px]', className)}>
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({
            defaultMessage: 'Add String',
          })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <AutocompleteSelect
          label={intl.formatMessage({ defaultMessage: 'Select inverter' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({ defaultMessage: 'Nothing found.' })}
          action={{ label: 'Add new inverter', onClick: () => alert('Here will be AddInverterDialog'), icon: 'Plus' }}
          options={
            [
              {
                key: '1',
                label: 'SuperSun INV A-1231',
                icon: 'Table'
              }
            ]
          }
        />
        <AutocompleteSelect
          label={intl.formatMessage({ defaultMessage: 'Input' })}
          placeholder={intl.formatMessage({ defaultMessage: 'Select' })}
          noOptionsString={intl.formatMessage({ defaultMessage: 'Nothing found.' })}
          options={
            [
              {
                key: '1',
                label: 'MPP#7',
                icon: 'Chip'
              }
            ]
          }
        />
        <FileUploaderWithPreview
          fileUploaderProps={{ ...fileUploaderProps, className: 'w-full' }}
          onDeleteFile={removeFile}
          uploadedFiles={uploadedFilesUrls}
          className="w-full"
          allowMultipleFiles
          label='String test result'
        >
          <div className="flex items-center gap-4">
            <SvgIcon name="Camera" className="w-8 text-green-400" />
            <div>
              <Typography>Take photo by camera</Typography>
              <Typography>
                or{' '}
                <span className="text-green-400 underline">
                  click here to upload
                </span>
              </Typography>
            </div>
          </div>
        </FileUploaderWithPreview>

        <div className="flex mt-3 gap-5">
          <Button variant="additional-gray" className="w-full" onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button variant="main-green" className="w-full" onClick={() => undefined}>
            {intl.formatMessage({ defaultMessage: 'Ok' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
