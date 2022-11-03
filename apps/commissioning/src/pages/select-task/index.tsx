/* eslint-disable arrow-body-style */
/* eslint-disable import/prefer-default-export */

import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import React from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { CardLink } from 'ui/card-link/CardLink';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

const SelectTask: React.FC = () => {
  const intl = useIntl();

  return (
    <AuthenticatedLayout>
      <Box className="justify-self-start">
        <BoxHeader>
          <BoxTitle
            title={intl.formatMessage({ defaultMessage: 'Select task' })}
          />
        </BoxHeader>
        <BoxContent className="flex space-x-4">
          <CardLink
            title={intl.formatMessage({ defaultMessage: 'Commissioning' })}
            href="http://google.com"
            icon={<SvgIcon name="Commissioning" />}
          />
          <CardLink
            title={intl.formatMessage({ defaultMessage: 'Device swap' })}
            href="http://google.com"
            icon={<SvgIcon name="DeviceSwap" />}
            disabled
          />
          <CardLink
            title={intl.formatMessage({ defaultMessage: 'Extenstion' })}
            href="http://google.com"
            icon={<SvgIcon name="Extention" />}
            disabled
          />
        </BoxContent>
      </Box>
    </AuthenticatedLayout>
  );
};

export default SelectTask;
