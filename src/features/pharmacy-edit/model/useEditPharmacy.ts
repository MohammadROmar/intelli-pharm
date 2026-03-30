import { editPharmacy, type Pharmacy } from '@/entities/pharmacy';
import { useEditEntity } from '@/shared/model';

export function useEditPharmacy(id: number) {
  return useEditEntity<Pharmacy>({
    queryKey: 'pharmacies',
    mutationFn: (pharmacy) => editPharmacy({ id, pharmacy }),
    translationKey: 'pharmaciesPage.pharmacy',
    redirectTo: `/dashboard/pharmacies/${id}`,
  });
}
