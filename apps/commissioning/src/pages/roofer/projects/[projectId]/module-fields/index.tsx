import { Role } from '@src/api/youdera/apiTypes';
import { ConfimationDialog } from '@src/components/dialogs/ConfimationDialog';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { ModuleFieldsContent } from '@src/components/page-content/ModuleFieldsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from 'ui/dialogs/useDisclosure';

const ModuleFieldsPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const continueDialog = useDisclosure();

  const continueClickHandler = () => {
    router.push(routes.roofer.stringLayouts(site.id));
  };

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.roofer.selectModuleType(site.id));
  };

  const nextClickHandler = () => {
    continueDialog.onOpen();
  };

  return (
    <>
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
            {
              content: intl.formatMessage({
                defaultMessage: 'Next',
              }),
              variant: 'main-green',
              type: 'button',
              onClick: nextClickHandler,
            },
          ],
        }}
      >
        <Suspense fallback={<LargeBoxSkeleton />}>
          <ModuleFieldsContent projectId={site.id} />
        </Suspense>
      </AuthenticatedLayout>
      <ConfimationDialog
        isOpen={continueDialog.isOpen}
        onClose={continueDialog.onClose}
        onCancel={continueDialog.onClose}
        title={intl.formatMessage({ defaultMessage: 'Check it' })}
        description={intl.formatMessage({
          defaultMessage: 'Are you sure that all module fields were added?',
        })}
        onConfirm={continueClickHandler}
        confirmButtonVariant="main-green"
        confirmButtonTitle={intl.formatMessage({
          defaultMessage: 'Yes',
        })}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchSiteFromParams);

export default ModuleFieldsPage;
