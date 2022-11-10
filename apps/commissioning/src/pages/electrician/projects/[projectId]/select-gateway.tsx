import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useIntl } from 'react-intl';

const SelectGatewayPage = () => {
const intl = useIntl();
const router = useRouter();

const navCrossClickHandler = () => {
  router.push('/electrician/select-task');
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
      <div className='min-h-[70vh]'>TODO: select gateway</div>
    </Suspense>
  </AuthenticatedLayout>
);
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.electrician,
]).then(async _context => ({
  props: {},
}));

export default SelectGatewayPage;
