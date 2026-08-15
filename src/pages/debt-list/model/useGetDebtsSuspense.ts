import type { DebtListResponse } from '@/entities/debt';
import { useSuspenseGetResource } from '@/shared/model';

import { useDebtFilters } from './useDebtFilters';

export function useGetDebtsSuspense() {
  const { filters } = useDebtFilters();

  return useSuspenseGetResource<DebtListResponse>({
    queryKey: 'debts',
    params: filters,
  });
}
