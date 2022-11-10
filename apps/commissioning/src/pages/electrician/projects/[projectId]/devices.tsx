import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
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
  router.push('/electrician/select-task');
};

const backClickHandler = () => {
  router.push(`/electrician/projects/${project.id}/select-gateway`);
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
            defaultMessage: 'Back',
          }),
          variant: 'additional-gray',
          type: 'button',
          onClick: backClickHandler,
        },
      ],
    }}
  >
    <Suspense fallback={<LargeBoxSkeleton />}>
        <div className="min-h-[70vh]">TODO: devices</div>
    </Suspense>
  </AuthenticatedLayout>
);
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician,
]).then(fetchProjectFromParams);

export default DevicesPage;
