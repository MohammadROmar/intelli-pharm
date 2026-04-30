import { useState } from 'react';
import { Pill } from 'lucide-react';

import { useInfiniteMedicines } from '../model/useInfiniteMedicines';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  defaultValue?: { id: number; commercial_name: string };
} & Partial<GenericSingleSelectProps<{ commercial_name: string; id: number }>>;

export function MedicineSelector({
  defaultValue,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: medicines, queryResult } = useInfiniteMedicines(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectableMedicines = defaultValue
    ? [
        defaultValue,
        ...medicines.filter((medicine) => medicine.id !== defaultValue.id),
      ]
    : medicines;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectableMedicines}
      valueKey="id"
      labelKey="commercial_name"
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
