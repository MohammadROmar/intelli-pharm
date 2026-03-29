import { editCity } from '@/entities/city';
import { useEditEntity } from '@/shared/model';

export function useEditCity() {
  return useEditEntity<{ id: number; name: string }>({
    queryKey: 'cities',
    mutationFn: editCity,
    translationKey: 'citiesPage.city',
    redirectTo: '/dashboard/cities',
  });
}
