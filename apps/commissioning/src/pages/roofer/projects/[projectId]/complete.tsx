import { Role } from '@src/api/youdera/apiTypes';
import { SuccessPageContent } from '@src/components/page-content/SuccessPageContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';

const CompleteProjectPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const backToMainMenu = () => {
    router.push(routes.roofer.selectTask);
  };

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={site.name}
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
          data-cy='main-menu-button'
        >
          {intl.formatMessage({ defaultMessage: 'MAIN MENU' })}
        </Button>
      </SuccessPageContent>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchSiteFromParams);

export default CompleteProjectPage;
