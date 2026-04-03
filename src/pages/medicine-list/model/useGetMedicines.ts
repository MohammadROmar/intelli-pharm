import { useMedicineFilters } from './useMedicineFilters';
import type { Medicine, MedicineResponse } from '@/entities/medicine';
import { useGetEntities } from '@/shared/model';

export function useGetMedicines() {
  const { filters } = useMedicineFilters();

  return useGetEntities<MedicineResponse, Medicine>({
    queryKey: 'medicines',
    filters,
  });
}
