import { useSearchParams } from 'react-router';

import type { EmployeeFilters } from '@/entities/employee';
import { useFilters, parseFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof EmployeeFilters)[] = [
  'name',
  'email',
  'phone',
  'role',
];

export function useEmployeeFilters() {
  const [searchParams] = useSearchParams();

  const filters = parseFilters<EmployeeFilters>(searchParams);

  return useFilters<EmployeeFilters>({ filters, filterKeys: FILTER_KEYS });
}
