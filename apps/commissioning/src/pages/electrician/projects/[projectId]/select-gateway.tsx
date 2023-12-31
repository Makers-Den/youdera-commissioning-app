import { Role } from '@src/api/youdera/apiTypes';
import { useGatewaysQuery } from '@src/api/youdera/hooks/gateways/hooks';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectGatewayContent } from '@src/components/page-content/SelectGatewayContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectGatewayPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push(routes.electrician.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.electrician.selectProject);
  };

  const onGatewaySelected = () => {
    router.push(routes.electrician.devices(site.id));
  };

  const gatewaysQuery = useGatewaysQuery({ suspense: false });

  const nextIsEnabled = (gatewaysQuery.data || []).reduce(
    (acc, gateway) => gateway.site_id === site.id || acc,
    false,
  );

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={site.name}
      onNavCrossClick={navCrossClickHandler}
      footerProps={{
        buttons: [
          {
            content: intl.formatMessage({
              defaultMessage: 'Back',
            }),
            variant: 'additional-gray',
            type: 'button',
            onClick: backClickHandler,
          },
          {
            content: intl.formatMessage({
              defaultMessage: 'Next',
            }),
            variant: 'main-green',
            type: 'button',
            onClick: onGatewaySelected,
            disabled: !nextIsEnabled,
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <SelectGatewayContent
          onGatewaySelected={onGatewaySelected}
          siteId={site.id}
        />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.electrician,
  Role.admin,
]).then(fetchSiteFromParams);

export default SelectGatewayPage;
