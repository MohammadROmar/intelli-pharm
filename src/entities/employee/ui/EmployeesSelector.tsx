import { useState } from 'react';
import { User } from 'lucide-react';

import {
  GenericSingleSelect,
  type GenericSingleSelectProps,
} from '@/shared/ui';

import type { EmployeeRole } from '../model/employeeTypes';
import { useInfiniteEmployees } from '../model/useInfiniteEmployees';

type EmployeeOption = { id: number; name: string };
type Props = Partial<GenericSingleSelectProps<EmployeeOption>> & {
  role?: EmployeeRole;
};

type Option = string | number | null;

export function EmployeeSelector({
  value,
  onValueChange,
  invalid,
  isLoading,
  role,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const { entities, queryResult } = useInfiniteEmployees({ searchTerm, role });
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    queryResult;

  return (
    <GenericSingleSelect
      disabled={isFetching || isFetchingNextPage || isLoading}
      invalid={invalid}
      options={entities}
      valueKey="id"
      labelKey="name"
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
