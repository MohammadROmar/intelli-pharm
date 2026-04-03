import { useSearchParams } from 'react-router-dom';

import { useGetEntities } from '@/shared/model';
import type {
  LaboratoriesResponse,
  LaboratoryListItem,
} from '@/entities/laboratory';

export function useGetLaboratories() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return useGetEntities<LaboratoriesResponse, LaboratoryListItem>({
    queryKey: 'laboratories',
    filters: { name },
  });
}
