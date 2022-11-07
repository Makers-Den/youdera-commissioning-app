import { ActionsDialog } from '@src/components/dialogs/ActionsDialog';
import { AddStringDialog } from '@src/components/dialogs/AddStringDialog';
import { DeletionDialog } from '@src/components/dialogs/DeletionDialog';
import { LargeBoxSkeleton } from '@src/components/LargeBoxSkeleton';
import { ModifyStringDialog } from '@src/components/modify-string/ModifyStringDialog';
import { StringsList } from '@src/components/page-content/StringsList';
import { Role } from '@src/integrations/youdera/auth/types';
import { AuthenticatedLayout } from '@src/layouts/AuthenticatedLayout';
import { protectRoute } from '@src/middlewares/protectRoute';
import { fetchStringsFromParams } from '@src/utils/server/fetchStringsFromParams'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import React, { Suspense, useState } from 'react';
import { useIntl } from 'react-intl';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';

const StringsListPage = ({
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

  const okClickHandler = () => {
    router.push(`/roofer/projects/${project.id}/module-fields`);
  };

  const [selectedId, setSelectedId] = useState<number>()
  const actionsDialog = useDisclosure();
  const modifyDialog = useDisclosure();
  const deletionDialog = useDisclosure();
  const addStringDialog = useDisclosure();

  const handleAddStringOpen = () => {
    actionsDialog.onClose()
    addStringDialog.onOpen()
  }
  const handleActionsOpen = (id: number) => {
    setSelectedId(id)
    actionsDialog.onOpen()
  };
  const handleModifyOpen = () => {
    actionsDialog.onClose()
    modifyDialog.onOpen()
  };

  const handleInverterOpen = () => undefined;
  const handleDeleteOpen = () => {
    actionsDialog.onClose()
    deletionDialog.onOpen()
  }
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
            onClick: okClickHandler,
          },
        ],
      }}
    >
      <Suspense fallback={<LargeBoxSkeleton />}>
        <StringsList stringsOnRoof={stringsOnRoof} onOpen={handleActionsOpen} onAddString={handleAddStringOpen} />
      </Suspense>

      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <Button variant="main-green" onClick={handleModifyOpen}>
          {intl.formatMessage({ defaultMessage: 'Modify properties' })}
        </Button>
        <Button variant="main-green" onClick={handleInverterOpen}>
          {intl.formatMessage({ defaultMessage: 'Change inverter/mpp' })}
        </Button>
        <Button variant="danger" onClick={handleDeleteOpen}>
          {intl.formatMessage({ defaultMessage: 'Delete' })}
        </Button>
        <Button variant="additional-gray" onClick={actionsDialog.onClose}>
          {intl.formatMessage({ defaultMessage: 'Cancel' })}
        </Button>
      </ActionsDialog>

      <ModifyStringDialog
        open={modifyDialog.isOpen}
        onClose={modifyDialog.onClose}
      />
      <DeletionDialog
        onDelete={() => onDelete(selectedId!)}
        isOpen={deletionDialog.isOpen}
        onClose={deletionDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'Are you sure to delete module field?',
        })}
      />
      <AddStringDialog open={addStringDialog.isOpen} onClose={addStringDialog.onClose} />
    </AuthenticatedLayout>
  );
};

export const getServerSideProps: GetServerSideProps = protectRoute([
  Role.roofer,
]).then(fetchStringsFromParams);

export default StringsListPage;