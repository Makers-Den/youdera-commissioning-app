import { useGetModules } from '@src/integrations/youdera/modules/hooks/useGetModules';
import { Module } from '@src/integrations/youdera/modules/types';
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
    SelectOption | undefined
  >();

  const { modulesQuery } = useGetModules();

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

  const manufacturerOptions: SelectOption[] = useMemo(
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
          options={manufacturerOptions}
        />
      </BoxContent>
      <Divider className="my-5" />
      <BoxContent className="max-h-[500px] overflow-y-scroll">
        <MainModuleTypeList modules={modules} />
      </BoxContent>
    </LargeBox>
  );
}
