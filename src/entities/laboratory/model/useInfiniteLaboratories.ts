import type { LaboratoryListItem } from './laboratoryTypes';
import { getInfiniteLaboratories } from '../api';
import { useInfiniteEntities } from '@/shared/model';

export function useInfiniteLaboratories(searchTerm: string) {
  return useInfiniteEntities<LaboratoryListItem>({
    queryKey: 'laboratories',
    searchTerm,
    queryFn: getInfiniteLaboratories,
  });
}
