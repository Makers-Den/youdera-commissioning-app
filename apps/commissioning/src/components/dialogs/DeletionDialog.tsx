import { useIntl } from 'react-intl';

import { ConfimationDialog } from './ConfimationDialog';

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
    <ConfimationDialog
      isOpen={isOpen}
      onClose={onClose}
      title={intl.formatMessage({ defaultMessage: 'Are you sure?' })}
      onConfirm={onDelete}
      isConfirming={isDeleting}
      onCancel={onCancel}
      confirmButtonVariant="danger"
      description={description}
      confirmButtonTitle={intl.formatMessage({ defaultMessage: 'Delete' })}
    />
  );
}
