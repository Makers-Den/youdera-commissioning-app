
import { useGetSite } from '@src/integrations/youdera/sites/hooks/useGetSite';
import { Site } from '@src/integrations/youdera/sites/types';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';

import { VerificationList } from '../VerificationList';
import { LargeBox } from '../LargeBox';

export type VerificationContentProps = {
  siteId: number;
};

export function VerificationContent({ siteId }: VerificationContentProps) {
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
        <VerificationList 
          siteId={project.id}
          inverters={project.inverters}
          batteries={project.batteries}
          meters={project.meters}
        />
      </BoxContent>
    </LargeBox>
  );
}
