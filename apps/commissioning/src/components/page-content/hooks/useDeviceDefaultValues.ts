import {
  BatteryModel,
  InverterModel,
  MeterModel,
} from '@src/api/youdera/apiTypes';
import { Device } from '@src/utils/devices';
import { useMemo } from 'react';
import { IconName } from 'ui/svg-icons/SvgIcon';

/**
 * Creates the default values for device forms
 *
 * @param currentDevice
 * @param meterTypeOptions
 * @param batteryModels
 * @param inverterModels
 * @param meterModels
 *
 * @returns defaultValues
 */
export const useDeviceDefaultValues = (
  currentDevice: Device | null,
  meterTypeOptions: { key: string; label: string; icon: IconName }[],
  batteryModels: BatteryModel[],
  inverterModels: InverterModel[],
  meterModels: MeterModel[],
) =>
  useMemo(() => {
    if (currentDevice?.deviceType === 'Inverter') {
      return {
        manufacturer: {
          key: currentDevice.manufacturer.toString(),
          label: currentDevice.manufacturer_name,
        },
        model: {
          id: currentDevice.model,
          name: currentDevice.model_name,
          manufacturer_name: currentDevice.manufacturer_name,
          manufacturer_id: currentDevice.manufacturer,
          autoSerialnumber: !!inverterModels.filter(
            inverterModel => inverterModel.id === currentDevice.model,
          )[0].data?.auto_serialnumber,
          label: currentDevice.model_name,
          dependentKey: currentDevice.manufacturer.toString(),
        },
        serialNumber: currentDevice.serial_number,
        files: currentDevice.files,
      };
    }
    if (currentDevice?.deviceType === 'Battery') {
      return {
        manufacturer: {
          key: currentDevice.manufacturer.toString(),
          label: currentDevice.manufacturer_name,
        },
        model: {
          id: currentDevice.model,
          name: currentDevice.model_name,
          manufacturer_name: currentDevice.manufacturer_name,
          manufacturer_id: currentDevice.manufacturer,
          autoSerialnumber: !!batteryModels.filter(
            batteryModel => batteryModel.id === currentDevice.model,
          )[0].data?.auto_serialnumber,
          label: currentDevice.model_name,
          dependentKey: currentDevice.manufacturer.toString(),
        },
        serialNumber: currentDevice.serial_number,
        files: currentDevice.files,

        inverter: currentDevice.inverter
          ? {
            id: currentDevice.inverter.id,
            label: `${currentDevice.inverter.name} - ${currentDevice.inverter.model_name}`,
            name: currentDevice.inverter.name,
          }
          : undefined,
      };
    }
    if (currentDevice?.deviceType === 'Meter') {
      const meterModel = meterModels.filter(
        meterModel => meterModel.id === currentDevice.model,
      )[0];
      return {
        meterType: meterTypeOptions.filter(
          option => option.key === currentDevice.type,
        )[0],
        manufacturer: {
          key: currentDevice.manufacturer.toString(),
          label: currentDevice.manufacturer_name,
        },
        model: {
          id: currentDevice.model,
          name: currentDevice.model_name,
          manufacturer_name: currentDevice.manufacturer_name,
          manufacturer_id: currentDevice.manufacturer,
          autoSerialnumber: !!meterModel?.data?.auto_serialnumber,
          indirect: !!meterModel?.data?.indirect,
          label: currentDevice.model_name,
          dependentKey: currentDevice.manufacturer.toString(),
        },
        factor: currentDevice.factor,
        serialNumber: currentDevice.number,
        auxiliary: !!currentDevice.is_auxiliary,
        files: currentDevice.files,
        connectedInverters:
          currentDevice.inverters?.map(inverter => ({
            key: inverter.id.toString(),
            label: inverter.name || `Inverter ${inverter.id}`,
          })) || [],
      };
    }

    return undefined;
  }, [
    currentDevice,
    meterTypeOptions,
    batteryModels,
    inverterModels,
    meterModels,
  ]);
