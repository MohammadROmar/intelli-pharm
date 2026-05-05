import type { MedicineDetail } from './medicineTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetMedicine() {
  return useGetEntityById<MedicineDetail>({
    queryKey: 'medicines',
    endpoint: '/erp/v1/medicines',
    withDualLanguage: true,
  });
}
