import { useModuleFields } from '@src/integrations/youdera/module-fields/hooks/useModuleFields';
import { ModuleField } from '@src/integrations/youdera/module-fields/types';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';

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
  const { moduleFieldsQuery } = useModuleFields(projectId);

  const columnNames = [
    intl.formatMessage({ defaultMessage: 'Name' }),
    intl.formatMessage({ defaultMessage: 'Azimut angle' }),
    intl.formatMessage({ defaultMessage: 'Inclination' }),
    intl.formatMessage({ defaultMessage: 'Modules#' }),
    intl.formatMessage({ defaultMessage: 'Specific Yield' }),
  ];

  return (
    <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Module Fields' })}
        />
        <Button className="ml-auto">
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
    </Box>
  );
}
