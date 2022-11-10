import { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type ActionsDialogProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  description: string;
};

export function ActionsDialog({
  children,
  isOpen,
  onClose,
  description,
}: ActionsDialogProps) {
  const intl = useIntl();

  return (
    <Dialog open={isOpen} onClose={onClose} className="min-w-[300px]">
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({ defaultMessage: 'Actions' })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent>
        <Typography className="mb-6">{description}</Typography>
        <div className="flex flex-col gap-3">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
