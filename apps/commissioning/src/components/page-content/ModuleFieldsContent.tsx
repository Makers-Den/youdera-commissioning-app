import { ModuleField } from '@src/api/youdera/apiTypes';
import {
  useModuleFieldsMutations,
  useModuleFieldsQuery,
} from '@src/api/youdera/hooks/module-fields/hooks';
import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
import { routes } from '@src/utils/routes';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { Toast, useToast } from 'ui/toast/Toast';
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
  projectId: string;
};

export function ModuleFieldsContent({ projectId }: ModuleFieldsContentProps) {
  const intl = useIntl();
  const router = useRouter();
  useZodErrorMap();

  const toast = useToast();

  const currentModule = useRef<ModuleField | null>(null);

  const moduleFieldsQuery = useModuleFieldsQuery(projectId);

  const {
    createModuleFieldsMutation,
    deleteModuleFieldsMutation,
    updateModuleFieldsMutation,
  } = useModuleFieldsMutations(projectId);

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

  const setCurrentModule = (module: ModuleField | null) => {
    currentModule.current = module;
  };

  const createSubmitHandler: ModuleFieldFormDialogProps<
    typeof createModuleValidation
  >['onSubmit'] = async (
    { specificYield, name, azimut, slantAngle },
    resetForm,
  ) => {
    try {
      const moduleField = await createModuleFieldsMutation.mutateAsync({
        specific_yield: specificYield,
        name,
        orientation: azimut,
        inclination: slantAngle,
      });
      toast.success(
        intl.formatMessage({
          defaultMessage: 'Module field added successfully!',
        }),
      );
      createDialog.onClose();
      resetForm();
      router.push(
        routes.roofer.moduleFieldStrings(
          Number(projectId),
          Number(moduleField.id),
        ),
      );
    } catch (err) {
      //@ts-ignore
      toast.error(err.message);
    }
  };

  const updateSubmitHandler: ModuleFieldFormDialogProps<
    typeof updateModuleValidation
  >['onSubmit'] = async (
    { name, slantAngle, specificYield, azimut },
    resetForm,
  ) => {
    if (currentModule.current) {
      try {
        await updateModuleFieldsMutation.mutateAsync({
          id: currentModule.current.id,
          specific_yield: specificYield,
          name,
          orientation: azimut,
          inclination: slantAngle,
        });
        toast.success(
          intl.formatMessage({
            defaultMessage: 'Module field updated successfully!',
          }),
        );
        updateDialog.onClose();
        setCurrentModule(null);
        resetForm();
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const confirmDeleteHandler = async () => {
    if (currentModule.current) {
      try {
        await deleteModuleFieldsMutation.mutateAsync(currentModule.current.id);
        toast.success(
          intl.formatMessage({
            defaultMessage: 'Module field deleted successfully!',
          }),
        );
        deletionDialog.onClose();
        setCurrentModule(null);
      } catch (err) {
        //@ts-ignore
        toast.error(err.message);
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  };

  const rowClickHandler = (module: ModuleField) => () => {
    setCurrentModule(module);
    actionsDialog.onOpen();
  };

  const handleActionCancel = () => {
    setCurrentModule(null);
    actionsDialog.onClose();
  };

  const handleDeleteCancel = () => {
    setCurrentModule(null);
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
    router.push(
      routes.roofer.moduleFieldStrings(
        Number(projectId),
        Number(currentModule.current?.id) || 0,
      ),
    );
  };

  const defaultValues = useMemo(() => {
    if (currentModule.current) {
      return {
        specificYield: currentModule.current.specific_yield,
        name: currentModule.current.name,
        azimut: currentModule.current.orientation,
        slantAngle: currentModule.current.inclination,
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModule.current?.id]);

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
                  onClick={rowClickHandler(module)}
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
        defaultValues={defaultValues}
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
      <Toast />
    </>
  );
}
