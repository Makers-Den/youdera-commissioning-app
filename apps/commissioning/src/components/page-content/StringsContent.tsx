import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
import { StringsOnRoof } from '@src/integrations/youdera/strings/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';

// import { z } from 'zod';
import { ActionsDialog } from '../dialogs/ActionsDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import { StringCreationFormDialogA } from '../forms/StringCreationFormDialogA';
import { StringCreationFormDialogB } from '../forms/StringCreationFormDialogB';
import { StringsList } from '../StringsList';

// const createModuleValidation = z.object({
//   name: z.string().min(2),
//   specificYield: z.number().gt(0),
//   azimut: z.number().gt(0).lte(360),
//   slantAngle: z.number().gt(0).lte(90),
// });

// const updateModuleValidation = z.object({
//   name: z.string().min(2).optional().or(z.literal('')),
//   specificYield: z.number().gt(0).or(z.literal(undefined)),
//   azimut: z.number().gt(0).lte(360).or(z.literal(undefined)),
//   slantAngle: z.number().gt(0).lte(90).or(z.literal(undefined)),
// });

export interface StringContentProps {
  stringsOnRoof: StringsOnRoof
}

export function StringsContent({ stringsOnRoof }: StringContentProps) {
  const intl = useIntl();
  useZodErrorMap();

  const [selectedId, setSelectedId] = useState<number>()
  const actionsDialog = useDisclosure();
  const modifyDialog = useDisclosure();
  const deletionDialog = useDisclosure();
  const addStringDialog = useDisclosure();

  const handleAddStringOpen = () => {
    actionsDialog.onClose()
    addStringDialog.onOpen()
  }
  const handleRowClick = (id: number) => {
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
    <>
      <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
        <BoxHeader>
          <BoxTitle
            title={intl.formatMessage({ defaultMessage: 'Strings' })}
          />
          <Button className="ml-auto w-[200px]" onClick={handleAddStringOpen}>
            + {intl.formatMessage({ defaultMessage: 'Add string' })}
          </Button>
        </BoxHeader>
        <BoxContent>
          <StringsList stringsOnRoof={stringsOnRoof} onRowClick={handleRowClick} />
        </BoxContent>
      </Box>

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

      <StringCreationFormDialogA
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
      <StringCreationFormDialogB open={addStringDialog.isOpen} onClose={addStringDialog.onClose} />
    </>
  );
}
