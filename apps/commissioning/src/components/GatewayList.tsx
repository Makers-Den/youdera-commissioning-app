/* eslint-disable jsx-a11y/interactive-supports-focus */

import { Gateway } from '@src/api/youdera/apiTypes';
import { useIntl } from 'react-intl';
import { List, ListItem } from 'ui/list/List';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';
import { Typography } from 'ui/typography/Typography';
import clsxm from 'ui/utils/clsxm';

export type GatewayListProps = {
  gateways: Gateway[];
  siteId: number;
  onSelectGateway: (gateway: Gateway) => void;
};

export function GatewayList({
  gateways,
  siteId,
  onSelectGateway,
}: GatewayListProps) {
  const intl = useIntl();

  return (
    <List>
      {gateways.map(gateway => (
        <ListItem
          variant="primary"
          key={gateway.id}
          className={clsxm(
            gateway.site_id === siteId && 'border-2 border-green-400',
          )}
        >
          <div
            role="button"
            className={clsxm('flex cursor-pointer gap-5')}
            onClick={() => onSelectGateway(gateway)}
          >
            <div className="flex aspect-square w-11 items-center justify-center rounded-full bg-green-300">
              <SvgIcon name="Gateway" className="w-10 text-white" />
            </div>
            <div>
              <Typography weight="medium">{gateway.serial_number}</Typography>
              <Typography variant="label">
                {intl.formatMessage({
                  defaultMessage: 'Gateway serial number',
                })}
              </Typography>
            </div>
            <div className="flex flex-1 items-center justify-end">
              <Typography weight="medium" className="uppercase text-green-400">
                {intl.formatMessage({ defaultMessage: 'Attached' })}
              </Typography>
            </div>
          </div>
        </ListItem>
      ))}
      {gateways.length < 1 && (
        <Typography className="text-center">
          {intl.formatMessage({ defaultMessage: 'No unattached gateways' })}
        </Typography>
      )}
    </List>
  );
}
