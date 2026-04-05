import { editLaboratory, type Laboratory } from '@/entities/laboratory';
import { useEditEntity } from '@/shared/model';

export function useEditLaboratory() {
  return useEditEntity<{ id: number; name: Laboratory }>({
    queryKey: 'laboratories',
    mutationFn: editLaboratory,
    translationKey: 'laboratoriesPage.laboratory',
    redirectTo: '/dashboard/laboratories',
  });
}
