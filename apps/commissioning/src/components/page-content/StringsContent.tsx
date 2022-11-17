import { useZodErrorMap } from '@src/hooks/useZodErrorMap';
import { Inverter } from '@src/integrations/youdera/apiTypes';
import { useInverterDetailsQuery, useInverterMutations } from '@src/integrations/youdera/inverterApiHooks';
import { useStrings } from '@src/integrations/youdera/strings/hooks/useStrings';
import { Suspense, useRef, useState } from 'react';
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
    value: z.any()
  }),
  numberOfModules: z.number().gte(0),
  cableCrossSection: z.object({
    key: z.literal('4').or(z.literal('6')).or(z.literal('10')),
    label: z.string(),
    value: z.any()
  }),
});

type ModuleTypeData = z.infer<typeof stringModuleTypeValidation>;

const stringInverterValidation = z.object({
  inverter: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any()
  }),
  input: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any()
  }),
  file: z.any(),
});

const stringNewInverterValidation = z.object({
  model: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any()
  }),
  newInput: z.object({
    key: z.string(),
    label: z.string(),
    value: z.any()
  }),
  file: z.any(),
});

// const updateModuleTypeValidation = z.object({
//   moduleType: z.string().or(z.literal('')),
//   numberOfModules: z.number().gt(0).or(z.literal(undefined)),
//   cableCrossSection: z.number().gt(0).or(z.literal(undefined))
// });

export interface StringContentProps {
  roofId: number;
  siteId: number;
}

export function StringsContent({ roofId, siteId }: StringContentProps) {
  const intl = useIntl();
  useZodErrorMap();

  const {
    stringsOnRoofQuery,
    createStringMutation,
    deleteStringMutation,
    addFileToStringMutation,
  } = useStrings(roofId);

  const [inverterId, setInverterId] = useState<number>(0)
  const inverterDetailsQuery = useInverterDetailsQuery(inverterId)
  const inverterDetails = inverterDetailsQuery.data as Inverter

  const { createInverterMutation } = useInverterMutations(siteId);

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

  const stringExistingInverterSubmitHandler: StringInverterDialogProps<
    typeof stringInverterValidation,
    typeof stringNewInverterValidation
  >['onSubmit']['existingInverter'] = async ({ input, file }, resetForm) => {
    if (!stringsOnRoofQuery.data) return;
    try {
      const string = await createStringMutation.mutateAsync({
        count: moduleTypeFormData.current!.numberOfModules,
        roof: stringsOnRoofQuery.data.id,
        module: moduleTypeFormData.current!.moduleType.key,
        cable_cross_section: Number(moduleTypeFormData.current!.cableCrossSection.key), // ? Change keys in selects to be a number by default?
        mpp_tracker: Number(input.key),
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

  //TODO: Use this function inside of StringInverterDialog
  const stringNewInverterSubmitHandler: StringInverterDialogProps<
    typeof stringInverterValidation,
    typeof stringNewInverterValidation
  >['onSubmit']['newInverter'] = async ({ newInput, model, file }, resetForm) => {
    if (!stringsOnRoofQuery.data) return;
    try {
      const inverter = await createInverterMutation.mutateAsync({
        site: siteId,
        cmodel: model.value
      })

      setInverterId(inverter.id)

      const string = await createStringMutation.mutateAsync({
        count: moduleTypeFormData.current!.numberOfModules,
        roof: stringsOnRoofQuery.data.id,
        module: moduleTypeFormData.current!.moduleType.key,
        cable_cross_section: Number(moduleTypeFormData.current!.cableCrossSection.key),
        mpp_tracker: Number(inverterDetails.mpp_trackers[newInput.value].id),
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
      {moduleTypeSelectionDialog.isOpen && (
        <Suspense>
          <StringModuleTypeDialog
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
            open={inverterSelectionDialog.isOpen}
            onClose={handleInverterClose}
            resolver={{ existingInverter: stringInverterValidation, newInverter: stringNewInverterValidation }}
            onSubmit={{ existingInverter: stringExistingInverterSubmitHandler, newInverter: stringNewInverterSubmitHandler }}
            siteId={siteId}
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
