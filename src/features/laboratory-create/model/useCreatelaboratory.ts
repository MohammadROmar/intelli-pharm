import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLaboratory } from '@/entities/laboratory';

export function useCreateLaboratory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLaboratory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['laboratories'] });
    },
  });
}
