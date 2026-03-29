import { editLaboratory } from '@/entities/laboratory';
import { useEditEntity } from '@/shared/model';

export function useEditLaboratory() {
  return useEditEntity<{ id: number; name: string }>({
    queryKey: 'laboratories',
    mutationFn: editLaboratory,
    translationKey: 'laboratoriesPage.laboratory',
    redirectTo: '/dashboard/laboratories',
  });
}
