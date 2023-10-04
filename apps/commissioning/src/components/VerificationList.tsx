/* eslint-disable jsx-a11y/interactive-supports-focus */

import {
  VerificationTestResult,
  VerificationTestStatus,
} from '@src/api/youdera/apiTypes';
import {
  useBatteryMutations,
  useBatteryVerificationGuideQuery,
} from '@src/api/youdera/hooks/batteries/hooks';
import {
  useInverterMutations,
  useInverterVerificationGuideQuery,
} from '@src/api/youdera/hooks/inverters/hooks';
import {
  useMeterMutations,
  useMeterVerificationGuideQuery,
} from '@src/api/youdera/hooks/meters/hooks';
import { formatIsoDate } from '@src/utils/dateUtils';
import { Device, DeviceType } from '@src/utils/devices';
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'ui/dialogs/Dialog';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { BodySmallText, BodyText, Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

/** 5 columns */
const GRID_COLS = 'grid-cols-[100px_150px_minmax(100px,_1fr)_100px_50px]';
/** 3 columns */
const INNER_GRID_COLS = 'grid-cols-[230px_minmax(100px,_1fr)_130px]';

const FLEX_CENTER = 'flex items-center';

type VerificationListStyles = {
  container: string;
  name: string;
  resultContainer: string;
  result: string;
  latestLog: string;
  olderLog: string;
};

const statusStyles: {
  [key in VerificationTestStatus | 'none']: VerificationListStyles;
} = {
  success: {
    container: 'bg-brand-two-50 border-brand-two-100',
    name: 'text-brand-two-400',
    resultContainer: 'border-brand-two-100',
    result: 'bg-brand-two-200 border-brand-two-400',
    latestLog: 'bg-brand-two-200',
    olderLog: 'border-brand-two-200',
  },
  failed: {
    container: 'bg-danger-50',
    name: 'text-danger-400',
    resultContainer: 'border-danger-100',
    result: 'bg-danger-100 border-danger-100',
    latestLog: 'bg-danger-200',
    olderLog: 'border-danger-200',
  },
  warning: {
    container: 'bg-yellow-50',
    name: 'text-yellow-400',
    resultContainer: 'border-yellow-100',
    result: 'bg-yellow-200 border-yellow-400',
    latestLog: 'bg-yellow-200',
    olderLog: 'border-yellow-200',
  },
  none: {
    container: 'bg-gray-50 border-gray-400',
    name: '',
    resultContainer: 'border-gray-400',
    result: '',
    latestLog: '',
    olderLog: '',
  },
} as const;

/** Map of device type to its respective verification test mutation */
const verificationMutationMap: {
  [key in DeviceType]: (
    siteId: number,
  ) => UseMutationResult<VerificationTestResult, unknown, number, unknown>;
} = {
  Meter: function useExecuteMeterVerificationMutation(siteId: number) {
    return useMeterMutations(siteId).executeMeterVerificationMutation;
  },
  Inverter: function useExecuteInverterVerificationMutation(siteId: number) {
    return useInverterMutations(siteId).executeInverterVerificationMutation;
  },
  Battery: function useExecuteBatteryVerificationMutation(siteId: number) {
    return useBatteryMutations(siteId).executeBatteryVerificationMutation;
  },
};

function useExecuteDeviceVerificationMutation(
  siteId: number,
  type: DeviceType,
) {
  return verificationMutationMap[type](siteId);
}

/** Map of device type to its respective verification guide query */
const verificationGuideMap: {
  [key in DeviceType]: (deviceId: number) => UseQueryResult<string>;
} = {
  Meter: useMeterVerificationGuideQuery,
  Inverter: useInverterVerificationGuideQuery,
  Battery: useBatteryVerificationGuideQuery,
};

function useDeviceVerificationGuide(deviceId: number, type: DeviceType) {
  return verificationGuideMap[type](deviceId);
}

function VerificationGuideDialog({
  siteId,
  device,
  onClose,
}: {
  siteId: number;
  device: Device;
  onClose: () => void;
}) {
  const intl = useIntl();

  const deviceVerificationGuideQuery = useDeviceVerificationGuide(
    device.id,
    device.deviceType,
  );
  const executeDeviceVerificationMutation =
    useExecuteDeviceVerificationMutation(siteId, device.deviceType);

  return (
    <Dialog open onClose={onClose}>
      <DialogHeader>
        <DialogTitle
          title={intl.formatMessage({ defaultMessage: 'Instructions' })}
        />
      </DialogHeader>
      <DialogContent className="flex w-[500px] flex-col">
        {deviceVerificationGuideQuery.isLoading && '...'}
        <BodyText>{deviceVerificationGuideQuery.data}</BodyText>
        <div className="mt-5 flex justify-end gap-3">
          <Button variant="main-gray" onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
          <Button
            variant="main-green"
            onClick={() => {
              executeDeviceVerificationMutation.mutateAsync(device.id);
              onClose();
            }}
            isLoading={executeDeviceVerificationMutation.isLoading}
            data-cy="confirmation-confirm-button"
          >
            {intl.formatMessage({ defaultMessage: 'Execute' })}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DeviceVerification({
  siteId,
  device,
  dataCy,
}: {
  siteId: number;
  device: Device;
  dataCy: string;
}) {
  const intl = useIntl();

  const expanded = useDisclosure();
  const status = device.verificationTestStatus || 'none';
  const guideShown = useDisclosure();

  return (
    <>
      <div
        className={clsxm(
          'mb-2 rounded border py-5',
          statusStyles[status].container,
        )}
        data-cy={dataCy}
      >
        {/* Clickable general device info row */}
        <div
          className={clsxm(
            'grid',
            GRID_COLS,
            'cursor-pointer',
            'pb-0 transition-all',
            expanded.isOpen && 'pb-2',
          )}
          role="button"
          onClick={expanded.toggle}
        >
          <div className="ml-6 flex aspect-square w-11 items-center justify-center overflow-hidden rounded">
            <Image src={device.imageUrl} alt={`${device.deviceType} image`} />
          </div>
          <div>
            <Typography
              weight="medium"
              className={clsxm('truncate', statusStyles[status].name)}
            >
              {device.name}
            </Typography>
            <Typography variant="label">{device.serial_number}</Typography>
          </div>
          <div>
            <Typography variant="label" className="truncate">
              {device.manufacturer_name || '-'}
            </Typography>
            <Typography variant="label" className="truncate">
              {device.model_name || '-'}
            </Typography>
          </div>
          <div className={FLEX_CENTER}>
            <SvgIcon name={device.deviceType} />
          </div>
          <div className={clsxm(FLEX_CENTER, 'justify-end pr-6')}>
            <SvgIcon
              name="ChevronDown"
              className={clsxm(
                'w-3',
                'rotate-0 transition-transform',
                expanded.isOpen && 'rotate-180',
              )}
            />
          </div>
        </div>

        {/* Expandable testing/results row */}
        <div
          className={clsxm(
            'grid',
            GRID_COLS,
            'px-6',
            'border-gray-500',
            'overflow-hidden',
            'transition-all',
            expanded.isOpen
              ? `max-h-[800px] overflow-y-auto border-t pt-2 opacity-100 ${statusStyles[status].resultContainer}`
              : 'h-0 max-h-0 opacity-0',
          )}
        >
          {/* Header */}
          <div
            className={clsxm(
              'col-span-5',
              'grid',
              INNER_GRID_COLS,
              'mt-2 mb-3',
            )}
          >
            <BodyText className="flex items-end pl-6 leading-3">
              {intl.formatMessage({ defaultMessage: 'Test time' })}
            </BodyText>
            <BodyText className="flex items-end leading-3">
              {intl.formatMessage({ defaultMessage: 'Test result' })}
            </BodyText>
            <div className={clsxm('items-end" flex')}>
              <Button
                className="w-full"
                variant="main-green"
                size="sm"
                onClick={guideShown.onOpen}
                data-cy={`${dataCy}-test-btn`}
              >
                {intl.formatMessage({ defaultMessage: 'Run Test' })}
              </Button>
            </div>
          </div>
          {/* Results */}
          {device.testlogs?.map((log, idx) => (
            <div
              key={log.id}
              className={clsxm(
                'rounded py-3',
                'col-span-5',
                'grid',
                INNER_GRID_COLS,
                'mb-2',
                idx === 0
                  ? statusStyles[log.status].latestLog
                  : ['border', statusStyles[log.status].olderLog],
              )}
            >
              <div className="pl-6">{formatIsoDate(log.created_at)}</div>
              <BodySmallText>{log.result}</BodySmallText>
            </div>
          ))}
          {(!device.testlogs || device.testlogs.length < 1) && (
            <div
              className={clsxm(
                'rounded py-3',
                'col-span-5',
                'grid',
                INNER_GRID_COLS,
              )}
            >
              <BodySmallText className="col-span-3 pl-6">
                {intl.formatMessage({ defaultMessage: 'No test execution' })}
              </BodySmallText>
            </div>
          )}
        </div>
      </div>
      {guideShown.isOpen && (
        <VerificationGuideDialog
          siteId={siteId}
          device={device}
          onClose={guideShown.onClose}
        />
      )}
    </>
  );
}

export type VerificationListProps = {
  devices: Device[];
  siteId: number;
};

export function VerificationList({ siteId, devices }: VerificationListProps) {
  const intl = useIntl();

  return (
    <div className="w-full">
      <div className={clsxm('grid', GRID_COLS, 'mb-3')}>
        <div className="col-span-2">
          {intl.formatMessage({ defaultMessage: 'Name' })}
        </div>
        <div>
          {intl.formatMessage({ defaultMessage: 'Manufacturer and model' })}
        </div>
        <div>{intl.formatMessage({ defaultMessage: 'Type' })}</div>
        <div />
        <div />
      </div>
      {devices.map((device, idx) => (
        <DeviceVerification
          key={`${device.deviceType}-${device.id}`}
          siteId={siteId}
          device={device}
          dataCy={`device-${idx}`}
        />
      ))}
    </div>
  );
}
