import { SuccessPageContent } from '@src/components/page-content/SuccessPageContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { fetchProjectFromParams } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';

const ModuleFieldsPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const backToMainMenu = () => {
    router.push('/roofer/select-task');
  };

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={project.name}
      onNavCrossClick={backToMainMenu}
    >
      <SuccessPageContent
        title={intl.formatMessage({
          defaultMessage: 'Project setup was finished',
        })}
      >
        <Button
          variant="additional-gray"
          className="mt-5"
          onClick={backToMainMenu}
        >
          {intl.formatMessage({ defaultMessage: 'MAIN MENU' })}
        </Button>
      </SuccessPageContent>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
]).then(fetchProjectFromParams);

export default ModuleFieldsPage;
