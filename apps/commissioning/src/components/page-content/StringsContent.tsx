import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
import { Inverter } from '@src/integrations/youdera/inverters/types';
import { InverterModel } from '@src/integrations/youdera/models/types';
import { useStrings } from '@src/integrations/youdera/strings/hooks/useStrings';
import { StringsOnRoof } from '@src/integrations/youdera/strings/types';
import { useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { z } from 'zod';

import { ActionsDialog } from '../dialogs/ActionsDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import {
  StringInverterDialog,
  StringInverterDialogProps,
} from '../forms/StringInverterDialog';
import {
  StringModuleTypeDialog,
  StringModuleTypeDialogProps,
} from '../forms/StringModuleTypeDialog';
import { StringsList } from '../StringsList';

const stringModuleTypeValidation = z.object({
  moduleType: z.object({
    key: z.string(),
    label: z.string(),
  }),
  numberOfModules: z.number().gte(0),
  cableCrossSection: z.literal(4).or(z.literal(6)).or(z.literal(10)),
});

type ModuleTypeData = z.infer<typeof stringModuleTypeValidation>;

const stringInverterValidation = z.object({
  inverter: z.object({
    key: z.string(),
    label: z.string(),
  }),
  input: z.object({
    key: z.string(),
    label: z.string(),
  }),
  file: z.any(),
});

// const updateModuleTypeValidation = z.object({
//   moduleType: z.string().or(z.literal('')),
//   numberOfModules: z.number().gt(0).or(z.literal(undefined)),
//   cableCrossSection: z.number().gt(0).or(z.literal(undefined))
// });

export interface StringContentProps {
  stringsOnRoof: StringsOnRoof;
  inverters: Inverter[];
  inverterModels: InverterModel[];
}

export function StringsContent({
  stringsOnRoof,
  inverters,
  inverterModels,
}: StringContentProps) {
  const intl = useIntl();
  useZodErrorMap();
  const {
    createStringMutation,
    deleteStringMutation,
    addFileToStringMutation,
  } = useStrings(stringsOnRoof.id);
  const moduleTypeFormData = useRef<ModuleTypeData | null>(null);

  const [selectedId, setSelectedId] = useState<number>();
  const actionsDialog = useDisclosure();
  const deletionDialog = useDisclosure();
  const moduleTypeSelectionDialog = useDisclosure();
  const inverterSelectionDialog = useDisclosure();

  const handleRowClick = (id: number) => {
    setSelectedId(id);
    actionsDialog.onOpen();
  };
  const handleDeleteOpen = () => {
    actionsDialog.onClose();
    deletionDialog.onOpen();
  };
  const handleModuleTypeOpen = () => {
    actionsDialog.onClose();
    moduleTypeSelectionDialog.onOpen();
  };
  const handleModuleTypeClose = (resetForm: () => void) => {
    moduleTypeSelectionDialog.onClose();
    resetForm();
  };
  const handleInverterOpen = () => {
    actionsDialog.onClose();
    inverterSelectionDialog.onOpen();
  };
  const handleInverterClose = (resetForm: () => void) => {
    inverterSelectionDialog.onClose();
    resetForm();
  };

  const stringModuleTypeSubmitHandler: StringModuleTypeDialogProps<
    typeof stringModuleTypeValidation
  >['onSubmit'] = (
    { moduleType, numberOfModules, cableCrossSection },
    resetForm,
  ) => {
      moduleTypeFormData.current = {
        moduleType,
        numberOfModules,
        cableCrossSection,
      };
      moduleTypeSelectionDialog.onClose();
      resetForm();
      inverterSelectionDialog.onOpen();
    };

  const stringInverterSubmitHandler: StringInverterDialogProps<
    typeof stringInverterValidation
  >['onSubmit'] = async ({ input, inverter, file }, resetForm) =>
    // { inverter, input },
    // resetForm,

    {
      try {
        const string = await createStringMutation.mutateAsync({
          count: moduleTypeFormData.current!.numberOfModules,
          roof: stringsOnRoof.id,
          module: moduleTypeFormData.current!.moduleType.key,
          cable_cross_section: moduleTypeFormData.current!.cableCrossSection,
        });

        await addFileToStringMutation.mutateAsync({
          stringId: string.id,
          file,
        });

        resetForm();
        inverterSelectionDialog.onClose();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

  const confirmDeleteHandler = async () => {
    if (selectedId) {
      try {
        await deleteStringMutation.mutateAsync(selectedId);
        setSelectedId(undefined);
        deletionDialog.onClose();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  return (
    <>
      <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
        <BoxHeader>
          <BoxTitle title={intl.formatMessage({ defaultMessage: 'Strings' })} />
          <Button className="ml-auto w-[200px]" onClick={handleModuleTypeOpen}>
            + {intl.formatMessage({ defaultMessage: 'Add string' })}
          </Button>
        </BoxHeader>
        <BoxContent>
          <StringsList
            stringsOnRoof={stringsOnRoof}
            onRowClick={handleRowClick}
          />
        </BoxContent>
      </Box>

      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <Button variant="main-green" onClick={handleModuleTypeOpen}>
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

      <StringModuleTypeDialog
        open={moduleTypeSelectionDialog.isOpen}
        onClose={handleModuleTypeClose}
        onSubmit={stringModuleTypeSubmitHandler}
        resolver={stringModuleTypeValidation}
      />
      <StringInverterDialog
        open={inverterSelectionDialog.isOpen}
        onClose={handleInverterClose}
        resolver={stringInverterValidation}
        onSubmit={stringInverterSubmitHandler}
        inverters={inverters}
        inverterModels={inverterModels}
      />
      <DeletionDialog
        onDelete={confirmDeleteHandler}
        isOpen={deletionDialog.isOpen}
        onClose={deletionDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'Are you sure to delete module field?',
        })}
      />
    </>
  );
}