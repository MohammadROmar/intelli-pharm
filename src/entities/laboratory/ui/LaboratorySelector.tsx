import { useState } from 'react';
import { Pipette } from 'lucide-react';

import { useInfiniteLaboratories } from '../model/useInfiniteLaboratories';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  selected?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

export function LaboratorySelector({
  selected,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { laboratories, queryResult } = useInfiniteLaboratories(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectableLaboratories = selected
    ? [
        selected,
        ...laboratories.filter((laboratory) => laboratory.id !== selected.id),
      ]
    : laboratories;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectableLaboratories}
      valueKey="id"
      labelKey="name"
      icon={Pipette}
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
