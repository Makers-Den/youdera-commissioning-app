import { StringsList } from '@src/components/page-content/StringsList';
import { getSite } from '@src/integrations/youdera/sites/queries/getSite';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { addYouderaAuthInterceptors } from '@src/utils/addYouderaAuthInterceptors';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';

const Strings = ({
  project
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();
  const { roofId } = router.query

  const navCrossClickHandler = () => {
    router.push('/roofer/select-task');
  };

  const backClickHandler = () => {
    router.push(`/roofer/projects/${project.id}/module-fields`);
  };

  const nextClickHandler = () => { };

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
              defaultMessage: 'Ok',
            }),
            variant: 'main-green',
            type: 'button',
            onClick: nextClickHandler,
          },
        ],
      }}
    >
      <StringsList roofId={Number(roofId)} />
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
        project
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default Strings;
