import {
  ApiFile,
  CreateStringRequestBody,
  Inverter,
  Module,
  String,
} from '@src/api/youdera/apiTypes';
import { getInverterDetails } from '@src/api/youdera/hooks/inverters/apiRequests';
import {
  useInverterMutations,
  useInvertersQuery,
} from '@src/api/youdera/hooks/inverters/hooks';
import { useModulesQuery } from '@src/api/youdera/hooks/modules/hooks';
import {
  useStringsMutations,
  useStringsQuery,
} from '@src/api/youdera/hooks/strings/hooks';
import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
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

  const [selectedString, setSelectedString] = useState<String>();
  const stringsOnRoofQuery = useStringsQuery(roofId);

  const {
    createStringMutation,
    deleteStringMutation,
    addFileToStringMutation,
    deleteFileFromStringMutation,
    updateStringMutation,
  } = useStringsMutations(roofId);

  const invertersQuery = useInvertersQuery(siteId);
  const inverters = invertersQuery.data as Inverter[];

  const { createInverterMutation } = useInverterMutations(siteId);
  const modulesQuery = useModulesQuery();
  const modules = modulesQuery.data as Module[];

  const moduleTypeFormData = useRef<ModuleTypeData | null>(null);

  const actionsDialog = useDisclosure();
  const deletionDialog = useDisclosure();
  const moduleTypeSelectionDialog = useDisclosure();
  const inverterSelectionDialog = useDisclosure();

  // * Handlers
  const handleRowClick = (string: String) => {
    setSelectedString(string);
    actionsDialog.onOpen();
  };
  const handleDeleteOpen = () => {
    actionsDialog.onClose();
    deletionDialog.onOpen();
  };
  const handleModuleTypeOpen = (isModified?: boolean) => {
    actionsDialog.onClose();
    if (!isModified) setSelectedString(undefined);
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
    if (!modifiedStringId || !selectedString) {
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
      if (selectedString.files[0]?.id !== (file as ApiFile).id) {
        await deleteFileFromStringMutation.mutateAsync({
          stringId: modifiedStringId,
          fileId: Number(selectedString.files[0]?.id),
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

        const inverterDetails = await getInverterDetails(inverter.id);

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
    if (selectedString?.id) {
      try {
        await deleteStringMutation.mutateAsync(selectedString.id);
        setSelectedString(undefined);
        deletionDialog.onClose();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };
  // *

  const stringModuleTypeDefaultValues: StringModuleTypeDialogProps<
    typeof stringModuleTypeValidation
  >['defaultValues'] = useMemo(() => {
    if (!selectedString || !modules) return undefined;

    const module = modules.filter(
      module => module.id === selectedString.module,
    )[0];
    const defaultModuleOption = {
      key: module.id.toString(),
      label: module.name,
      value: module,
    };

    const defaultCableCrossSectionOption = {
      key: selectedString.cable_cross_section.toString() as ModuleTypeData['cableCrossSection']['key'],
      label: `${selectedString.cable_cross_section} mm²`,
    };

    const defaultNumberOfModules = selectedString.count;
    return {
      moduleType: defaultModuleOption,
      cableCrossSection: defaultCableCrossSectionOption,
      numberOfModules: defaultNumberOfModules,
    };
  }, [modules, selectedString]);

  const stringInverterDefaultValues: InverterDefaultValuesProps | undefined =
    useMemo(() => {
      if (!inverters || !selectedString) return undefined;
      const defaultInverter = inverters.filter(
        inverter =>
          !!inverter.mpp_trackers.filter(
            input => input.id === selectedString.mpp_tracker.id,
          )[0],
      )[0];
      const defaultInput = selectedString.mpp_tracker;

      const defaultFile = selectedString.files[0];

      return {
        inverter: {
          key: defaultInverter.id.toString(),
          label: defaultInverter.name ?? ' - ',
          icon: 'Table',
        },
        input: {
          key: defaultInput.id.toString(),
          label: (
            defaultInverter.mpp_trackers.findIndex(
              input => input.id === defaultInput.id,
            ) + 1
          ).toString(),
          icon: 'Chip',
          dependentKey: defaultInverter.id.toString(),
        },
        file: defaultFile,
        manufacturer: undefined,
        model: undefined,
        newInput: undefined,
      };
    }, [inverters, selectedString]);
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
          <StringsList
            strings={stringsOnRoofQuery.data?.strings as String[]}
            roofId={roofId}
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
            modifiedStringId={selectedString?.id}
            open={moduleTypeSelectionDialog.isOpen}
            onClose={handleModuleTypeClose}
            onSubmit={stringModuleTypeSubmitHandler}
            resolver={stringModuleTypeValidation}
            defaultValues={stringModuleTypeDefaultValues}
          />
        </Suspense>
      )}
      {inverterSelectionDialog.isOpen && (
        <Suspense>
          <StringInverterDialog
            modifiedStringId={selectedString?.id}
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
