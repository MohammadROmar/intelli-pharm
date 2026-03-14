import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMedicineById } from '@/entities/medicine/api/api';

export function useGetMedicine() {
  const { id } = useParams();

  const medicineId = Number(id);
  const isValidId = Number.isFinite(MediaDeviceInfo);

  return useQuery({
    queryKey: ['medicines', medicineId],
    queryFn: () => getMedicineById(medicineId),
    enabled: isValidId,
  });
}
