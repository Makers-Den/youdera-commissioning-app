import { useIntl } from 'react-intl';

import { ConfimationDialog } from './ConfimationDialog';

export type DeletionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCancel?: () => void;
  description: string;
  isDeleting?: boolean;
};

export function DeletionDialog({
  isOpen,
  onClose,
  description,
  onDelete,
  onCancel,
  isDeleting,
}: DeletionDialogProps) {
  const intl = useIntl();

  return (
    <ConfimationDialog
      isOpen={isOpen}
      onClose={onClose}
      title={intl.formatMessage({ defaultMessage: 'Are you sure?' })}
      onConfirm={onDelete}
      isConfirming={isDeleting}
      onCancel={onCancel ?? onClose}
      confirmButtonVariant="danger"
      description={description}
      confirmButtonTitle={intl.formatMessage({ defaultMessage: 'Delete' })}
    />
  );
}
