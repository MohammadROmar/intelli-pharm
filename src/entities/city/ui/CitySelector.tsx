import { useState } from 'react';
import { Pipette } from 'lucide-react';

import { useInfiniteCities } from '../model/useInfiniteCities';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = {
  selected?: { id: number; name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

export function CitySelector({
  selected,
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { cities, queryResult } = useInfiniteCities(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  const selectableCities = selected
    ? [selected, ...cities.filter((city) => city.id !== selected.id)]
    : cities;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={selectableCities}
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
