import { getCityById, type CityDetail } from '@/entities/city';
import { useGetEntityById } from '@/shared/model';

export function useGetCity() {
  return useGetEntityById<CityDetail>({
    queryKey: 'cities',
    fetchFn: getCityById,
  });
}
