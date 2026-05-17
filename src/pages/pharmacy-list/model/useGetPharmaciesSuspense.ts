import type { PharmaciesResponse, Pharmacy } from '@/entities/pharmacy';
import { usePharmacyFilters } from './usePharmacyFilters';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetPharmaciesSuspense() {
  const { filters } = usePharmacyFilters();

  return useSuspenseGetEntities<PharmaciesResponse, Pharmacy>({
    queryKey: 'pharmacies',
    filters,
  });
}
