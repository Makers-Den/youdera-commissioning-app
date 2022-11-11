
import { Site } from '@src/integrations/youdera/sites/types';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';

import { DeviceList } from '../DeviceList';
import { LargeBox } from '../LargeBox';

export type DevicesContentProps = {
  project: Site;
};

export function DevicesContent({ project }: DevicesContentProps) {
  const intl = useIntl();

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Devices' })}
        />
      </BoxHeader>
      <BoxContent className="max-h-[500px] overflow-y-scroll">
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
