import { useState } from 'react';
import { User } from 'lucide-react';

import { useInfiniteOrders } from '../model/useInfiniteOrders';
import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

type Props = Partial<GenericSingleSelectProps<{ name: string; id: number }>>;
type Option = string | number | null;

export function OrderSelector({
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities, queryResult } = useInfiniteOrders(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  return (
    <GenericSingleSelect
      disabled={isFetching || isFetchingNextPage || isLoading}
      invalid={invalid}
      options={entities}
      valueKey="id"
      labelKey="id"
      icon={User}
      value={value}
      onValueChange={(v) => onValueChange!(v as Option)}
      onSearchChange={setSearchTerm}
      onLoadMore={fetchNextPage}
      hasNextPage={hasNextPage}
      isLoading={isFetching}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
