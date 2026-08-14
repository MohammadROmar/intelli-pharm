import { editPharmacy, type PharmacyDetail } from '@/entities/pharmacy';
import { useEditEntity } from '@/shared/model';

export function useEditPharmacy(id: number) {
  return useEditEntity<PharmacyDetail>({
    queryKey: 'pharmacies',
    mutationFn: (pharmacy) => editPharmacy({ id, pharmacy }),
    translationKey: 'pharmacy',
    redirectTo: `/dashboard/pharmacies/${id}`,
  });
}
