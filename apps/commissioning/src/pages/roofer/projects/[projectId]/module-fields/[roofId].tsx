import { ActionsDialog } from '@src/components/ActionsDialog';
import { StringsList } from '@src/components/page-content/StringsList';
import { getSite } from '@src/integrations/youdera/sites/queries/getSite';
import { getStringsOnRoof } from '@src/integrations/youdera/strings/queries/getStringsOnRoof';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { addYouderaAuthInterceptors } from '@src/utils/addYouderaAuthInterceptors';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';

export const Strings = ({
  project,
  stringsOnRoof
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const intl = useIntl();
  const router = useRouter();

  const navCrossClickHandler = () => {
    router.push('/roofer/select-task');
  };

  const backClickHandler = () => {
    router.push(`/roofer/projects/${project.id}/module-fields`);
  };

  const nextClickHandler = () => { };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>()

  const onOpen = (id: number) => {
    setSelectedId(id)
    setIsOpen(true);
  };
  const onClose = () => setIsOpen(false);

  return (
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
              defaultMessage: 'Ok',
            }),
            variant: 'main-green',
            type: 'button',
            onClick: nextClickHandler,
          },
        ],
      }}
    >
      <StringsList stringsOnRoof={stringsOnRoof} onOpen={onOpen} />
      <ActionsDialog isOpen={isOpen} onClose={onClose} description={intl.formatMessage({ defaultMessage: 'What you want to do with list element?' })}>
        <Button>{intl.formatMessage({ defaultMessage: 'Modify properties' })}</Button>
        <Button>{intl.formatMessage({ defaultMessage: 'Change inverter/mpp' })}</Button>
        <Button>{intl.formatMessage({ defaultMessage: 'Delete' })}</Button>
        <Button>{intl.formatMessage({ defaultMessage: 'Cancel' })}</Button>
      </ActionsDialog>
    </AuthenticatedLayout >
  );
};

//

export const getServerSideProps: GetServerSideProps = async context => {
  const { params } = context;
  const { projectId, roofId } = params || {};

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  addYouderaAuthInterceptors(context);

  try {
    const project = await getSite(String(projectId));
    const stringsOnRoof = await getStringsOnRoof(Number(roofId))
    return {
      props: {
        project,
        stringsOnRoof
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};