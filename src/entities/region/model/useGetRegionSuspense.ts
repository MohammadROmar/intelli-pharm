import type { RegionDetail } from './regionTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetRegionSuspense(id: number) {
  return useSuspenseGetEntityById<RegionDetail>({
    id,
    queryKey: 'regions',
    endpoint: '/erp/v1/regions',
    withDualLanguage: true,
  });
}
