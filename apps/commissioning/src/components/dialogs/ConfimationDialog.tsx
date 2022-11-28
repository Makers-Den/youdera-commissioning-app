import { useIntl } from 'react-intl';
import { Button, ButtonProps } from 'ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type ConfimationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  description: string;
  title: string;
  isConfirming?: boolean;
  confirmButtonVariant: ButtonProps['variant'];
  confirmButtonTitle: string;
};

export function ConfimationDialog({
  isOpen,
  onClose,
  title,
  description,
  onCancel,
  onConfirm,
  isConfirming,
  confirmButtonVariant,
  confirmButtonTitle,
}: ConfimationDialogProps) {
  const intl = useIntl();

  return (
    <Dialog open={isOpen} onClose={onClose} className="min-w-[570px]">
      <DialogHeader>
        <DialogTitle title={title} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col">
        <Typography className="mb-6">{description}</Typography>
        <div className="flex gap-4 self-center">
          <Button
            variant="additional-gray"
            onClick={onCancel}
            className="w-[160px]"
            data-cy='confirmation-cancel-button'
          >
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button
            variant={confirmButtonVariant}
            onClick={onConfirm}
            className="w-[160px]"
            isLoading={isConfirming}
            data-cy='confirmation-confirm-button'
          >
            {confirmButtonTitle}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
