import { useSearchParams } from 'react-router-dom';

import type { EmployeeFilters } from '@/entities/employee';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof EmployeeFilters)[] = ['name', 'email'];

export function useEmployeeFilters() {
  const [searchParams] = useSearchParams();

  const filters: EmployeeFilters = {
    name: searchParams.get('name') ?? undefined,
    email: searchParams.get('email') ?? undefined,
  };

  return useFilters<EmployeeFilters>({ filters, filterKeys: FILTER_KEYS });
}
