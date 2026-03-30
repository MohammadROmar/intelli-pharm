import { useState } from 'react';
import { FolderTree } from 'lucide-react';

import { useInfinitePharmacies } from '../model/useInfinitePharmacies';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  parent?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

export function PharmacySelector({
  parent,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: pharmacies, queryResult } =
    useInfinitePharmacies(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectablePharmacies = parent
    ? [parent, ...pharmacies.filter((pharmacy) => pharmacy.id !== parent.id)]
    : pharmacies;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectablePharmacies}
      valueKey="id"
      labelKey="name"
      icon={FolderTree}
      value={value}
      onValueChange={onValueChange!}
      onSearchChange={setSearchTerm}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
