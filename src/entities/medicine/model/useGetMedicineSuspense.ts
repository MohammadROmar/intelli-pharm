import type { MedicineDetail } from './medicineTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetMedicineSuspense(id: number) {
  return useSuspenseGetEntityById<MedicineDetail>({
    id,
    queryKey: 'medicines',
    endpoint: '/erp/v1/medicines',
    withDualLanguage: true,
  });
}
