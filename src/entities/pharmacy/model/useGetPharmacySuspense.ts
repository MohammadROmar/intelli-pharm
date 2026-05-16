import type { PharmacyDetail } from '../model/pharmacyTypes';
import { useSuspenseGetEntityById } from '@/shared/model';

export function useGetPharmacySuspense(id: number) {
  return useSuspenseGetEntityById<PharmacyDetail>({
    id,
    queryKey: 'pharmacies',
    endpoint: '/erp/v1/pharmacies',
    withDualLanguage: true,
  });
}
