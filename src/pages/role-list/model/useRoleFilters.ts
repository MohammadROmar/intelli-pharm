import type { RoleFilters } from '@/entities/role';
import { parseFilters, useFilters } from '@/shared/lib';
import { useSearchParams } from 'react-router';

const FILTER_KEYS = ['name'] as const satisfies readonly (keyof RoleFilters)[];

export function useRoleFilters() {
  const [searchParams] = useSearchParams();
  const filters = parseFilters<RoleFilters>(searchParams);

  return useFilters<RoleFilters>({ filters, filterKeys: FILTER_KEYS });
}
