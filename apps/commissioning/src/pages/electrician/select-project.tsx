import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectProjectContent } from '@src/components/page-content/SelectProjectContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { useGetGateways } from '@src/integrations/youdera/gateways/hooks/useGetGateways';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense, useCallback } from 'react';
import { useIntl } from 'react-intl';

const SelectProjectContentWithGatewaySkip = () => {
  const { gatewaysQuery } = useGetGateways();
  
  const projectPathCreator = useCallback(
    (siteId: number) => {
      const hasGateway = !!gatewaysQuery.data?.find(gateway => gateway.site_id === siteId)
      if (hasGateway) {
        return `/electrician/projects/${siteId}/devices`;
      }
      
      return `/electrician/projects/${siteId}/select-gateway`;
    },
    [gatewaysQuery.data]
  );

  return <SelectProjectContent projectPathCreator={projectPathCreator} />
}

const SelectProjectPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push('/electrician/select-task');
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
]).then(async _context => ({
  props: {},
}));

export default SelectProjectPage;
