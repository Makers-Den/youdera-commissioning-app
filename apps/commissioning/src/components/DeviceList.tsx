/* eslint-disable jsx-a11y/interactive-supports-focus */
import { commStatusToIcon, Device } from '@src/utils/devices';
import { useIntl } from 'react-intl';
import { Image } from 'ui/image/Image';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { Typography } from 'ui/typography/Typography';

export type DeviceListProps = {
  devices?: Device[];
  rowClickHandler: (device: Device) => () => void;
};

export function DeviceList({
  devices = [],
  rowClickHandler,
}: DeviceListProps) {
  const intl = useIntl();

  return (
    <Table className="w-full">
      <Thead>
        <Tr>
          <Th colSpan={2} className="ml-6 w-[285px]">
            {intl.formatMessage({ defaultMessage: 'Name' })}
          </Th>
          <Th className="w-[200px]">
            {intl.formatMessage({ defaultMessage: 'Manufacturer and model' })}
          </Th>
          <Th className="w-[50px]">
            {intl.formatMessage({ defaultMessage: 'Type' })}
          </Th>
          <Th>{intl.formatMessage({ defaultMessage: 'Status' })}</Th>
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
              <Typography weight="medium" className="w-[160px] truncate">
                {device.name}
              </Typography>
              <Typography variant="label">{device.serial_number}</Typography>
            </Td>
            <Td>
              <Typography variant="label" className="w-[160px] truncate">
                {device.manufacturer_name || '-'}
              </Typography>
              <Typography variant="label" className="w-[160px] truncate">
                {device.model_name || '-'}
              </Typography>
            </Td>
            <Td>
              <SvgIcon name={device.type} />
            </Td>
            <Td>
              <SvgIcon
                name={
                  commStatusToIcon[device.communication_status] || 'StatusOk'
                }
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
