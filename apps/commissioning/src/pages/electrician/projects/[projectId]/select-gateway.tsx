import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectGatewayContent } from '@src/components/page-content/SelectGatewayContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { useGetGateways } from '@src/integrations/youdera/gateways/hooks/useGetGateways';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchProjectFromParams } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectGatewayPage = ({
  project,
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
    router.push(routes.electrician.devices(project.id));
  };

  const { gatewaysQuery } = useGetGateways({ suspense: false });

  const nextIsEnabled = (gatewaysQuery.data || [])
    .reduce((acc, gateway) => gateway.site_id === project.id || acc, false);

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={project.name}
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
            disabled: !nextIsEnabled
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <SelectGatewayContent onGatewaySelected={onGatewaySelected} siteId={project.id}/>
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician, Role.admin,
]).then(fetchProjectFromParams);

export default SelectGatewayPage;
