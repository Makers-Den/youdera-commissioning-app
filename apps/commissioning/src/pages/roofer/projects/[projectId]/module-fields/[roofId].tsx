import { Role } from '@src/api/youdera/apiTypes';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { StringsContent } from '@src/components/page-content/StringsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const StringsPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const { roofId: roofIdUnparsed } = router.query;
  const roofId = Number(roofIdUnparsed);

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const okClickHandler = () => {
    router.push(routes.roofer.moduleFields(site.id));
  };

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={site.name}
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
        {!Number.isNaN(roofId) && <StringsContent roofId={roofId} siteId={site.id} />}
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchSiteFromParams);

export default StringsPage;
