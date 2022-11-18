import { CommsTestResult, Site } from '@src/integrations/youdera/apiTypes';
import { useUpdateBatteryCommsMutation } from '@src/integrations/youdera/batteries/useUpdateBatteryCommsMutation';
import { useBatteryMutations } from '@src/integrations/youdera/batteryApiHooks';
import { useInverterMutations } from '@src/integrations/youdera/inverterApiHooks';
import { useUpdateInverterCommsMutation } from '@src/integrations/youdera/inverters/useUpdateInverterCommsMutation';
import { useMeterMutations } from '@src/integrations/youdera/meterApiHooks';
import { useUpdateMeterCommsMutation } from '@src/integrations/youdera/meters/useUpdateMeterCommsMutation';
import { useGetSite } from '@src/integrations/youdera/sites/hooks/useGetSite';
import { Device, toDevice, useExtractDevices } from '@src/utils/devices';
import { routes } from '@src/utils/routes';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { ButtonDropdown } from 'ui/button-dropdown/ButtonDropdown';
import { Button, ButtonProps } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

import { DeviceList } from '../DeviceList';
import { ActionsDialog } from '../dialogs/ActionsDialog';
import { ConfimationDialog } from '../dialogs/ConfimationDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import { CommsMethodFormDialog, CommType } from '../forms/CommsMethodFormDialog';
import { CommsMethodResultDialog } from '../forms/CommsMethodResultDialog';
import {
  InverterFormDialog,
  InverterFormDialogProps,
} from '../forms/InverterFormDialog';
import { LargeBox } from '../LargeBox';

type AreYouSureDialogProps = {
  siteId: number;
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    toggle: () => void;
  }
};

function AreYouSureDialog({ siteId, disclosure }: AreYouSureDialogProps) {
  const intl = useIntl();
  const router = useRouter();

  return (
    <ConfimationDialog
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      title={intl.formatMessage({ defaultMessage: 'All Inverters added?' })}
      onConfirm={() => {
        router.push(routes.electrician.verification(siteId));
      }}
      onCancel={disclosure.onClose}
      confirmButtonVariant="main-green"
      description={intl.formatMessage({ defaultMessage: 'Are you sure that all inverters were added?' })}
      confirmButtonTitle={intl.formatMessage({ defaultMessage: 'Yes' })}
    />
  );
}

export type DevicesContentProps = {
  siteId: number;
  setNextButtonProps: (props: ButtonProps & { content: string }) => void;
};

export function DevicesContent({ siteId, setNextButtonProps }: DevicesContentProps) {
  const intl = useIntl();

  const { siteQuery } = useGetSite(siteId);
  const site = siteQuery.data as Site;

  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [commsTestResult, setCommsTestResult] = useState<CommsTestResult | null>(null);

  const actionsDialog = useDisclosure();
  const deviceDeletionDialog = useDisclosure();
  const addInverterDialog = useDisclosure();
  const commsMethodDialog = useDisclosure();
  const commsResultDialog = useDisclosure();

  const rowClickHandler = (device: Device) => () => {
    setCurrentDevice(device);
    actionsDialog.onOpen();
  };

  const handleActionCancel = () => {
    setCurrentDevice(null);
    actionsDialog.onClose();
  };

  const handleActionComms = () => {
    actionsDialog.onClose();
    commsMethodDialog.onOpen();
  }

  const handleActionDelete = () => {
    actionsDialog.onClose();
    deviceDeletionDialog.onOpen();
  };

  const handleDeleteCancel = () => {
    setCurrentDevice(null);
    deviceDeletionDialog.onClose();
  };

  const {
    deleteInverterMutation,
    createInverterMutation,
    addFileToInverterMutation,
  } = useInverterMutations(siteId);
  const { deleteBatteryMutation } = useBatteryMutations(siteId);
  const { deleteMeterMutation } = useMeterMutations(siteId);

  const confirmDeleteHandler = async () => {
    if (currentDevice) {
      try {
        if (currentDevice.deviceType === 'Inverter') {
          await deleteInverterMutation.mutateAsync(currentDevice.id);
        } else if (currentDevice.deviceType === 'Battery') {
          await deleteBatteryMutation.mutateAsync(currentDevice.id);
        } else if (currentDevice.deviceType === 'Meter') {
          await deleteMeterMutation.mutateAsync(currentDevice.id);
        }

        handleDeleteCancel();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const updateMeterCommsMutation = useUpdateMeterCommsMutation(siteId);
  const updateInveterCommsMutation = useUpdateInverterCommsMutation(siteId);
  const updateBatteryCommsMutation = useUpdateBatteryCommsMutation(siteId);

  const onAddInverter: InverterFormDialogProps['onSubmit'] = async (
    values,
    reset,
  ) => {
    try {
      const inverter = await createInverterMutation.mutateAsync({
        serial_number: values.serialNumber,
        site: siteId,
        manufacturer: values.manufacturer.label,
        cmodel: parseInt(values.model.key, 10),
      });

      await addFileToInverterMutation.mutateAsync({
        file: values.file,
        inverterId: inverter.id,
      });

      setCurrentDevice(toDevice(inverter, 'Inverter'));
      commsMethodDialog.onOpen();

      reset();
      addInverterDialog.onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const items = [
    {
      key: 'inverter',
      children: (
        <button type="button" onClick={addInverterDialog.onOpen}>
          <Typography className="flex font-medium">
            <SvgIcon name="InverterRect" className="mr-3 w-5" />
            {intl.formatMessage({ defaultMessage: 'Add Inverter' })}
          </Typography>
        </button>
      ),
    },
    {
      key: 'meter',
      children: (
        <button type="button">
          <Typography className="flex font-medium">
            <SvgIcon name="MeterRect" className="mr-3 w-5" />
            {intl.formatMessage({ defaultMessage: 'Add Meter' })}
          </Typography>
        </button>
      ),
    },
    {
      key: 'battery',
      children: (
        <button type="button">
          <Typography className="flex font-medium">
            <SvgIcon name="BatteryRect" className="mr-3 w-5" />
            {intl.formatMessage({ defaultMessage: 'Add Battery' })}
          </Typography>
        </button>
      ),
    },
  ];

  const devices = useExtractDevices(site);
  const areYouSureDisclosure = useDisclosure();

  useEffect(() => {
    const hasInverters = !!devices.find(d => d.deviceType === 'Inverter');
    setNextButtonProps({
      content: intl.formatMessage({
        defaultMessage: 'Next',
      }),
      variant: 'main-green',
      type: 'button',
      disabled: !hasInverters,
      onClick: areYouSureDisclosure.onOpen
    });
  }, [intl, setNextButtonProps, devices, areYouSureDisclosure.onOpen]);

  return (
    <>
      <LargeBox>
        <BoxHeader>
          <BoxTitle title={intl.formatMessage({ defaultMessage: 'Devices' })} />
          <ButtonDropdown
            className="ml-auto"
            items={items}
            buttonProps={{
              children: intl.formatMessage({ defaultMessage: 'ADD DEVICE' }),
              className: 'w-44',
            }}
          />
        </BoxHeader>
        <BoxContent>
          <DeviceList
            rowClickHandler={rowClickHandler}
            devices={devices}
          />
        </BoxContent>
      </LargeBox>

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
          <Button variant="main-green" onClick={handleActionComms}>
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
          currentDevice?.deviceType === 'Inverter'
            ? intl.formatMessage({
                defaultMessage:
                  'Are you sure to delete this inverter? All connected strings, batteries and meters will be deleted as well.',
              })
            : intl.formatMessage({
                defaultMessage: 'Are you sure to delete this device?',
              })
        }
        onCancel={handleDeleteCancel}
        onDelete={confirmDeleteHandler}
        isDeleting={
          deleteInverterMutation.isLoading ||
          deleteInverterMutation.isLoading ||
          deleteBatteryMutation.isLoading
        }
      />

      <InverterFormDialog
        open={addInverterDialog.isOpen}
        onClose={addInverterDialog.onClose}
        onSubmit={onAddInverter}
        title={intl.formatMessage({ defaultMessage: 'Add Inverter' })}
        submitButtonTitle={intl.formatMessage({ defaultMessage: 'Add Device' })}
      />

      {currentDevice && 
        <CommsMethodFormDialog
          open={commsMethodDialog.isOpen}
          onClose={commsMethodDialog.onClose}
          onSubmit={async ({ method, ipAddress, slaveId }) => {
            const commType = method.key as CommType;

            const updateDeviceCommsMutation = (() => {
              if (currentDevice.deviceType === 'Inverter') {
                return updateInveterCommsMutation;
              }
              
              if (currentDevice.deviceType === 'Battery') {
                return updateBatteryCommsMutation;
              } 
              
              return updateMeterCommsMutation;
            })();

            try {
              const testResult = await updateDeviceCommsMutation.mutateAsync(
                commType === 'fixed_ip'
                ? {
                  id: currentDevice.id,
                  ip: ipAddress,
                  slave_id: Number(slaveId),
                }
                : {
                  id: currentDevice.id,
                  dhcp: true,
                  slave_id: Number(slaveId),
                }
              );

              setCommsTestResult(testResult);
              commsResultDialog.onOpen();
              commsMethodDialog.onClose();

            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }
          }}
        />
      }

      {currentDevice && commsTestResult && (
        <CommsMethodResultDialog
          open={commsResultDialog.isOpen}
          onClose={() => {
            setCommsTestResult(null);
            setCurrentDevice(null);
            commsResultDialog.onClose();
          }}
          result={commsTestResult} 
        />
      )}

      <AreYouSureDialog siteId={siteId} disclosure={areYouSureDisclosure}/>
    </>
  );
}
