import { Role } from '@src/api/youdera/apiTypes';
import { useAuth } from '@src/api/youdera/hooks/auth/hooks';
import { useCommissionSiteMutation } from '@src/api/youdera/hooks/sites/hooks';
import { ConfimationDialog } from '@src/components/dialogs/ConfimationDialog';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { StringLayoutsContent } from '@src/components/page-content/StringLayoutsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { reportApiError } from '@src/utils/errorUtils';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { useToast } from 'ui/toast/Toast';

const StringLayoutsPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();
  const commissionSiteMutation = useCommissionSiteMutation(site.id);
  const toast = useToast();
  const continueDialog = useDisclosure();
  const { userInfoQuery } = useAuth();

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.roofer.moduleFields(site.id));
  };

  const nextClickHandler = () => {
    continueDialog.onOpen();
  };

  const continueClickHandler = async () => {
      try {
        await commissionSiteMutation.mutateAsync(
          userInfoQuery.data?.role === 'admin'
          ? { roofer_done: true } 
          : {}
        );
        router.push(routes.roofer.complete(site.id));
        toast.success(intl.formatMessage({
          defaultMessage: 'Site commissioned.'
        }));
      } catch (err) {
        reportApiError(toast, err);
      }    
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
          <StringLayoutsContent projectId={site.id} />
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

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.roofer,
  Role.admin,
]).then(fetchSiteFromParams);

export default StringLayoutsPage;
