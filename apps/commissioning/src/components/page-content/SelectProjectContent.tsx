import { useGetUncommissionedSites } from '@src/integrations/youdera/sites/hooks/useGetUncommissionedSites';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Box, BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Divider } from 'ui/divider/Divider';
import { Input, InputProps } from 'ui/inputs/Input';

import { ProjectList } from '../ProjectList';

export type SelectProjectContentProps = {
  projectPathCreator: (id: number) => string;
};

export function SelectProjectContent({
  projectPathCreator,
}: SelectProjectContentProps) {
  const intl = useIntl();
  const [searchInput, setSearchInput] = useState('');

  const { uncommissionedSitesQuery } = useGetUncommissionedSites();

  const projects = useMemo(
    () =>
      (uncommissionedSitesQuery.data || [])
        ?.filter(({ name, address }) => {
          const lowerCaseSearch = searchInput.toLowerCase();
          return (
            name.toLowerCase().includes(lowerCaseSearch) ||
            address.street.includes(lowerCaseSearch)
          );
        })
        .map(({ name, id, address }) => {
          const { street } = address;
          return { id, name, street, href: projectPathCreator(id) };
        }),
    [uncommissionedSitesQuery.data, searchInput, projectPathCreator],
  );

  const searchInputChangeHandler: InputProps['onChange'] = e => {
    setSearchInput(e.target.value);
  };

  return (
    <Box className="mx-3 mb-auto w-full md:mx-auto md:w-0 md:min-w-[700px]">
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({ defaultMessage: 'Select project' })}
        />
      </BoxHeader>
      <BoxContent>
        <Input
          className="w-full"
          onChange={searchInputChangeHandler}
          value={searchInput}
          placeholder={intl.formatMessage({ defaultMessage: 'Search' })}
          icon="MagnifyingGlass"
        />
      </BoxContent>
      <Divider className="my-5" />
      <BoxContent className="max-h-[500px] overflow-y-scroll">
        <ProjectList projects={projects} />
      </BoxContent>
    </Box>
  );
}
