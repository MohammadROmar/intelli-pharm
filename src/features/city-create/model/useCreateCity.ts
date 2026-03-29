import { createCity, type City } from '@/entities/city';
import { useCreateEntity } from '@/shared/model';

export function useCreateCity() {
  return useCreateEntity<City>({
    queryKey: 'cities',
    mutationFn: createCity,
    translationKey: 'citiesPage.city',
  });
}
