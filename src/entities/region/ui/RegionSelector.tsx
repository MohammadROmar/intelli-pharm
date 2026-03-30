import { useState } from 'react';
import { FolderTree } from 'lucide-react';

import { useInfiniteRegions } from '../model/useInfinteRegions';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  selected?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

export function RegionSelector({
  selected,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: regions, queryResult } = useInfiniteRegions(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectableRegions = selected
    ? [selected, ...regions.filter((region) => region.id !== selected.id)]
    : regions;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectableRegions}
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
