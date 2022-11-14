/* eslint-disable jsx-a11y/interactive-supports-focus */
import { useBatteryApi } from '@src/integrations/youdera/batteries/hooks/useBatteryApi';
import { Battery } from '@src/integrations/youdera/batteries/types';
import { useInverterApi } from '@src/integrations/youdera/inverters/hooks/useInverterApi';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { useMeterApi } from '@src/integrations/youdera/meters/hooks/useMeterApi';
import { Meter } from '@src/integrations/youdera/meters/types';
import { commStatusToIcon, Device, toDevice } from '@src/utils/devices';
import { useMemo,useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { Typography } from 'ui/typography/Typography';

import { ActionsDialog } from './dialogs/ActionsDialog';
import { DeletionDialog } from './dialogs/DeletionDialog';

export type DeviceListProps = {
  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
  siteId: number;
};

export function DeviceList({ siteId, inverters, batteries, meters }: DeviceListProps) {
  const intl = useIntl();

  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);

  const devices: Device[] = useMemo(() => [
    ...(inverters || []).map(d => toDevice(d, 'Inverter')),
    ...(batteries || []).map(d => toDevice(d, 'Battery')),
    ...(meters || []).map(d => toDevice(d, 'Meter'))
  ], [inverters, batteries, meters]);

  const actionsDialog = useDisclosure();
  const deviceDeletionDialog = useDisclosure();

  const rowClickHandler = (device: Device) => () => {
    setCurrentDevice(device);
    actionsDialog.onOpen();
  };

  const handleActionCancel = () => {
    setCurrentDevice(null);
    actionsDialog.onClose();
  };

  const handleActionDelete = () => {
    actionsDialog.onClose();
    deviceDeletionDialog.onOpen();
  };

  const handleDeleteCancel = () => {
    setCurrentDevice(null);
    deviceDeletionDialog.onClose();
  };

  const { deleteInverterMutation } = useInverterApi(siteId);
  const { deleteBatteryMutation } = useBatteryApi(siteId);
  const { deleteMeterMutation } = useMeterApi(siteId);

  const confirmDeleteHandler = async () => {
    if (currentDevice) {
      try {
        if (currentDevice.type === 'Inverter') {
          await deleteInverterMutation.mutateAsync(currentDevice.id);
        } else if (currentDevice.type === 'Battery') {
          await deleteBatteryMutation.mutateAsync(currentDevice.id);
        } else if (currentDevice.type === 'Meter') {
          await deleteMeterMutation.mutateAsync(currentDevice.id);
        } 

        handleDeleteCancel();

      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  return (
    <>
      <Table className="w-full">
        <Thead>
          <Tr>
            <Th colSpan={2} className='ml-6 w-[285px]'>{intl.formatMessage({ defaultMessage: "Name" })}</Th>
            <Th className='w-[200px]'>{intl.formatMessage({ defaultMessage: "Manufacturer and model" })}</Th>
            <Th className='w-[50px]'>{intl.formatMessage({ defaultMessage: "Type" })}</Th>
            <Th>{intl.formatMessage({ defaultMessage: "Status" })}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {devices.map(device => (
            <Tr
              className="cursor-pointer"
              key={device.id}
              onClick={rowClickHandler(device)}
            >
              <Td>
                <div className="ml-2 flex aspect-square w-11 items-center justify-center overflow-hidden rounded">
                  <Image src={device.imageUrl} alt={`${device.type} image`} />
                </div>
              </Td>
              <Td>
                <Typography weight="medium" className='w-[160px] truncate'>{device.name}</Typography>
                <Typography variant="label">{device.serial_number}</Typography>
              </Td>
              <Td>
                <Typography variant="label" className='w-[160px] truncate'>{device.manufacturer}</Typography>
                <Typography variant="label" className='w-[160px] truncate'>{device.model}</Typography>
              </Td>
              <Td>
                <SvgIcon name={device.type} />
              </Td>
              <Td>
                <SvgIcon name={commStatusToIcon[device.communication_status || 'success']} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <>
          <Button variant="main-green">
            {intl.formatMessage({ defaultMessage: 'Modify properties' })}
          </Button>
          <Button variant="main-green">
            {intl.formatMessage({ defaultMessage: 'Modify communication' })}
          </Button>
          <Button variant="danger" onClick={handleActionDelete}>
            {intl.formatMessage({ defaultMessage: 'Delete' })}
          </Button>
          <Button variant="main-gray" onClick={handleActionCancel}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </>
      </ActionsDialog>
      <DeletionDialog
        isOpen={deviceDeletionDialog.isOpen}
        onClose={deviceDeletionDialog.onClose}
        description={
          currentDevice?.type === 'Inverter' 
          ? intl.formatMessage({
              defaultMessage: 'Are you sure to delete this inverter? All connected strings, batteries and meters will be deleted as well.',
            })
          : intl.formatMessage({
            defaultMessage: 'Are you sure to delete this device?',
          })
        }
        onCancel={handleDeleteCancel}
        onDelete={confirmDeleteHandler}
        isDeleting={deleteInverterMutation.isLoading || deleteInverterMutation.isLoading || deleteBatteryMutation.isLoading}
      />
    </>
  );
}
