import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getMedicineById } from '@/entities/medicine';

export function useGetMedicine() {
  const { id } = useParams();

  const medicineId = Number(id);
  const isValidId = !isNaN(medicineId);

  return useQuery({
    queryKey: ['medicines', medicineId],
    queryFn: () => getMedicineById(medicineId),
    enabled: isValidId,
  });
}
