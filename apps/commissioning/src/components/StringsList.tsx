import { StringsOnRoof } from '@src/integrations/youdera/strings/types';
import { useMainModuleStore } from '@src/stores/useMainModuleStore';
import { useIntl } from 'react-intl';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';


export type StringListProps = {
  stringsOnRoof: StringsOnRoof;
  onRowClick: (id: number) => void;
};

export function StringsList({ stringsOnRoof, onRowClick }: StringListProps) {
  const intl = useIntl();
  const mainModule = useMainModuleStore(state => state.mainModule)
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
        {stringsOnRoof?.strings.map(string => (
          <Tr
            key={string.id}
            className="cursor-pointer"
            onClick={() => onRowClick(string.id)}
          >
            <Td key={`${string.id}-name`}>
              {string.name ?? ' - '}
            </Td>
            <Td key={`${string.id}-moduleType`}>
              {mainModule && mainModule.name}
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
  );
}
