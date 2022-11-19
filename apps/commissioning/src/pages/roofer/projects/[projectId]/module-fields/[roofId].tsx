import { Role } from '@src/api/youdera/apiTypes';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { StringsContent } from '@src/components/page-content/StringsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchStringsFromParams } from '@src/utils/server/fetchStringsFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const StringsPage = ({
  project,
  roofId,
  siteId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const okClickHandler = () => {
    router.push(routes.roofer.moduleFields(project.id));
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
        <StringsContent roofId={roofId} siteId={siteId} />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchStringsFromParams);

export default StringsPage;
