import { usePharmacyFilters } from './usePharmacyFilters';
import type { PharmaciesResponse, Pharmacy } from '@/entities/pharmacy';
import { useGetEntities } from '@/shared/model';

export function useGetPharmacies() {
  const { filters } = usePharmacyFilters();

  return useGetEntities<PharmaciesResponse, Pharmacy>({
    queryKey: 'pharmacies',
    filters,
  });
}
