import type { Medicine } from './medicineTypes';
import { getInfiniteMedicines } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteMedicines(searchTerm: string) {
  return useInfiniteEntities<Medicine>({
    queryKey: 'medicines',
    searchTerm,
    queryFn: getInfiniteMedicines,
  });
}
