import { useSearchParams } from 'react-router-dom';

import type { CitiesResponse, CityDetail } from '@/entities/city';
import { useGetEntities } from '@/shared/model';

export function useGetCities() {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');

  return useGetEntities<CitiesResponse, CityDetail>({
    queryKey: 'cities',
    filters: { name },
  });
}
