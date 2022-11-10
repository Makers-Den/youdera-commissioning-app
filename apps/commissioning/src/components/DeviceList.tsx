/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Battery } from '@src/integrations/youdera/batteries/types';
import { ApiFile } from '@src/integrations/youdera/files/types';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { Meter } from '@src/integrations/youdera/meters/types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Image } from 'ui/image/Image';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

export type DeviceListProps = {
  inverters?: Inverter[];
  batteries?: Battery[];
  meters?: Meter[];
  siteId: number;
};

type DeviceType = 'Inverter' | 'Battery' | 'Meter';

type Device = (
  | Inverter & { type: 'Inverter' }
  | Battery & { type: 'Battery' }
  | Meter & {
    type: 'Meter', 
    /** copy of `number` */
    serial_number: string
    }
  ) & { imageUrl: string };

function toImageUrl(_?: ApiFile) {
  return "https://picsum.photos/100";
}

function toDevice(thing: Inverter | Battery | Meter, type: DeviceType) {
  return {
    ...thing,
    type,
    ...(type === 'Meter' && { serial_number: (thing as Meter).number }),
    imageUrl: toImageUrl(thing?.files?.[0]),
  } as Device;
}

export function DeviceList({ inverters, batteries, meters }: DeviceListProps) {
  const intl = useIntl();

  const devices: Device[] = useMemo(() => [
    ...(inverters || []).map(d => toDevice(d, 'Inverter')), 
    ...(batteries || []).map(d => toDevice(d, 'Battery')),
    ...(meters || []).map(d => toDevice(d, 'Meter'))
  ], [inverters, batteries, meters]);

  const onSelectDevice = (_: Device) => {
    // eslint-disable-next-line no-alert
    alert('Todo');
  }

  return (
    <>
    <div className='flex mb-4'>
      <div className='ml-6 w-[285px]'>{intl.formatMessage({ defaultMessage: "Name" })}</div>
      <div className='w-[200px]'>{intl.formatMessage({ defaultMessage: "Manufacturer and model" })}</div>
      <div className='w-[50px]'>{intl.formatMessage({ defaultMessage: "Type" })}</div>
      <div>{intl.formatMessage({ defaultMessage: "Status" })}</div>
    </div>
    <List>
      {devices.map(device => (
        <ListItem variant='primary' key={device.id}>
          <div
            role="button"
            className={clsxm(
              'flex cursor-pointer gap-5'
            )}
            onClick={() => onSelectDevice(device)}
          >
            <div className="flex aspect-square w-11 items-center justify-center overflow-hidden rounded">
              <Image src={device.imageUrl} alt={`${device.type} image`} />
            </div>
            <div>
              <Typography weight="medium" className='w-[200px] truncate'>{device.name}</Typography>
              <Typography variant="label">{device.serial_number}</Typography>
            </div>
            <div className='flex flex-col justify-between w-[180px]'>
              <Typography variant="label" className='w-[160px] truncate'>{device.manufacturer}</Typography>
              <Typography variant="label" className='w-[160px] truncate'>{device.model}</Typography>
            </div>
            <div>
              <SvgIcon name={device.type} />
            </div>
          </div>
        </ListItem>
      ))}
      {devices.length < 1 && 
        <Typography className='text-center'>
          {intl.formatMessage({ defaultMessage: "This project doesn't have devices yet" })}
        </Typography>
      }
    </List>
    </>
  );
}
