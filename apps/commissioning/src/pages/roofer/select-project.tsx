import { SelectProjectContent } from '@src/components/page-content/SelectProjectContent';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { useRouter } from 'next/router';
import React from 'react';
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
      <SelectProjectContent projectPathCreator={projectPathCreator} />
    </AuthenticatedLayout>
  );
};

export default SelectProjectPage;
