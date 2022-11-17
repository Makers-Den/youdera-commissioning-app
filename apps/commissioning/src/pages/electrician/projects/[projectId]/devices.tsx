import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { DevicesContent } from '@src/components/page-content/DevicesContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchProjectFromParams } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';

const DevicesPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
const intl = useIntl();
const router = useRouter();

const navCrossClickHandler = () => {
  router.push(routes.electrician.selectTask);
};

const backClickHandler = () => {
  router.push(routes.electrician.selectGateway(project.id));
};

const nextClickHandler = () => {
  // TODO: prevent next if no inverters
  // TODO: ask if all inverters have been added before proceeding
  router.push(routes.electrician.verification(project.id));
};

return (
  <AuthenticatedLayout
    navVariant="primary"
    navHeader={project.name}
    onNavCrossClick={navCrossClickHandler}
    footerProps={{
      buttons: [
        {
          content: intl.formatMessage({
            defaultMessage: 'Change gateway',
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
          onClick: nextClickHandler,
        },
      ],
    }}
  >
    <Suspense fallback={<LargeBoxSkeleton />}>
      <DevicesContent siteId={project.id} />
    </Suspense>
  </AuthenticatedLayout>
);
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician, Role.admin,
]).then(fetchProjectFromParams);

export default DevicesPage;
