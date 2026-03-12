import { useMutation } from '@tanstack/react-query';

import { deleteLaboratory } from '@/entities/laboratory';

export function useDeleteLaboratory() {
  return useMutation({
    mutationFn: deleteLaboratory,
  });
}
