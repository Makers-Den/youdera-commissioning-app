import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type DeletionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  description: string;
  isDeleting?: boolean;
};

export function DeletionDialog({
  isOpen,
  onClose,
  description,
  onCancel,
  onDelete,
  isDeleting,
}: DeletionDialogProps) {
  const intl = useIntl();

  return (
    <Dialog open={isOpen} onClose={onClose} className="min-w-[570px]">
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({ defaultMessage: 'Are you sure?' })}
        />
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
          >
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
            className="w-[160px]"
            isLoading={isDeleting}
          >
            {intl.formatMessage({ defaultMessage: 'Delete' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
