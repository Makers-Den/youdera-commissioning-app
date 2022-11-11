/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Battery } from '@src/integrations/youdera/batteries/types';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { Meter } from '@src/integrations/youdera/meters/types';
import { Device, toDevice } from '@src/utils/devices';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { Typography } from 'ui/typography/Typography';

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
              Ver. Status
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
