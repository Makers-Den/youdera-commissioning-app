import { Role } from '@src/api/youdera/apiTypes';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import {
  SelectMainModuleContent,
  SelectMainModuleContentProps,
} from '@src/components/page-content/SelectMainModuleContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { useMainModuleStore } from '@src/stores/useMainModuleStore';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectMainModuleTypePage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const setMainModule = useMainModuleStore(state => state.setMainModule);

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.roofer.selectProject);
  };

  const moduleClickHandler: SelectMainModuleContentProps['onModuleClick'] =
    module => {
      setMainModule(module);
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
        <SelectMainModuleContent onModuleClick={moduleClickHandler} />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchSiteFromParams);

export default SelectMainModuleTypePage;
