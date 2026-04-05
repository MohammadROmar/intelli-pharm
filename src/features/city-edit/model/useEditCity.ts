import { editCity, type City } from '@/entities/city';
import { useEditEntity } from '@/shared/model';

export function useEditCity() {
  return useEditEntity<{ id: number; name: City }>({
    queryKey: 'cities',
    mutationFn: editCity,
    translationKey: 'citiesPage.city',
    redirectTo: '/dashboard/cities',
  });
}
