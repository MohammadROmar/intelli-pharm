import {
  createMedicine,
  type ImageFile,
  type MedicineFormData,
} from '@/entities/medicine';
import { useCreateEntity } from '@/shared/model';

export function useCreateMedicine() {
  return useCreateEntity<{ values: MedicineFormData; images: ImageFile[] }>({
    queryKey: 'regions',
    mutationFn: createMedicine,
    translationKey: 'medicinesPage.medicine',
  });
}
