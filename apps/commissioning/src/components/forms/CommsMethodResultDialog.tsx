import { CommsTestResult } from '@src/api/youdera/apiTypes';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogProps,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import clsxm from 'ui/utils/clsxm';

export type CommsMethodResultDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  onConfirm: () => void;
  onBack: () => void;
  className?: string;
  result: CommsTestResult;
};

export const CommsMethodResultDialog = ({
  open,
  onClose,
  onConfirm,
  onBack,
  className,
  result,
}: CommsMethodResultDialogProps) => {
  const intl = useIntl();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={clsxm('w-[400px]', className)}
    >
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({ defaultMessage: 'Fetching data' })}
        />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
        <Table>
          <Thead>
            <Tr>
              <Th>{intl.formatMessage({ defaultMessage: 'Serial number' })}</Th>
              <Th>{intl.formatMessage({ defaultMessage: 'Power' })}</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{result.serial_number || '-'}</Td>
              <Td>{result.power || '-'}</Td>
            </Tr>
          </Tbody>
        </Table>

        <div className="mt-3 flex gap-5">
          <Button variant="additional-gray" onClick={onBack}>
            {intl.formatMessage({ defaultMessage: 'Back' })}
          </Button>
          <Button variant="main-green" className="flex-1" onClick={onConfirm}>
            {intl.formatMessage({ defaultMessage: 'Complete' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
