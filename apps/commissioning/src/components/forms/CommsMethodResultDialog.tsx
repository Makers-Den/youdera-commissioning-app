import { CommsTestResult } from '@src/integrations/youdera/apiTypes';
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
import { Table, Td, Th, Tr } from 'ui/table/Table';
import { BodyText } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

export type CommsMethodResultDialogProps = {
  open: DialogProps['open'];
  onClose: DialogProps['onClose'];
  className?: string;
  result: CommsTestResult;
};

export const CommsMethodResultDialog = ({
  open,
  onClose,
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
        <DialogTitle title={intl.formatMessage({ defaultMessage: 'Fetching data' })} />
        <SvgIcon
          name="Close"
          className="ml-auto h-4 hover:cursor-pointer"
          onClick={onClose}
        />
      </DialogHeader>
      <DialogContent className="flex flex-col gap-5">
          {result.status === 'success' && (
            <Table>
              <Tr>
                <Th>{intl.formatMessage({ defaultMessage: 'Serial number' })}</Th>
                <Th>{intl.formatMessage({ defaultMessage: 'Power' })}</Th>
              </Tr>
              <Tr>
                <Td>{result.serial_number || '-'}</Td>
                <Td>{result.power || '-'}</Td>
              </Tr>
            </Table>
          )}
          {result.status === 'failed' && <BodyText>{intl.formatMessage({ defaultMessage: 'Communication method test failed.' })}</BodyText>}
          {result.status === 'pending' && <BodyText>{intl.formatMessage({ defaultMessage: 'Communication method test result is pending.' })}</BodyText>}

          <div className="mt-3 flex gap-5">
            <Button
              variant="additional-gray"
              onClick={onClose}
            >
              {intl.formatMessage({ defaultMessage: 'Cancel' })}
            </Button>
            <Button
              variant="main-green"
              className="flex-1"
              onClick={onClose}
            >
              {intl.formatMessage({ defaultMessage: "Complete" })}
            </Button>
          </div>
      </DialogContent>
    </Dialog>
  );
};
