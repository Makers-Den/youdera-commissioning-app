import { useStrings } from '@src/integrations/youdera/strings/hooks/useStrings';
import { useIntl } from 'react-intl';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';


export type StringListProps = {
  roofId: number
  onRowClick: (id: number) => void;
};

export function StringsList({ roofId, onRowClick }: StringListProps) {
  const intl = useIntl();
  const {
    stringsOnRoofQuery,
  } = useStrings(roofId);
  const columnNames = [
    intl.formatMessage({ defaultMessage: 'String name' }),
    intl.formatMessage({ defaultMessage: 'Module type' }),
    intl.formatMessage({ defaultMessage: 'Number of modules' }),
    intl.formatMessage({ defaultMessage: 'Cable cross section' }),
  ];
  return (
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
          <Tr
            key={string.id}
            className="cursor-pointer"
            onClick={() => onRowClick(string.id)}
          >
            <Td key={`${string.id}-name`}>
              {string.name ?? ' - '}
            </Td>
            <Td key={`${string.id}-moduleType`}>
              {string.module ?? ' - '}
            </Td>
            <Td key={`${string.id}-count`}>
              {string.count ?? ' - '}
            </Td>
            <Td key={`${string.id}-cableCrossSection`}>
              {string.cable_cross_section ?? ' - '}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
