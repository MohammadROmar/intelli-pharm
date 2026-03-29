import { editRegion, type Region } from '@/entities/region';
import { useEditEntity } from '@/shared/model';

export function useEditRegion(id: number) {
  return useEditEntity<Region>({
    queryKey: 'regions',
    mutationFn: (payload) => editRegion({ id, ...payload }),
    translationKey: 'regionsPage.region',
    redirectTo: `/dashboard/regions/${id}`,
  });
}
