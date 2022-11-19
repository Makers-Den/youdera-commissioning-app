import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
import {
  ApiFile,
  CreateStringRequestBody,
  Inverter,
  String,
} from '@src/integrations/youdera/apiTypes';
import {
  useInverterDetailsQuery,
  useInverterMutations,
} from '@src/integrations/youdera/inverterApiHooks';
import { useInverters } from '@src/integrations/youdera/inverters/hooks/useInverters';
import { useStrings } from '@src/integrations/youdera/strings/hooks/useStrings';
import { useString } from '@src/integrations/youdera/stringsApiHooks';
import { Suspense, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { z } from 'zod';

import { ActionsDialog } from '../dialogs/ActionsDialog';
import { DeletionDialog } from '../dialogs/DeletionDialog';
import {
  InverterDefaultValuesProps,
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
    value: z.any(),
  }),
  numberOfModules: z.number().gte(0),
  cableCrossSection: z.object({
    key: z.literal('4').or(z.literal('6')).or(z.literal('10')),
    label: z.string(),
    value: z.any(),
  }),
});

type ModuleTypeData = z.infer<typeof stringModuleTypeValidation>;

const stringInverterValidation = z.object({
  inverter: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any(),
  }),
  input: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any(),
  }),
  file: z.any(),
});

const stringNewInverterValidation = z.object({
  model: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any(),
  }),
  newInput: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any(),
  }),
  file: z.any(),
});
export interface StringContentProps {
  roofId: number;
  siteId: number;
}

export function StringsContent({ roofId, siteId }: StringContentProps) {
  const intl = useIntl();
  useZodErrorMap();

  const [selectedId, setSelectedId] = useState<number>();

  const {
    stringsOnRoofQuery,
    createStringMutation,
    deleteStringMutation,
    addFileToStringMutation,
    deleteFileFromStringMutation,
  } = useStrings(roofId);

  const { stringDetailsQuery, updateStringMutation } = useString(
    selectedId ?? -1,
  );
  const stringDetails = stringDetailsQuery.data as String;

  const [inverterId, setInverterId] = useState<number>(-1);

  const { invertersQuery } = useInverters(siteId);
  const inverters = invertersQuery.data as Inverter[];
  const inverterDetailsQuery = useInverterDetailsQuery(inverterId);
  const inverterDetails = inverterDetailsQuery.data as Inverter;

  const { createInverterMutation } = useInverterMutations(siteId);

  const moduleTypeFormData = useRef<ModuleTypeData | null>(null);

  const actionsDialog = useDisclosure();
  const deletionDialog = useDisclosure();
  const moduleTypeSelectionDialog = useDisclosure();
  const inverterSelectionDialog = useDisclosure();

  // * Handlers
  const handleRowClick = (id: number) => {
    setSelectedId(id);
    actionsDialog.onOpen();
  };
  const handleDeleteOpen = () => {
    actionsDialog.onClose();
    deletionDialog.onOpen();
  };
  const handleModuleTypeOpen = (isModified?: boolean) => {
    actionsDialog.onClose();
    if (!isModified) setSelectedId(undefined);
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
  const stringRequest = async (
    modifiedStringId: number | undefined,
    file: ApiFile | File,
    stringRequestData: CreateStringRequestBody,
  ) => {
    if (!modifiedStringId) {
      const string = await createStringMutation.mutateAsync(stringRequestData);

      await addFileToStringMutation.mutateAsync({
        stringId: string.id,
        file: file as File,
      });
    } else {
      await updateStringMutation.mutateAsync({
        id: modifiedStringId,
        ...stringRequestData,
      });

      if (stringDetails.files[0]?.id !== (file as ApiFile).id) {
        await deleteFileFromStringMutation.mutateAsync({
          stringId: modifiedStringId,
          fileId: Number((file as ApiFile).id),
        });
        await addFileToStringMutation.mutateAsync({
          stringId: modifiedStringId.toString(),
          file: file as File,
        });
      }
    }
  };
  const stringExistingInverterSubmitHandler: StringInverterDialogProps<
    typeof stringInverterValidation,
    typeof stringNewInverterValidation
  >['onSubmit']['existingInverter'] = async (
    { input, file },
    resetForm,
    modifiedStringId,
  ) => {
      if (!stringsOnRoofQuery.data) return;
      try {
        const stringRequestData = {
          count: moduleTypeFormData.current!.numberOfModules,
          roof: stringsOnRoofQuery.data.id,
          module: moduleTypeFormData.current!.moduleType.key,
          cable_cross_section: Number(
            moduleTypeFormData.current!.cableCrossSection.key,
          ),
          mpp_tracker: Number(input.key),
        };

        await stringRequest(modifiedStringId, file, stringRequestData);

        resetForm();
        inverterSelectionDialog.onClose();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    };

  const stringNewInverterSubmitHandler: StringInverterDialogProps<
    typeof stringInverterValidation,
    typeof stringNewInverterValidation
  >['onSubmit']['newInverter'] = async (
    { newInput, model, file },
    resetForm,
    modifiedStringId,
  ) => {
      if (!stringsOnRoofQuery.data) return;
      try {
        const inverter = await createInverterMutation.mutateAsync({
          site: siteId,
          cmodel: model.value,
        });

        // ! Bug in this place -  setInverterId
        setInverterId(inverter.id);
        console.log(inverterId)

        const stringRequestData = {
          count: moduleTypeFormData.current!.numberOfModules,
          roof: stringsOnRoofQuery.data.id,
          module: moduleTypeFormData.current!.moduleType.key,
          cable_cross_section: Number(
            moduleTypeFormData.current!.cableCrossSection.key,
          ),
          mpp_tracker: Number(inverterDetails.mpp_trackers[newInput.value].id),
        };

        await stringRequest(modifiedStringId, file, stringRequestData);
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
  // *

  const stringInverterDefaultValues: InverterDefaultValuesProps | undefined =
    useMemo(() => {
      if (!inverters || !stringDetails) return undefined;

      const defaultInverter = inverters.filter(
        inverter =>
          !!inverter.mpp_trackers.filter(
            input => input.id === stringDetails.mpp_tracker.id,
          )[0],
      )[0];
      const defaultInput = stringDetails.mpp_tracker;

      const defaultFile = stringDetails.files[0];

      return {
        inverter: {
          key: defaultInverter.id.toString(),
          label: defaultInverter.name ?? ' - ',
          icon: 'Table',
        },
        input: {
          key: defaultInput.id.toString(),
          label: (defaultInverter.mpp_trackers.findIndex(input => input.id === defaultInput.id) + 1).toString(),
          icon: 'Chip',
        },
        file: defaultFile,
        manufacturer: {
          label: '',
          key: '',
        },
        model: {
          label: '',
          key: '',
        },
        newInput: {
          label: '',
          key: '',
        },
      };
    }, [inverters, stringDetails]);
  return (
    <>
      <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
        <BoxHeader>
          <BoxTitle title={intl.formatMessage({ defaultMessage: 'Strings' })} />
          <Button
            className="ml-auto w-[200px]"
            onClick={() => handleModuleTypeOpen()}
          >
            + {intl.formatMessage({ defaultMessage: 'Add string' })}
          </Button>
        </BoxHeader>
        <BoxContent>
          <Suspense>
            <StringsList roofId={roofId} onRowClick={handleRowClick} />
          </Suspense>
        </BoxContent>
      </Box>

      <ActionsDialog
        isOpen={actionsDialog.isOpen}
        onClose={actionsDialog.onClose}
        description={intl.formatMessage({
          defaultMessage: 'What you want to do with list element?',
        })}
      >
        <Button variant="main-green" onClick={() => handleModuleTypeOpen(true)}>
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
      {moduleTypeSelectionDialog.isOpen && (
        <Suspense>
          <StringModuleTypeDialog
            modifiedStringId={selectedId}
            open={moduleTypeSelectionDialog.isOpen}
            onClose={handleModuleTypeClose}
            onSubmit={stringModuleTypeSubmitHandler}
            resolver={stringModuleTypeValidation}
          />
        </Suspense>
      )}
      {inverterSelectionDialog.isOpen && (
        <Suspense>
          <StringInverterDialog
            modifiedStringId={selectedId}
            open={inverterSelectionDialog.isOpen}
            onClose={handleInverterClose}
            resolver={{
              existingInverter: stringInverterValidation,
              newInverter: stringNewInverterValidation,
            }}
            onSubmit={{
              existingInverter: stringExistingInverterSubmitHandler,
              newInverter: stringNewInverterSubmitHandler,
            }}
            siteId={siteId}
            defaultValues={stringInverterDefaultValues}
          />
        </Suspense>
      )}
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
