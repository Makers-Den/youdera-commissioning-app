import { useModuleFields } from '@src/integrations/youdera/module-fields/hooks/useModuleFields';
import { ModuleField } from '@src/integrations/youdera/module-fields/types';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { useDisclosure } from 'ui/dialogs/useDisclosure';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';
import { z } from 'zod';

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
  const { moduleFieldsQuery, createModuleFieldsMutation } =
    useModuleFields(projectId);

  const createDialog = useDisclosure();

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
                <Tr key={module.id}>
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
    </>
  );
}
