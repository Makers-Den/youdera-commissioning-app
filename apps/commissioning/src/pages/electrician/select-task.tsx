import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { routes } from '@src/utils/routes';
import Link from 'next/link';
import React from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { CardLink } from 'ui/card-link/CardLink';
import { SvgIcon } from 'ui/svg-icons/SvgIcon';

const SelectTask: React.FC = () => {
  const intl = useIntl();

  return (
    <AuthenticatedLayout>
      <Box className="mb-auto justify-self-start">
        <BoxHeader>
          <BoxTitle
            title={intl.formatMessage({ defaultMessage: 'Select task' })}
          />
        </BoxHeader>
        <BoxContent className="flex space-x-4">
          <Link href={routes.electrician.selectProject} passHref legacyBehavior>
            <CardLink
              title={intl.formatMessage({ defaultMessage: 'Commissioning' })}
              icon={<SvgIcon name="Commissioning" />}
            />
          </Link>
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
