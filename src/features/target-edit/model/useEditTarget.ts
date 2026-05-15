import { editTarget, type EditTargetDto } from '@/entities/target';
import { useEditEntity } from '@/shared/model';

export function useEditTarget(id: number) {
  return useEditEntity<EditTargetDto>({
    queryKey: 'targets',
    mutationFn: (payload) => editTarget(id, payload),
    translationKey: 'target',
  });
}
