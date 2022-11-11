
import { useGetSite } from '@src/integrations/youdera/sites/hooks/useGetSite';
import { Site } from '@src/integrations/youdera/sites/types';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';

import { DeviceList } from '../DeviceList';
import { LargeBox } from '../LargeBox';

export type DevicesContentProps = {
  siteId: number;
};

export function DevicesContent({ siteId }: DevicesContentProps) {
  const intl = useIntl();

  const { siteQuery } = useGetSite(siteId);
  // TODO: how do we get non-null type more elegantly? 
  // We should assume suspense so it's always set.
  const project = siteQuery.data as Site;

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Devices' })}
        />
      </BoxHeader>
      <BoxContent>
        <DeviceList 
          siteId={project.id}
          inverters={project.inverters}
          batteries={project.batteries}
          meters={project.meters}
        />
      </BoxContent>
    </LargeBox>
  );
}
