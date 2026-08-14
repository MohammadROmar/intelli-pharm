import { useState } from 'react';
import { Shield } from 'lucide-react';

import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

import { useInfiniteRoles } from '../model/useInfiniteRoles';

type Props = {
  defaultValue?: { id: number; commercial_name: string };
} & Partial<GenericSingleSelectProps<{ id: number; name: string }>>;

type Option = string | number | null;

export function RoleSelector({
  value,
  onValueChange,
  invalid,
  isLoading,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities: roles, queryResult } = useInfiniteRoles(searchTerm);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  return (
    <GenericSingleSelect
      disabled={isFetching || isLoading}
      invalid={invalid}
      options={roles}
      valueKey="name"
      labelKey="name"
      icon={Shield}
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
