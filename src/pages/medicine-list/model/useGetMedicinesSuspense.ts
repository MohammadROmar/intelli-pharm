import { useMedicineFilters } from './useMedicineFilters';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import { useSuspenseGetEntities } from '@/shared/model';

export function useGetMedicinesSuspense() {
  const { filters } = useMedicineFilters();

  return useSuspenseGetEntities<MedicineResponse, Medicine>({
    queryKey: 'medicines',
    filters,
  });
}
