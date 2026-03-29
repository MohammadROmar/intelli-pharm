import { createLaboratory, type Laboratory } from '@/entities/laboratory';
import { useCreateEntity } from '@/shared/model';

export function useCreateLaboratory() {
  return useCreateEntity<Laboratory>({
    queryKey: 'laboratories',
    mutationFn: createLaboratory,
    translationKey: 'laboratoriesPage.laboratory',
  });
}
