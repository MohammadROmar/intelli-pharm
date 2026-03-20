import { useState } from 'react';
import { Pill } from 'lucide-react';

import { useInfiniteMedicines } from '../model/useInfiniteMedicines';
import type { Medicine } from '../model/medicineTypes';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

export function MedicineSelector({
  value,
  onValueChange,
  invalid,
  isLoading,
}: Partial<GenericSingleSelectProps<Medicine>>) {
  const [searchTerm, setSearchTerm] = useState('');

  const { medicines, queryResult } = useInfiniteMedicines(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={medicines}
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
