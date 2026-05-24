import type { Pharmacy } from './pharmacyTypes';
import { getInfinitePharmacies } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfinitePharmacies(
  searchTerm: string,
  params?: Record<string, unknown>,
) {
  return useInfiniteEntities<Pharmacy>({
    queryKey: 'pharmacies',
    searchTerm,
    params,
    queryFn: getInfinitePharmacies,
  });
}
