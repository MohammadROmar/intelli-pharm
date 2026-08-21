import { useCallback, useMemo, useState } from 'react';
import { Cross } from 'lucide-react';

import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

import { PharmacyOptionRow } from './PharmacyOptionRow';
import type { PharmacyOption } from '../model/pharmacyTypes';
import { useDebouncedPharmacySearch } from '../model/useDebouncedPharmacySearch';
import { useInfinitePharmacies } from '../model/useInfinitePharmacies';

type OptionValue = string | number | null;

type Props = {
  defaultValue?: PharmacyOption;
  onOptionChange?: (pharmacy: PharmacyOption | null) => void;
} & Partial<GenericSingleSelectProps<PharmacyOption>>;

export function PharmacySelector({
  value,
  onValueChange,
  invalid,
  isLoading,
  placeholder,
  defaultValue,
  onOptionChange,
}: Props) {
  const [searchInput, setSearchInput] = useState('');
  const searchTerm = useDebouncedPharmacySearch(searchInput);

  const { entities: pharmacies, queryResult } =
    useInfinitePharmacies(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const options = useMemo<PharmacyOption[]>(() => {
    const items = pharmacies.map(({ id, name, region, pharmacist_name }) => ({
      id,
      name,
      region,
      pharmacist_name,
    }));

    if (!defaultValue) return items;

    return [
      defaultValue,
      ...items.filter((pharmacy) => pharmacy.id !== defaultValue.id),
    ];
  }, [defaultValue, pharmacies]);

  const handleValueChange = useCallback(
    (nextValue: OptionValue) => {
      onValueChange?.(nextValue);

      const selected =
        options.find((pharmacy) => pharmacy.id === Number(nextValue)) ?? null;
      onOptionChange?.(selected);
    },
    [onOptionChange, onValueChange, options],
  );

  const renderOption = useCallback(
    (pharmacy: PharmacyOption, { isSelected }: { isSelected: boolean }) => (
      <PharmacyOptionRow pharmacy={pharmacy} selected={isSelected} />
    ),
    [],
  );

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={options}
      valueKey="id"
      labelKey="name"
      icon={Cross}
      value={value}
      onValueChange={handleValueChange}
      onSearchChange={setSearchInput}
      onLoadMore={fetchNextPage}
      placeholder={placeholder}
      hasNextPage={hasNextPage}
      isLoading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
      renderOption={renderOption}
    />
  );
}
