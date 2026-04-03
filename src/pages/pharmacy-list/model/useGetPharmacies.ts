import { usePharmacyFilters } from './usePharmacyFilters';
import type { PharmaciesResponse, PharmacyDetail } from '@/entities/pharmacy';
import { useGetEntities } from '@/shared/model';

export function useGetPharmacies() {
  const { filters } = usePharmacyFilters();

  return useGetEntities<PharmaciesResponse, PharmacyDetail>({
    queryKey: 'pharmacies',
    filters,
  });
}
