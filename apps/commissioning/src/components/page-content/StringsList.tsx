import { useStrings } from '@src/integrations/youdera/strings/hooks/useStrings';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';

export type StringListProps = {
  roofId: number;
};

export function StringsList({ roofId }: StringListProps) {
  const intl = useIntl();
  const { stringsOnRoofQuery } = useStrings(roofId);

  const columnNames = [
    intl.formatMessage({ defaultMessage: 'String name' }),
    intl.formatMessage({ defaultMessage: 'Module type' }),
    intl.formatMessage({ defaultMessage: 'Number of modules' }),
    intl.formatMessage({ defaultMessage: 'Cable cross section' }),
  ];

  return (
    <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Strings' })}
        />
        <Button className="ml-auto w-[200px]">
          + {intl.formatMessage({ defaultMessage: 'Add string' })}
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
            {stringsOnRoofQuery.data?.strings.map(string => (
              <Tr key={string.id}>
                <Td key={`${string.id}-name`}>
                  {string.name ?? ' - '}
                </Td>
                <Td key={`${string.id}-moduleType`}>
                  {stringsOnRoofQuery.data?.name ?? ' - '}
                </Td>
                <Td key={`${string.id}-count`}>
                  {string.count ?? ' - '}
                </Td>
                <Td key={`${string.id}-cableCrossSection`}>
                  -
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </BoxContent>
    </Box>
  );
}
