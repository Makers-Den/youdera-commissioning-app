import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import {
  SelectMainModuleContent,
  SelectMainModuleContentProps,
} from '@src/components/page-content/SelectMainModuleContent';
import { getSite } from '@src/integrations/youdera/sites/queries/getSite';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { useMainModuleStore } from '@src/stores/useMainModuleStore';
import { addYouderaAuthInterceptors } from '@src/utils/addYouderaAuthInterceptors';
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

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;
  const { projectId } = params || {};

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  addYouderaAuthInterceptors(context);

  try {
    const project = await getSite(String(projectId));
    return {
      props: {
        project,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default SelectMainModuleTypePage;
