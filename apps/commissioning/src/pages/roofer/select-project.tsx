import { Role } from '@src/api/youdera/apiTypes';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectProjectContent } from '@src/components/page-content/SelectProjectContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { routes } from '@src/utils/routes';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectProjectPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push(routes.roofer.selectTask);
  };

  return (
    <AuthenticatedLayout
      navVariant="primary"
      navHeader={intl.formatMessage({ defaultMessage: 'Commissioning' })}
      onNavCrossClick={navCrossClickHandler}
      footerProps={{
        buttons: [
          {
            content: intl.formatMessage({ defaultMessage: 'MAIN MENU' }),
            variant: 'additional-gray',
            type: 'button',
            onClick: navCrossClickHandler,
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <SelectProjectContent
          projectPathCreator={routes.roofer.selectModuleType}
        />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
  Role.admin,
]).then(async _context => ({
  props: {},
}));

export default SelectProjectPage;
