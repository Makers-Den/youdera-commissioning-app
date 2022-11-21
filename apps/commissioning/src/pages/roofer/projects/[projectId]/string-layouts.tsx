import { Role } from '@src/api/youdera/apiTypes';
import { ConfimationDialog } from '@src/components/dialogs/ConfimationDialog';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { StringLayoutsContent } from '@src/components/page-content/StringLayoutsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchProjectFromParams } from '@src/utils/server/fetchProjectFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from 'ui/dialogs/useDisclosure';

const StringLayoutsPage = ({
  project,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const continueDialog = useDisclosure();

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.roofer.moduleFields(project.id));
  };

  const nextClickHandler = () => {
    continueDialog.onOpen();
  };

  const continueClickHandler = () => {
    router.push(routes.roofer.complete(project.id));
  };

  return (
    <>
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
          <StringLayoutsContent projectId={project.id} />
        </Suspense>
      </AuthenticatedLayout>
      <ConfimationDialog
        isOpen={continueDialog.isOpen}
        onClose={continueDialog.onClose}
        onCancel={continueDialog.onClose}
        title={intl.formatMessage({ defaultMessage: 'Are you sure?' })}
        description={intl.formatMessage({
          defaultMessage:
            'Are you sure that all roofs and strings have been set up completely?',
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

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchProjectFromParams);

export default StringLayoutsPage;
