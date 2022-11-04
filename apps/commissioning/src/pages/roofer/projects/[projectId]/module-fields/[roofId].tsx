import { ActionsDialog } from '@src/components/ActionsDialog';
import { ModifyStringDialog } from '@src/components/modify-string/ModifyStringDialog';
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

const Strings = ({
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

  const [selectedId, setSelectedId] = useState<number>()
  const [isModifyOpen, setIsModifyOpen] = useState<boolean>(false);
  const [isActionsOpen, setIsActionsOpen] = useState<boolean>(false);

  const onOpenActions = (id: number) => {
    setSelectedId(id)
    setIsActionsOpen(true);
  };
  const onOpenModify = () => {
    setIsActionsOpen(false);
    setIsModifyOpen(true);
  };
  const onCloseActions = () => setIsActionsOpen(false);
  const onCloseModify = () => setIsModifyOpen(false);

  const onChangeInverter = () => undefined;
  const onDelete = (id: number) => {

  }

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
      <StringsList stringsOnRoof={stringsOnRoof} onOpen={onOpenActions} />
      <ActionsDialog isOpen={isActionsOpen} onClose={onCloseActions} description={intl.formatMessage({ defaultMessage: 'What you want to do with list element?' })}>
        <Button variant='main-green' onClick={onOpenModify}>{intl.formatMessage({ defaultMessage: 'Modify properties' })}</Button>
        <Button variant='main-green' onClick={onChangeInverter}>{intl.formatMessage({ defaultMessage: 'Change inverter/mpp' })}</Button>
        <Button variant='danger' onClick={() => onDelete(1)}>{intl.formatMessage({ defaultMessage: 'Delete' })}</Button>
        <Button variant='additional-gray' onClick={onCloseActions}>{intl.formatMessage({ defaultMessage: 'Cancel' })}</Button>
      </ActionsDialog>
      <ModifyStringDialog open={isModifyOpen} onClose={onCloseModify} />
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

export default Strings;
