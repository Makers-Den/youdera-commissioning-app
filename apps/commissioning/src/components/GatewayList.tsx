/* eslint-disable jsx-a11y/interactive-supports-focus */
import { Gateway } from '@src/integrations/youdera/gateways/types';
import { useIntl } from 'react-intl';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';

export type GatewayListProps = {
  gateways: Gateway[];
  onSelectGateway: (gateway: Gateway) => void;
};

export function GatewayList({ gateways, onSelectGateway }: GatewayListProps) {
  const intl = useIntl();

  return (
    <List>
      {gateways.map(gateway => (
        <ListItem key={gateway.id}>
          <div role="button" className="flex cursor-pointer gap-5" onClick={() => onSelectGateway(gateway)}>
            <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-green-300">
              <SvgIcon name="Gateway" className="w-10 text-white" />
            </div>
            <div>
              <Typography weight="medium">{gateway.serial_number}</Typography>
              <Typography variant="label">{intl.formatMessage({ defaultMessage: 'Gateway serial number' })}</Typography>
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
}
