import { Role } from '@src/api/youdera/apiTypes';
import { SuccessPageContent } from '@src/components/page-content/SuccessPageContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchProjectFromParams, SiteProps } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';

const CompleteProjectPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const backToMainMenu = () => {
    router.push(routes.electrician.selectProject);
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

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.electrician,
  Role.admin,
]).then(fetchProjectFromParams);

export default CompleteProjectPage;
