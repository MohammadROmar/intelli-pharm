import { useState } from 'react';
import { Cross } from 'lucide-react';

import { useInfinitePharmacies } from '../model/useInfinitePharmacies';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  selected?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

export function PharmacySelector({
  selected,
  value,
  onValueChange,
  invalid,
  isLoading,
  placeholder,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: pharmacies, queryResult } =
    useInfinitePharmacies(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectablePharmacies = selected
    ? [
        selected,
        ...pharmacies.filter((pharmacy) => pharmacy.id !== selected.id),
      ]
    : pharmacies;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectablePharmacies}
      valueKey="id"
      labelKey="name"
      icon={Cross}
      value={value}
      onValueChange={onValueChange!}
      onSearchChange={setSearchTerm}
      onLoadMore={fetchNextPage}
      placeholder={placeholder}
      hasNextPage={hasNextPage}
      isLoading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
