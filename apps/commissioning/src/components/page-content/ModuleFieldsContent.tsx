import { useModuleFields } from '@src/integrations/youdera/module-fields/hooks/useModuleFields';
import { ModuleField } from '@src/integrations/youdera/module-fields/types';
import { removeNullAndUndefinedFromObject } from '@src/utils/removeNullAndUndefinedFromObject';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { z } from 'zod';

import { ActionsDialog } from '../dialogs/ActionsDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import {
  ModuleFieldFormDialog,
  ModuleFieldFormDialogProps,
} from '../forms/ModuleFieldFormDialog';
import { LargeBox } from '../LargeBox';

const createModuleValidation = z.object({
  name: z.string().min(2),
  specificYield: z.number().gt(0),
  azimut: z.number().gt(0).lte(360),
  slantAngle: z.number().gt(0).lte(90),
});

const updateModuleValidation = z.object({
  name: z.string().min(2).optional().or(z.literal('')),
  specificYield: z.number().gt(0).or(z.literal(undefined)),
  azimut: z.number().gt(0).lte(360).or(z.literal(undefined)),
  slantAngle: z.number().gt(0).lte(90).or(z.literal(undefined)),
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
  const router = useRouter();

  const currentModuleId = useRef<number | null>(null);

  const {
    moduleFieldsQuery,
    createModuleFieldsMutation,
    deleteModuleFieldsMutation,
    updateModuleFieldsMutation,
  } = useModuleFields(projectId);

  const actionsDialog = useDisclosure();
  const createDialog = useDisclosure();
  const updateDialog = useDisclosure();
  const deletionDialog = useDisclosure();

  const columnNames = [
    intl.formatMessage({ defaultMessage: 'Name' }),
    intl.formatMessage({ defaultMessage: 'Azimut angle' }),
    intl.formatMessage({ defaultMessage: 'Inclination' }),
    intl.formatMessage({ defaultMessage: 'Modules#' }),
    intl.formatMessage({ defaultMessage: 'Specific Yield' }),
  ];

  const setCurrentModuleId = (id: number | null) => {
    currentModuleId.current = id;
  };

  const createSubmitHandler: ModuleFieldFormDialogProps<
    typeof createModuleValidation
  >['onSubmit'] = async (
    { specificYield, name, azimut, slantAngle },
    resetForm,
  ) => {
      try {
        await createModuleFieldsMutation.mutateAsync({
          site: projectId,
          specific_yield: specificYield,
          name,
          orientation: azimut,
          inclination: slantAngle,
        });
        createDialog.onClose();
        resetForm();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

  const updateSubmitHandler: ModuleFieldFormDialogProps<
    typeof updateModuleValidation
  >['onSubmit'] = async (
    { specificYield, name, azimut, slantAngle },
    resetForm,
  ) => {
      if (currentModuleId.current) {
        const values = removeNullAndUndefinedFromObject({
          specific_yield: specificYield,
          name: name || undefined,
          orientation: azimut,
          inclination: slantAngle,
        });

        try {
          await updateModuleFieldsMutation.mutateAsync({
            id: currentModuleId.current,
            ...values,
          });
          updateDialog.onClose();
          setCurrentModuleId(null);
          resetForm();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      }
    };

  const confirmDeleteHandler = async () => {
    if (currentModuleId.current) {
      try {
        await deleteModuleFieldsMutation.mutateAsync(currentModuleId.current);
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

  const handleActionUpdate = () => {
    actionsDialog.onClose();
    updateDialog.onOpen();
  };

  const handleActionUpdateStrings = () => {
    router.push(`/roofer/projects/${projectId}/module-fields/${currentModuleId.current}`);
  }

  return (
    <>
      <LargeBox>
        <BoxHeader>
          <BoxTitle
            title={intl.formatMessage({ defaultMessage: 'Module Fields' })}
          />
          <Button className="ml-auto w-[200px]" onClick={createDialog.onOpen}>
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
        resolver={createModuleValidation}
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
      <ModuleFieldFormDialog
        resolver={updateModuleValidation}
        open={updateDialog.isOpen}
        onClose={updateDialog.onClose}
        dialogTitle={intl.formatMessage({
          defaultMessage: 'Module field modify',
        })}
        submitButtonTitle={intl.formatMessage({
          defaultMessage: 'Save',
        })}
        onSubmit={updateSubmitHandler}
      />
      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <>
          <Button variant="main-green" onClick={handleActionUpdate}>
            {intl.formatMessage({ defaultMessage: 'Modify properties' })}
          </Button>
          <Button variant="main-green" onClick={handleActionUpdateStrings}>
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
