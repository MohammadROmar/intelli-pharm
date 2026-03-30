import { getPharmacyById } from '../api';
import type { PharmacyDetail } from '../model/pharmacyTypes';
import { useGetEntityById } from '@/shared/model';

export function useGetPharmacy() {
  return useGetEntityById<PharmacyDetail>({
    queryKey: 'pharmacies',
    fetchFn: getPharmacyById,
  });
}
