import type { RegionDetail } from './regionTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetRegion() {
  return useGetEntityById<RegionDetail>({
    queryKey: 'regions',
    endpoint: '/erp/v1/regions',
    withDualLanguage: true,
  });
}
