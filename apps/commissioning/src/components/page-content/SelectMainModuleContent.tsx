import { Module } from '@src/api/youdera/apiTypes';
import { useModulesQuery } from '@src/api/youdera/hooks/modules/hooks';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { BoxContent, BoxHeader, BoxTitle } from 'ui/box/Box';
import { Divider } from 'ui/divider/Divider';
import { Input, InputProps } from 'ui/inputs/Input';
import { Select, SelectOption } from 'ui/select/Select';

import { LargeBox } from '../LargeBox';
import { MainModule, MainModuleTypeList } from '../MainModuleTypeList';

export type SelectMainModuleContentProps = {
  onModuleClick: (module: Module) => void;
};

export function SelectMainModuleContent({
  onModuleClick,
}: SelectMainModuleContentProps) {
  const intl = useIntl();
  const [searchInput, setSearchInput] = useState('');
  const [selectedManufacturer, setSelectedManufacturer] = useState<
    { key: string; label: string } | undefined
  >();

  const modulesQuery = useModulesQuery();

  const modules: MainModule[] = useMemo(
    () =>
      (modulesQuery.data || [])
        ?.filter(({ name, manufacturer_name, manufacturer_id }) => {
          const lowerCaseSearch = searchInput.toLowerCase();
          const isManufacturer = selectedManufacturer
            ? manufacturer_id === Number(selectedManufacturer.key)
            : true;
          return (
            isManufacturer &&
            (name.toLowerCase().includes(lowerCaseSearch) ||
              manufacturer_name.includes(lowerCaseSearch))
          );
        })
        .map(({ name, id, manufacturer_name, data }) => {
          const { wattpeak } = data;
          return {
            id,
            name,
            manufacturerName: manufacturer_name,
            wattpeak,
            onClick: () => {
              const module = modulesQuery.data?.find(val => val.id === id);
              if (module) {
                onModuleClick(module);
              }
            },
          };
        }),
    [modulesQuery.data, searchInput, selectedManufacturer, onModuleClick],
  );

  const manufacturerOptions = useMemo(
    () =>
      (modulesQuery.data || [])
        .map(({ manufacturer_id, manufacturer_name }) => ({
          key: `${manufacturer_id}`,
          label: manufacturer_name,
        }))
        .filter(
          ({ key }, index, array) =>
            array.findIndex(val => val.key === key) === index,
        ),
    [modulesQuery.data],
  );

  const searchInputChangeHandler: InputProps['onChange'] = e => {
    setSearchInput(e.target.value);
  };

  return (
    <LargeBox>
      <BoxHeader>
        <BoxTitle
          title={intl.formatMessage({
            defaultMessage: 'Select main module type',
          })}
        />
      </BoxHeader>
      <BoxContent className="flex items-center gap-5">
        <Input
          className="flex-1"
          onChange={searchInputChangeHandler}
          value={searchInput}
          placeholder={intl.formatMessage({ defaultMessage: 'Search' })}
          icon="MagnifyingGlass"
        />
        <Select
          wrapperClassName="flex-1"
          placeholder={intl.formatMessage({ defaultMessage: 'Manufacturer' })}
          onChange={setSelectedManufacturer}
          value={selectedManufacturer}
        >
          {manufacturerOptions.map(value => (
            <SelectOption value={value}>{() => value.label}</SelectOption>
          ))}
        </Select>
      </BoxContent>
      <Divider className="my-5" />
      <BoxContent>
        <MainModuleTypeList modules={modules} />
      </BoxContent>
    </LargeBox>
  );
}
