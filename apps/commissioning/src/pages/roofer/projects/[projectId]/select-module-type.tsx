import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import {
  SelectMainModuleContent,
  SelectMainModuleContentProps,
} from '@src/components/page-content/SelectMainModuleContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { useMainModuleStore } from '@src/stores/useMainModuleStore';
import { fetchProjectFromParams } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectMainModuleTypePage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const setMainModule = useMainModuleStore(state => state.setMainModule);

  const navCrossClickHandler = () => {
    router.push('/roofer/select-task');
  };

  const backClickHandler = () => {
    router.push('/roofer/select-project');
  };

  const moduleClickHandler: SelectMainModuleContentProps['onModuleClick'] =
    module => {
      setMainModule(module);
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

//

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
]).then(fetchProjectFromParams);

export default SelectMainModuleTypePage;
