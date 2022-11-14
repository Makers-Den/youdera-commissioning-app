/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Battery } from '@src/integrations/youdera/batteries/types';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { Meter } from '@src/integrations/youdera/meters/types';
import { Device, toDevice } from '@src/utils/devices';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

/** 5 columns */
const GRID_COLS = 'grid-cols-[100px_150px_minmax(100px,_1fr)_100px_50px]';
/** 2 columns */
const INNER_GRID_COLS = 'grid-cols-[250px_1fr]';

export type VerificationListProps = {
  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
  siteId: number;
};

const FLEX_CENTER = 'flex items-center';


function DeviceVerification({ device }: { device: Device }) {
  const expanded = useDisclosure();

  return (
    <div className='bg-gray-400 py-5 rounded mb-2'>
      {/* Clickable general device info row */}
      <div
        className={clsxm(
          'grid', GRID_COLS,
          'cursor-pointer',
          'transition-all pb-0',
          expanded.isOpen && 'pb-2',
        )}
        key={device.id}
        role="button"
        onClick={expanded.toggle}
      >
        <div className="ml-6 flex aspect-square w-11 items-center justify-center overflow-hidden rounded">
          <Image src={device.imageUrl} alt={`${device.type} image`} />
        </div>
        <div>
          <Typography weight="medium" className='truncate'>{device.name}</Typography>
          <Typography variant="label">{device.serial_number}</Typography>
        </div>
        <div>
          <Typography variant="label" className='truncate'>{device.manufacturer}</Typography>
          <Typography variant="label" className='truncate'>{device.model}</Typography>
        </div>
        <div className={FLEX_CENTER}>
          <SvgIcon name={device.type} />
        </div>
        <div className={clsxm(FLEX_CENTER, 'justify-end pr-6')}>
          <SvgIcon name='ChevronDown' className={clsxm(
            'w-3',
            'transition-transform rotate-0',
            expanded.isOpen && 'rotate-180'
          )} />
        </div>
      </div>
      {/* Expandable testing/results row */}
      <div className={clsxm(
        'grid', GRID_COLS,
        'px-6',
        'border-gray-500',
        'overflow-hidden',
        'transition-all',
        expanded.isOpen ? 'pt-2 max-h-[800px] border-t overflow-y-auto opacity-100' : 'max-h-0 h-0 opacity-0',
      )}>
        {/* Header */}
        <div className={clsxm('col-span-5', 'grid', GRID_COLS, 'mb-2')}>
          <div className="pl-6 col-span-2">Test time</div>
          <div>Test result</div>
          <div className={clsxm('col-span-2')}>
            <Button className='w-full' variant='main-green' size='sm'>Run Test</Button>
          </div>
        </div>
        {/* Results */}
        <div className={clsxm('bg-green-300', 'col-span-5', 'grid', INNER_GRID_COLS)}>
          <div className="pl-6">2022-07-06 12:23</div>
          <div>Some warning message</div>
        </div>
      </div>
    </div>
  )
}

export function VerificationList({ siteId: _, inverters, batteries, meters }: VerificationListProps) {
  const intl = useIntl();

  const devices: Device[] = useMemo(() => [
    ...(inverters || []).map(d => toDevice(d, 'Inverter')),
    ...(batteries || []).map(d => toDevice(d, 'Battery')),
    ...(meters || []).map(d => toDevice(d, 'Meter'))
  ], [inverters, batteries, meters]);


  return (
    <div className="w-full">
      <div className={clsxm('grid', GRID_COLS, 'mb-3')}>
        <div className='col-span-2'>{intl.formatMessage({ defaultMessage: "Name" })}</div>
        <div>{intl.formatMessage({ defaultMessage: "Manufacturer and model" })}</div>
        <div>{intl.formatMessage({ defaultMessage: "Type" })}</div>
        <div />
        <div />
      </div>
      {devices.map(device => <DeviceVerification key={device.id} device={(device)} />)}
    </div>
  );
}
