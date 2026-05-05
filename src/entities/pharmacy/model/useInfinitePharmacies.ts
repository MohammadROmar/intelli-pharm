import type { Pharmacy } from './pharmacyTypes';
import { getInfinitePharmacies } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfinitePharmacies(searchTerm: string) {
  return useInfiniteEntities<Pharmacy>({
    queryKey: 'pharmacies',
    searchTerm,
    queryFn: getInfinitePharmacies,
  });
}
