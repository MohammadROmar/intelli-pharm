import { useState } from 'react';
import { Cross } from 'lucide-react';

import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

import { PharmacyOptionRow } from './PharmacyOptionRow';
import type { Pharmacy } from '../model/pharmacyTypes';
import { useInfinitePharmacies } from '../model/useInfinitePharmacies';

type Props = {} & Partial<GenericSingleSelectProps<Pharmacy>>;

export function PharmacySelector({
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

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={pharmacies}
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
      renderOption={(pharmacy, { isSelected }) => (
        <PharmacyOptionRow pharmacy={pharmacy} selected={isSelected} />
      )}
    />
  );
}
