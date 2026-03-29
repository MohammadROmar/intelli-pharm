import { getMedicineById } from '../api';
import type { Medicine } from '../model/medicineTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetMedicine() {
  return useGetEntityById<Medicine>({
    queryKey: 'medicines',
    fetchFn: getMedicineById,
  });
}
