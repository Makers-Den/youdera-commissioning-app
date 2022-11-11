/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Battery } from '@src/integrations/youdera/batteries/types';
import { ApiFile } from '@src/integrations/youdera/files/types';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { Meter } from '@src/integrations/youdera/meters/types';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { Typography } from 'ui/typography/Typography';

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

// TODO: waiting for proper way to form url to image file
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
            onClick={() => onSelectDevice(device)}
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
            <Td>TODO</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
