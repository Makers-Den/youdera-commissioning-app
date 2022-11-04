import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { SelectProjectContent } from '@src/components/page-content/SelectProjectContent';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense } from 'react';
import { useIntl } from 'react-intl';

const projectPathCreator = (id: number) =>
  `/roofer/projects/${id}/select-module-type`;

// eslint-disable-next-line arrow-body-style
const SelectProjectPage = () => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push('/roofer/select-task');
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
        <SelectProjectContent projectPathCreator={projectPathCreator} />
      </Suspense>
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
]).then(async _context => ({
  props: {},
}));

export default SelectProjectPage;
