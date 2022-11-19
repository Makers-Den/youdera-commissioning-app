import { Gateway } from '@src/api/youdera/apiTypes';
import { updateGateway } from '@src/api/youdera/hooks/gateways/apiRequests';
import { useGatewaysQuery } from '@src/api/youdera/hooks/gateways/hooks';
import { useCallback, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Divider } from 'ui/divider/Divider';
import { Input, InputProps } from 'ui/inputs/Input';

import { GatewayList } from '../GatewayList';
import { LargeBox } from '../LargeBox';

export type SelectGatewayContentProps = {
  siteId: number;
  onGatewaySelected: () => void;
};

export function SelectGatewayContent({
  siteId,
  onGatewaySelected,
}: SelectGatewayContentProps) {
  const intl = useIntl();
  const [searchInput, setSearchInput] = useState('');

  const gatewaysQuery = useGatewaysQuery();

  const filteredGateways = useMemo(
    () =>
      (gatewaysQuery.data || [])
        // Filter away attached gateways, except if its attached to this project
        .filter(({ site_id }) => !site_id || site_id === siteId)
        .filter(({ name }) =>
          name.toLowerCase().includes(searchInput.toLowerCase()),
        ),
    [gatewaysQuery.data, siteId, searchInput],
  );

  const searchInputChangeHandler: InputProps['onChange'] = e => {
    setSearchInput(e.target.value);
  };

  const onSelectGateway = useCallback(
    async (gateway: Gateway) => {
      try {
        await updateGateway({ gatewayId: gateway.id, siteId });
      } catch (err) {
        // TODO: toast feedback system pending
        // eslint-disable-next-line no-console
        console.error(err);
      }

      onGatewaySelected();
    },
    [siteId, onGatewaySelected],
  );

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Select gateway' })}
        />
      </BoxHeader>
      <BoxContent>
        <Input
          className="w-full"
          onChange={searchInputChangeHandler}
          value={searchInput}
          placeholder={intl.formatMessage({ defaultMessage: 'Search' })}
          icon="MagnifyingGlass"
        />
      </BoxContent>
      <Divider className="my-5" />
      <BoxContent>
        <GatewayList
          gateways={filteredGateways}
          siteId={siteId}
          onSelectGateway={onSelectGateway}
        />
      </BoxContent>
    </LargeBox>
  );
}
