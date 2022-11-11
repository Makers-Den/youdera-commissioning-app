/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Battery } from '@src/integrations/youdera/batteries/types';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { Meter } from '@src/integrations/youdera/meters/types';
import { Device, toDevice } from '@src/utils/devices';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

const GRID_COLS = 'grid-cols-[100px_150px_minmax(100px,_1fr)_100px_50px]';

export type VerificationListProps = {
  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
  siteId: number;
};

export function VerificationList({ siteId: _, inverters, batteries, meters }: VerificationListProps) {
  const intl = useIntl();

  const devices: Device[] = useMemo(() => [
    ...(inverters || []).map(d => toDevice(d, 'Inverter')),
    ...(batteries || []).map(d => toDevice(d, 'Battery')),
    ...(meters || []).map(d => toDevice(d, 'Meter'))
  ], [inverters, batteries, meters]);


  const rowClickHandler = (_: Device) => () => {
  };


  return (
    <div className="w-full">
      <div className={clsxm('grid', GRID_COLS)}>
        <div className='ml-6 col-span-2'>{intl.formatMessage({ defaultMessage: "Name" })}</div>
        <div className='w-[200px]'>{intl.formatMessage({ defaultMessage: "Manufacturer and model" })}</div>
        <div className='w-[50px]'>{intl.formatMessage({ defaultMessage: "Type" })}</div>
        <div />
        <div />
      </div>
      {devices.map(device => (
        <div className='bg-gray-400 rounded py-10 mb-2'>
          {/* Header row */}
          <div
            className={clsxm('grid', GRID_COLS, 'pb-2 cursor-pointer')}
            key={device.id}
            role="button"
            onClick={rowClickHandler(device)}
          >
            <div className="ml-2 flex aspect-square w-11 items-center justify-center overflow-hidden rounded">
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
            <div>
              <SvgIcon name={device.type} />
            </div>
            <div>
              <SvgIcon name='ChevronDown' className='w-3' />
            </div>
          </div>
          {/* Expanded test results */}
          <div className={clsxm('grid', GRID_COLS, 'border-t border-gray-500 pt-2')}>
            <div className="col-span-2">Test time</div>
            <div>Test result</div>
            <div className="col-span-2"><Button variant='main-green'>Run Test</Button></div>

          </div>
        </div>
      ))}
    </div>
  );
}
