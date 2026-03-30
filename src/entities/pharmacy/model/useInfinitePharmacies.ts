import type { PharmacyDetail } from './pharmacyTypes';
import { getInfinitePharmacies } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfinitePharmacies(searchTerm: string) {
  return useInfiniteEntities<PharmacyDetail>({
    queryKey: 'pharmacies',
    searchTerm,
    queryFn: getInfinitePharmacies,
  });
}
