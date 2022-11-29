import { Role } from '@src/api/youdera/apiTypes';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { VerificationContent } from '@src/components/page-content/VerificationContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { fetchSiteFromParams, SiteProps } from '@src/utils/server/fetchSiteFromParams';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Suspense, useState } from 'react';
import { useIntl } from 'react-intl';
import { ButtonProps } from 'ui/buttons/Button';

const VerificationPage = ({
  site,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push(routes.electrician.selectTask);
  };

  const backClickHandler = () => {
    router.push(routes.electrician.devices(site.id));
  };

  const [nextButtonProps, setNextButtonProps] = useState<
    (ButtonProps & { content: string }) | null
  >(null);

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
          ...(nextButtonProps ? [nextButtonProps] : []),
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <VerificationContent
          siteId={site.id}
          setNextButtonProps={setNextButtonProps}
        />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps<SiteProps> = protectRoute([
  Role.electrician,
  Role.admin,
]).then(fetchSiteFromParams);

export default VerificationPage;
