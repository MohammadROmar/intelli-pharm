import type { RegionDetail } from './regionTypes';
import { getRegionById } from '../api';
import { useGetEntityById } from '@/shared/model';

export function useGetRegion() {
  return useGetEntityById<RegionDetail>({
    queryKey: 'regions',
    fetchFn: getRegionById,
  });
}
