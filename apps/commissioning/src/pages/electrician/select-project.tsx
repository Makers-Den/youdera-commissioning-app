import { Role } from '@src/api/youdera/apiTypes';
import { useGatewaysQuery } from '@src/api/youdera/hooks/gateways/hooks';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectProjectContent } from '@src/components/page-content/SelectProjectContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense, useCallback } from 'react';
import { useIntl } from 'react-intl';

const SelectProjectContentWithGatewaySkip = () => {
  const gatewaysQuery = useGatewaysQuery();

  const projectPathCreator = useCallback(
    (siteId: number) => {
      const hasGateway = !!gatewaysQuery.data?.find(
        gateway => gateway.site_id === siteId,
      );
      if (hasGateway) {
        return routes.electrician.devices(siteId);
      }

      return routes.electrician.selectGateway(siteId);
    },
    [gatewaysQuery.data],
  );

  return <SelectProjectContent projectPathCreator={projectPathCreator} />;
};

const SelectProjectPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push(routes.electrician.selectTask);
  };

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={intl.formatMessage({ defaultMessage: 'Commissioning' })}
      onNavCrossClick={navCrossClickHandler}
      footerProps={{
        buttons: [
          {
            content: intl.formatMessage({ defaultMessage: 'MAIN MENU' }),
            variant: 'additional-gray',
            type: 'button',
            onClick: navCrossClickHandler,
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <SelectProjectContentWithGatewaySkip />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician,
  Role.admin,
]).then(async _context => ({
  props: {},
}));

export default SelectProjectPage;
