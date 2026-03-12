import { useQuery } from '@tanstack/react-query';

import { getLaboratories } from '@/entities/laboratory';

export function useGetLaboratories() {
  return useQuery({ queryKey: ['laboratories'], queryFn: getLaboratories });
}
