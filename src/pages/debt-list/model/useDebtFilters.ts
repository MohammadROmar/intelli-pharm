import { useSearchParams } from 'react-router';

import type { DebtFilters } from '@/entities/debt';
import { isDebtStatus } from '@/entities/debt';
import { parseFilters, useFilters } from '@/shared/lib';

const FILTER_KEYS = [
  'status',
  'pharmacy_name',
] as const satisfies readonly (keyof DebtFilters)[];

export function useDebtFilters() {
  const [searchParams] = useSearchParams();
  const parsedFilters = parseFilters<DebtFilters>(searchParams);
  const pharmacyName = parsedFilters.pharmacy_name?.trim();
  const filters: DebtFilters = {
    status: isDebtStatus(parsedFilters.status)
      ? parsedFilters.status
      : undefined,
    pharmacy_name: pharmacyName || undefined,
  };

  return useFilters<DebtFilters>({
    filters,
    filterKeys: FILTER_KEYS,
  });
}
