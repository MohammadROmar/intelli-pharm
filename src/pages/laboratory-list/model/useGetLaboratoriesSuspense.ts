import { useSearchParams } from 'react-router-dom';

import type {
  LaboratoriesResponse,
  LaboratoryListItem,
} from '@/entities/laboratory';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetLaboratoriesSuspense() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return useSuspenseGetEntities<LaboratoriesResponse, LaboratoryListItem>({
    queryKey: 'laboratories',
    filters: { name },
  });
}
