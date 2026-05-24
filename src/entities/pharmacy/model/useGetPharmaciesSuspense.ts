import { usePharmacyFilters } from './usePharmacyFilters';
import type { PharmaciesResponse, Pharmacy } from './pharmacyTypes';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetPharmaciesSuspense(params?: Record<string, unknown>) {
  const { filters } = usePharmacyFilters();

  return useSuspenseGetEntities<PharmaciesResponse, Pharmacy>({
    queryKey: 'pharmacies',
    filters: { ...filters, ...params },
  });
}
