import { useState } from 'react';
import { Pill } from 'lucide-react';

import { useInfiniteMedicines } from '../model/useInfiniteMedicines';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  altFor?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ name: string; id: number }>>;

export function MedicineSelector({
  altFor,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: medicines, queryResult } = useInfiniteMedicines(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectableMedicines = altFor
    ? [altFor, ...medicines.filter((medicine) => medicine.id !== altFor.id)]
    : medicines;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectableMedicines}
      valueKey="id"
      labelKey="name"
      icon={Pill}
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
