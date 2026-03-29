import {
  editMedicine,
  type ImageFile,
  type MedicineFormData,
} from '@/entities/medicine';
import { useEditEntity } from '@/shared/model';

export function useEditMedicine(id: number) {
  return useEditEntity<{ values: MedicineFormData; images: ImageFile[] }>({
    queryKey: 'medicines',
    mutationFn: (payload) => editMedicine(id, payload),
    translationKey: 'medicinesPage.medicine',
    redirectTo: `/dashboard/medicines/${id}`,
  });
}
