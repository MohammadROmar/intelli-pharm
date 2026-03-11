import { useMutation } from '@tanstack/react-query';

import { deleteEmployee } from '@/entities/employee';

export function useDeleteEmployee() {
  return useMutation({
    mutationFn: deleteEmployee,
  });
}
