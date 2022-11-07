import { StringsOnRoof } from '@src/integrations/youdera/strings/types';
import { useMainModuleStore } from '@src/stores/useMainModuleStore';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Button } from 'ui/buttons/Button';
import { Table, Tbody, Td, Th, Thead, Tr } from 'ui/table/Table';


export type StringListProps = {
  stringsOnRoof: StringsOnRoof;
  onOpen: (id: number) => void;
  onAddString: () => void;
};

export function StringsList({ stringsOnRoof, onOpen, onAddString }: StringListProps) {
  const intl = useIntl();
  const mainModule = useMainModuleStore(state => state.mainModule)
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
        <Button className="ml-auto w-[200px]" onClick={onAddString}>
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
            {stringsOnRoof?.strings.map(string => (
              <Tr
                key={string.id}
                className="cursor-pointer"
                onClick={() => onOpen(string.id)}
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
      </BoxContent>
    </Box>
  );
}
