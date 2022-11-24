import { Role, UserInfo } from '@src/api/youdera/apiTypes';
import { useSuspensfulCurrentUserQuery } from '@src/api/youdera/hooks/auth/hooks';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SettingsContent } from '@src/components/page-content/SettingsContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SettingsWithDataFetch = () => {
  const intl = useIntl();
  const router = useRouter();
    const currentUser = useSuspensfulCurrentUserQuery();

    const userInfo = currentUser.data as UserInfo;

    const backHandler = () => {
      router.push(
        userInfo.role === 'roofer'
        ? routes.roofer.selectTask
        : routes.electrician.selectTask
      );
    }

    return (
      <AuthenticatedLayout
        navVariant="primary"
        navHeader={intl.formatMessage({ defaultMessage: 'Settings' })}
        onNavCrossClick={backHandler}
        footerProps={{
          buttons: [
            {
              content: intl.formatMessage({ defaultMessage: 'Back' }),
              variant: 'additional-gray',
              type: 'button',
              onClick: backHandler,
            },
          ],
        }}
      >
        <SettingsContent userInfo={userInfo} />
      </AuthenticatedLayout>
    );
      
}

const Settings: React.FC = () => (
  <Suspense fallback={<LargeBoxSkeleton />}>
    <SettingsWithDataFetch />
  </Suspense>
);


export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
  Role.admin,
]).then(() => ({ props: {} }))

export default Settings;
