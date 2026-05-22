import { useCityFilters } from './useCityFilters';
import type { CitiesResponse, CityDetail } from '@/entities/city';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetCitiesSuspense() {
  const { filters } = useCityFilters();

  return useSuspenseGetEntities<CitiesResponse, CityDetail>({
    queryKey: 'cities',
    filters,
    withDualLanguage: true,
  });
}
