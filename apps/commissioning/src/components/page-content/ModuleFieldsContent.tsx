import { useModuleFields } from '@src/integrations/youdera/module-fields/hooks/useModuleFields';
import { ModuleField } from '@src/integrations/youdera/module-fields/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { z } from 'zod';

import { ActionsDialog } from '../ActionsDialog';
import { DeletionDialog } from '../DeletionDialog';
import {
  ModuleFieldFormDialog,
  ModuleFieldFormDialogProps,
} from '../field-creation/ModuleFieldFormDialog';
import { LargeBox } from '../LargeBox';

const validation = z.object({
  name: z.string().min(2),
  specificYield: z.number().gt(0),
  azimut: z.number().gt(0).lte(360),
  slantAngle: z.number().gt(0).lte(90),
});

const rowKeys: (keyof ModuleField)[] = [
  'name',
  'orientation',
  'inclination',
  'site',
  'specific_yield',
];

const rowPrefix: Partial<Record<keyof ModuleField, string>> = {
  orientation: '°',
  inclination: '°',
  specific_yield: ' kWh/kWp',
};

export type ModuleFieldsContentProps = {
  projectId: number;
};

export function ModuleFieldsContent({ projectId }: ModuleFieldsContentProps) {
  const intl = useIntl();

  const [currentModuleId, setCurrentModuleId] = useState<number | null>(null);

  const {
    moduleFieldsQuery,
    createModuleFieldsMutation,
    deleteModuleFieldsMutation,
  } = useModuleFields(projectId);

  const createDialog = useDisclosure();
  const actionsDialog = useDisclosure();
  const deletionDialog = useDisclosure();

  const columnNames = [
    intl.formatMessage({ defaultMessage: 'Name' }),
    intl.formatMessage({ defaultMessage: 'Azimut angle' }),
    intl.formatMessage({ defaultMessage: 'Inclination' }),
    intl.formatMessage({ defaultMessage: 'Modules#' }),
    intl.formatMessage({ defaultMessage: 'Specific Yield' }),
  ];

  const createSubmitHandler: ModuleFieldFormDialogProps<
    typeof validation
  >['onSubmit'] = async ({ specificYield, name, azimut, slantAngle }) => {
    try {
      await createModuleFieldsMutation.mutateAsync({
        site: projectId,
        specific_yield: Number(specificYield),
        name,
        orientation: Number(azimut),
        inclination: Number(slantAngle),
      });
      createDialog.onClose();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const confirmDeleteHandler = async () => {
    if (currentModuleId) {
      try {
        await deleteModuleFieldsMutation.mutateAsync(currentModuleId);
        deletionDialog.onClose();
        setCurrentModuleId(null);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const rowClickHandler = (moduleId: number) => () => {
    setCurrentModuleId(moduleId);
    actionsDialog.onOpen();
  };

  const handleActionCancel = () => {
    setCurrentModuleId(null);
    actionsDialog.onClose();
  };

  const handleDeleteCancel = () => {
    setCurrentModuleId(null);
    deletionDialog.onClose();
  };

  const handleActionDelete = () => {
    actionsDialog.onClose();
    deletionDialog.onOpen();
  };

  return (
    <>
      <LargeBox>
        <BoxHeader>
          <BoxTitle
            title={intl.formatMessage({ defaultMessage: 'Module Fields' })}
          />
          <Button className="ml-auto" onClick={createDialog.onOpen}>
            + {intl.formatMessage({ defaultMessage: 'Add module field' })}
          </Button>
        </BoxHeader>
        <BoxContent>
          <Table className="w-full">
            <Thead>
              <Tr>
                {columnNames.map(name => (
                  <Th key={name}>{name}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {moduleFieldsQuery.data?.map(module => (
                <Tr
                  className="cursor-pointer"
                  key={module.id}
                  onClick={rowClickHandler(module.id)}
                >
                  {rowKeys.map(key => (
                    <Td key={`${module.id}-${key}`}>
                      {module[key]}
                      {rowPrefix[key]}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </BoxContent>
      </LargeBox>
      <ModuleFieldFormDialog
        resolver={validation}
        open={createDialog.isOpen}
        onClose={createDialog.onClose}
        dialogTitle={intl.formatMessage({
          defaultMessage: 'Module field creation',
        })}
        submitButtonTitle={intl.formatMessage({
          defaultMessage: 'Create',
        })}
        onSubmit={createSubmitHandler}
      />
      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <>
          <Button variant="main-green">
            {intl.formatMessage({ defaultMessage: 'Modify properties' })}
          </Button>
          <Button variant="main-green">
            {intl.formatMessage({ defaultMessage: 'Modify strings' })}
          </Button>
          <Button variant="danger" onClick={handleActionDelete}>
            {intl.formatMessage({ defaultMessage: 'Delete' })}
          </Button>
          <Button variant="main-gray" onClick={handleActionCancel}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </>
      </ActionsDialog>
      <DeletionDialog
        isOpen={deletionDialog.isOpen}
        onClose={deletionDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'Are you sure to delete module field?',
        })}
        onCancel={handleDeleteCancel}
        onDelete={confirmDeleteHandler}
        isDeleting={deleteModuleFieldsMutation.isLoading}
      />
    </>
  );
}
