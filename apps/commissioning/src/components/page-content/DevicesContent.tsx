import { ApiFile, CommsParams, CommsTestResult, Site } from '@src/api/youdera/apiTypes';
import {
  useBatteryCommsTestMutation,
  useBatteryMutations,
  useUpdateBatteryCommsMutation,
} from '@src/api/youdera/hooks/batteries/hooks';
import {
  useInverterCommsTestMutation,
  useInverterMutations,
  useUpdateInverterCommsMutation,
} from '@src/api/youdera/hooks/inverters/hooks';
import {
  useMeterCommsTestMutation,
  useMeterMutations,
  useUpdateMeterCommsMutation,
} from '@src/api/youdera/hooks/meters/hooks';
import { useSiteQuery } from '@src/api/youdera/hooks/sites/hooks';
import { Device, toDevice, useExtractDevices } from '@src/utils/devices';
import { reportApiError } from '@src/utils/errorUtils';
import { routes } from '@src/utils/routes';
import { noop } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { ButtonDropdown } from 'ui/button-dropdown/ButtonDropdown';
import { Button, ButtonProps } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Toast, useToast } from 'ui/toast/Toast';
import { Typography } from 'ui/typography/Typography';

import { DeviceList } from '../DeviceList';
import { ActionsDialog } from '../dialogs/ActionsDialog';
import { ConfimationDialog } from '../dialogs/ConfimationDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import {
  BatteryFormDialog,
  BatteryFormDialogProps,
} from '../forms/BatteryFormDialog';
import {
  CommsMethodFormDialog,
  CommType,
} from '../forms/CommsMethodFormDialog';
import { CommsMethodResultDialog } from '../forms/CommsMethodResultDialog';
import {
  InverterFormDialog,
  InverterFormDialogProps,
} from '../forms/InverterFormDialog';
import { MeterFormDialog } from '../forms/MeterFormDialog';
import { LargeBox } from '../LargeBox';

type AreYouSureCallbacks = {
  onConfirm: () => void;
  onCancel: () => void;
};

type AreYouSureDialogProps = {
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    toggle: () => void;
  };
  callbacks: AreYouSureCallbacks;
};

function AreYouSureDialog({ disclosure, callbacks }: AreYouSureDialogProps) {
  const intl = useIntl();

  return (
    <ConfimationDialog
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      title={intl.formatMessage({ defaultMessage: 'All Inverters added?' })}
      onConfirm={callbacks.onConfirm}
      onCancel={() => {
        callbacks.onCancel();
        disclosure.onClose();
      }}
      confirmButtonVariant="main-green"
      description={intl.formatMessage({
        defaultMessage: 'Are you sure that all inverters were added?',
      })}
      confirmButtonTitle={intl.formatMessage({ defaultMessage: 'Yes' })}
    />
  );
}

const fileValueMapper = (file: ApiFile | File) => ({
  name: file.name,
  type: file.type,
  url: file instanceof File ? URL.createObjectURL(file) : file.url,
  thumbnailUrl: file instanceof File ? URL.createObjectURL(file) : file.url_thumb,
});

export type DevicesContentProps = {
  siteId: number;
  setNextButtonProps: (props: ButtonProps & { content: string }) => void;
};

type CommsParamsAndTestResult = {
  params: CommsParams & { id: number },
  result: CommsTestResult
};

export function DevicesContent({
  siteId,
  setNextButtonProps,
}: DevicesContentProps) {
  const intl = useIntl();

  const toast = useToast();

  const { siteQuery } = useSiteQuery(siteId);
  const site = siteQuery.data as Site;

  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [commsParamsAndTestResult, setCommsParamsAndTestResult] =
    useState<CommsParamsAndTestResult| null>(null);

  const actionsDialog = useDisclosure();
  const deviceDeletionDialog = useDisclosure();
  const addInverterDialog = useDisclosure();
  const updateInverterDialog = useDisclosure();
  const addMeterDialog = useDisclosure()
  const updateMeterDialog = useDisclosure();
  const addBatteryDialog = useDisclosure();
  const updateBatteryDialog = useDisclosure();
  const commsMethodDialog = useDisclosure();
  const commsResultDialog = useDisclosure();

  const rowClickHandler = (device: Device) => () => {
    setCurrentDevice(device);
    actionsDialog.onOpen();
  };

  const handleActionModify = () => {
    switch (currentDevice?.deviceType) {
      case 'Inverter':
        updateInverterDialog.onOpen();
        actionsDialog.onClose();
        break;
      case 'Battery':
        updateBatteryDialog.onOpen();
        actionsDialog.onClose();
        break;
      default:
        actionsDialog.onClose();
    }
  };

  const handleActionCancel = () => {
    setCurrentDevice(null);
    actionsDialog.onClose();
  };

  const handleActionComms = () => {
    actionsDialog.onClose();
    commsMethodDialog.onOpen();
  };

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
    updateInverterMutation,
  } = useInverterMutations(siteId);
  const {
    deleteBatteryMutation,
    createBatteryMutation,
    addFileToBatteryMutation,
    updateBatteryMutation,
  } = useBatteryMutations(siteId);
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
        toast.success(
          intl.formatMessage({
            defaultMessage: 'Device deleted successfully!',
          }),
        );
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const updateMeterCommsMutation = useUpdateMeterCommsMutation(siteId);
  const meterCommsTestMutation = useMeterCommsTestMutation();
  const updateInveterCommsMutation = useUpdateInverterCommsMutation(siteId);
  const inverterCommsTestMutation = useInverterCommsTestMutation();
  const updateBatteryCommsMutation = useUpdateBatteryCommsMutation(siteId);
  const batteryCommsTestMutation = useBatteryCommsTestMutation();

  const onAddInverter: InverterFormDialogProps['onSubmit'] = async (
    values,
    reset,
  ) => {
    try {
      const inverter = await createInverterMutation.mutateAsync({
        serial_number: values.serialNumber,
        site: siteId,
        cmodel: parseInt(values.model.key, 10),
      });

      await addFileToInverterMutation.mutateAsync({
        file: values.file,
        inverterId: inverter.id,
      });

      commsMethodDialog.onOpen();
      toast.success(
        intl.formatMessage({
          defaultMessage: 'Inverter added successfully!',
        }),
      );
      setCurrentDevice(toDevice(inverter, 'Inverter'));

      reset();
      addInverterDialog.onClose();
    } catch (err) {
      //@ts-ignore
      toast.error(err.message);
    }
  };

  const onUpdateInverter: InverterFormDialogProps['onSubmit'] =
    async values => {
      if (!currentDevice) {
        return;
      }
      try {
        const inverter = await updateInverterMutation.mutateAsync({
          id: currentDevice?.id,
          serial_number: values.serialNumber,
          site: siteId,
          cmodel: parseInt(values.model.key, 10),
        });

        if (values.file instanceof File) {
          await addFileToInverterMutation.mutateAsync({
            file: values.file,
            inverterId: inverter.id,
          });
        }

        updateInverterDialog.onClose();
        toast.success(
          intl.formatMessage({
            defaultMessage: 'Inverter updated successfully!',
          }),
        );
        setCurrentDevice(null);
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

  const onAddBattery: BatteryFormDialogProps['onSubmit'] = async (
    values,
    reset,
  ) => {
    try {
      const battery = await createBatteryMutation.mutateAsync({
        serial_number: values.serialNumber,
        cmodel: parseInt(values.model.key, 10),
        manufacturer: values.manufacturer.label,
        model: values.manufacturer.label,
        inverter_id: parseInt(values.inverter.key, 10),
      });

      await addFileToBatteryMutation.mutateAsync({
        file: values.file,
        batteryId: battery.id,
      });

      toast.success(
        intl.formatMessage({
          defaultMessage: 'Battery added successfully!',
        }),
      );
      setCurrentDevice(toDevice(battery, 'Battery'));
      commsMethodDialog.onOpen();

      reset();
      addBatteryDialog.onClose();
    } catch (err) {
      //@ts-ignore
      toast.error(err.message);
    }
  };

  const onUpdateBattery: BatteryFormDialogProps['onSubmit'] = async values => {
    if (!currentDevice) {
      return;
    }
    try {
      const battery = await updateBatteryMutation.mutateAsync({
        id: currentDevice.id,
        serial_number: values.serialNumber,
        cmodel: parseInt(values.model.key, 10),
        manufacturer: values.manufacturer.label,
        model: values.manufacturer.label,
        inverter_id: parseInt(values.inverter.key, 10),
      });

      if (values.file instanceof File) {
        await addFileToBatteryMutation.mutateAsync({
          file: values.file,
          batteryId: battery.id,
        });
      }

      toast.success(
        intl.formatMessage({
          defaultMessage: 'Battery updated successfully!',
        }),
      );

      setCurrentDevice(null);
      updateBatteryDialog.onClose();
    } catch (err) {
      //@ts-ignore
      toast.error(err.message);
    }
  };

  const devices = useExtractDevices(site);
  const siteHasInverters = useMemo(() => devices.find(d => d.deviceType === 'Inverter'), [devices]);
  const siteHasBatteries = useMemo(() => devices.find(d => d.deviceType === 'Battery'), [devices]);
  const siteHasMeters = useMemo(() => devices.find(d => d.deviceType === 'Meter'), [devices]);

  const areYouSureDisclosure = useDisclosure();

  const [onAreYouSureCallbacks, setOnAreYouSureCallbacks] = useState<AreYouSureCallbacks>({
    onCancel: noop,
    onConfirm: noop,
  });
  const handleAddBattery = () => {
    if (siteHasBatteries || siteHasMeters) {
      addBatteryDialog.onOpen();
    } else {
      areYouSureDisclosure.onOpen();
      setOnAreYouSureCallbacks({
        onCancel: () => {
          areYouSureDisclosure.onClose();
        },
        onConfirm: () => {
          areYouSureDisclosure.onClose();
          addBatteryDialog.onOpen();
        }
      });
    }
  };

  const handleAddMeter = () => {
    if (siteHasBatteries || siteHasMeters) {
      // eslint-disable-next-line no-alert
      window.alert("TODO: add meter");
    } else {
      areYouSureDisclosure.onOpen();
      setOnAreYouSureCallbacks({
        onCancel: () => {
          areYouSureDisclosure.onClose();
        },
        onConfirm: () => {
          areYouSureDisclosure.onClose();
          // eslint-disable-next-line no-alert
          window.alert("TODO: add meter");
        }
      });
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
        <button
          type="button"
          disabled={!siteHasInverters}
          className="disabled:opacity-30"
          onClick={addMeterDialog.onOpen} // TODO  handleAddMeter <- use this 
        >
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
        <button
          type="button"
          disabled={!siteHasInverters}
          className="disabled:opacity-30"
          onClick={handleAddBattery}
        >
          <Typography className="flex font-medium">
            <SvgIcon name="BatteryRect" className="mr-3 w-5" />
            {intl.formatMessage({ defaultMessage: 'Add Battery' })}
          </Typography>
        </button>
      ),
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const hasInverters = !!devices.find(d => d.deviceType === 'Inverter');
    setNextButtonProps({
      content: intl.formatMessage({
        defaultMessage: 'Next',
      }),
      variant: 'main-green',
      type: 'button',
      disabled: !hasInverters,
      onClick: () => {
        router.push(routes.electrician.verification(siteId));
      },
    });
  }, [intl, setNextButtonProps, devices, areYouSureDisclosure.onOpen, router, siteId]);

  const defaultValues = useMemo(() => {
    if (currentDevice?.deviceType === 'Inverter') {
      return {
        manufacturer: {
          key: currentDevice.manufacturer.toString(),
          label: currentDevice.manufacturer_name,
        },
        model: {
          key: currentDevice.model.toString(),
          label: currentDevice.model_name,
          dependentKey: currentDevice.manufacturer.toString(),
        },
        serialNumber: currentDevice.serial_number,
        file: currentDevice.files?.[0],
      };
    }
    if (currentDevice?.deviceType === 'Battery') {
      return {
        manufacturer: {
          key: currentDevice.manufacturer.toString(),
          label: currentDevice.manufacturer_name,
        },
        model: {
          key: currentDevice.model.toString(),
          label: currentDevice.model_name,
          dependentKey: currentDevice.manufacturer.toString(),
        },
        serialNumber: currentDevice.serial_number,
        file: {
          url: currentDevice.imageUrl,
          type: 'image',
          name: currentDevice.name,
        },
        //TODO inverter data
        // inverter: {
        //   key: currentDevice.inverter.toString(),
        //   label: currentDevice.inverter_name,
        // },
      };
    }

    return undefined;
  }, [currentDevice]);

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
          <DeviceList rowClickHandler={rowClickHandler} devices={devices} />
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
          <Button variant="main-green" onClick={handleActionModify}>
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
        fileValueMapper={fileValueMapper}
      />

      <InverterFormDialog
        open={updateInverterDialog.isOpen}
        onClose={updateInverterDialog.onClose}
        onSubmit={onUpdateInverter}
        title={intl.formatMessage({ defaultMessage: 'Update Inverter' })}
        submitButtonTitle={intl.formatMessage({
          defaultMessage: 'Update Device',
        })}
        defaultValues={defaultValues}
        fileValueMapper={fileValueMapper}
      />

      <MeterFormDialog
        open={addMeterDialog.isOpen}
        onClose={addMeterDialog.onClose}
        onSubmit={() => undefined}
        title={intl.formatMessage({ defaultMessage: 'Add Meter' })}
        submitButtonTitle={intl.formatMessage({
          defaultMessage: 'Add Device',
        })}
        defaultValues={defaultValues}
        fileValueMapper={fileValueMapper}
        inverters={site.inverters}
      />

      <BatteryFormDialog
        open={addBatteryDialog.isOpen}
        onClose={addBatteryDialog.onClose}
        onSubmit={onAddBattery}
        title={intl.formatMessage({ defaultMessage: 'Add Battery' })}
        submitButtonTitle={intl.formatMessage({ defaultMessage: 'Add Device' })}
        siteId={siteId}
        fileValueMapper={fileValueMapper}
      />

      <BatteryFormDialog
        open={updateBatteryDialog.isOpen}
        onClose={updateBatteryDialog.onClose}
        onSubmit={onUpdateBattery}
        title={intl.formatMessage({ defaultMessage: 'Update Battery' })}
        submitButtonTitle={intl.formatMessage({
          defaultMessage: 'Update Device',
        })}
        siteId={siteId}
        defaultValues={defaultValues}
        fileValueMapper={fileValueMapper}
      />

      {currentDevice && (
        <CommsMethodFormDialog
          device={currentDevice}
          open={commsMethodDialog.isOpen}
          onClose={() => {
            commsMethodDialog.onClose();
            setCurrentDevice(null);
          }}
          isLoading={
            inverterCommsTestMutation.isLoading
            || batteryCommsTestMutation.isLoading
            || meterCommsTestMutation.isLoading
          }
          onSubmit={async ({ method, ipAddress, slaveId }) => {
            const commType = method.key as CommType;

            const testDeviceCommsMutation = (() => {
              if (currentDevice.deviceType === 'Inverter') {
                return inverterCommsTestMutation;
              }

              if (currentDevice.deviceType === 'Battery') {
                return batteryCommsTestMutation;
              }

              return meterCommsTestMutation;
            })();

            const commsParams: CommsParams & { id: number } = commType === 'fixed_ip'
              ? {
                id: currentDevice.id,
                ip: ipAddress,
                slave_id: Number(slaveId),
              }
              : {
                id: currentDevice.id,
                dhcp: true,
                slave_id: Number(slaveId),
              };

            try {
              const testResult = await testDeviceCommsMutation.mutateAsync(commsParams);
              setCommsParamsAndTestResult({ params: commsParams, result: testResult });
              commsResultDialog.onOpen();
              commsMethodDialog.onClose();
            } catch (err) {
              reportApiError(toast, err);
            }
          }}
        />
      )}

      {currentDevice && commsParamsAndTestResult && (
        <CommsMethodResultDialog
          open={commsResultDialog.isOpen}
          onConfirm={async () => {
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
              await updateDeviceCommsMutation.mutateAsync(commsParamsAndTestResult.params);
              toast.success(intl.formatMessage({
                defaultMessage: 'Saved communication parameters.'
              }));
              setCommsParamsAndTestResult(null);
              setCurrentDevice(null);
              commsResultDialog.onClose();
            } catch (err) {
              reportApiError(toast, err);
            }
          }}
          onClose={() => {
            setCommsParamsAndTestResult(null);
            setCurrentDevice(null);
            commsResultDialog.onClose();
          }}
          onBack={() => {
            setCommsParamsAndTestResult(null);
            commsResultDialog.onClose();
            commsMethodDialog.onOpen();
          }}
          result={commsParamsAndTestResult.result}
        />
      )}

      <AreYouSureDialog callbacks={onAreYouSureCallbacks} disclosure={areYouSureDisclosure} />
      <Toast />
    </>
  );
}
