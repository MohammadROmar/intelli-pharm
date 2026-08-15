import { useSearchParams } from 'react-router';

import type { DebtListResponse } from '@/entities/debt';
import { useSuspenseGetResource } from '@/shared/model';

import { useDebtFilters } from './useDebtFilters';

export function useGetDebtsSuspense() {
  const [searchParams] = useSearchParams();
  const { filters } = useDebtFilters();
  const pageNumber = searchParams.get('page') ?? undefined;
  const perPage = searchParams.get('per_page') ?? undefined;

  return useSuspenseGetResource<DebtListResponse>({
    queryKey: 'debts',
    params: {
      ...filters,
      page_number: pageNumber,
      per_page: perPage,
    },
  });
}
