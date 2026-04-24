import { useSearchParams } from 'react-router-dom';

import type { EmployeeFilters } from '@/entities/employee';
import { useFilters } from '@/shared/lib';

const FILTER_KEYS: (keyof EmployeeFilters)[] = ['name', 'email', 'phone'];

export function useEmployeeFilters() {
  const [searchParams] = useSearchParams();

  const filters: EmployeeFilters = {
    name: searchParams.get('name') ?? undefined,
    email: searchParams.get('email') ?? undefined,
    phone: searchParams.get('phone') ?? undefined,
  };

  return useFilters<EmployeeFilters>({ filters, filterKeys: FILTER_KEYS });
}
