import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { StringsContent } from '@src/components/page-content/StringsContent'
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { fetchStringsFromParams } from '@src/utils/server/fetchStringsFromParams'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const StringsPage = ({
  project,
  stringsOnRoof,
  inverters,
  inverterModels
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push('/roofer/select-task');
  };

  const okClickHandler = () => {
    router.push(`/roofer/projects/${project.id}/module-fields`);
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
              defaultMessage: 'Ok',
            }),
            variant: 'main-green',
            type: 'button',
            onClick: okClickHandler,
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <StringsContent stringsOnRoof={stringsOnRoof} inverters={inverters} inverterModels={inverterModels} />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
]).then(fetchStringsFromParams);

export default StringsPage;