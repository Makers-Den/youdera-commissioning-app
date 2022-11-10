import { useGetUnattachedGateways } from '@src/integrations/youdera/gateways/hooks/useGetUnattachedGateways';
import { updateGateway } from '@src/integrations/youdera/gateways/mutations/updateGateway';
import { Gateway } from '@src/integrations/youdera/gateways/types';
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

export function SelectGatewayContent({ siteId, onGatewaySelected }: SelectGatewayContentProps) {
  const intl = useIntl();
  const [searchInput, setSearchInput] = useState('');

  const { unattachedGatewaysQuery } = useGetUnattachedGateways();

  const gateways = useMemo(
    () =>
      (unattachedGatewaysQuery.data || [])
        ?.filter(({ name }) => {
          const lowerCaseSearch = searchInput.toLowerCase();
          return (
            name.toLowerCase().includes(lowerCaseSearch)
          );
        }),
    [unattachedGatewaysQuery.data, searchInput],
  );

  const searchInputChangeHandler: InputProps['onChange'] = e => {
    setSearchInput(e.target.value);
  };

  const onSelectGateway = useCallback(async (gateway: Gateway) => {
    try {
      await updateGateway({ gatewayId: gateway.id, siteId });
    } catch (err) {
      // TODO: toast feedback system pending
      // eslint-disable-next-line no-console
      console.error(err);
    }

    onGatewaySelected();

  }, [siteId, onGatewaySelected]);

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
      <BoxContent className="max-h-[500px] overflow-y-scroll">
        <GatewayList gateways={gateways} onSelectGateway={onSelectGateway} />
      </BoxContent>
    </LargeBox>
  );
}
