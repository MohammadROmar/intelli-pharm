import { MedicineDetail } from './MedicineDetail';
import { MedicineDetailSkeleton } from './MedicineDetailSkeleton';
import { useGetMedicine } from '@/entities/medicine';
import { QueryError } from '@/shared/ui';

export default function MedicineDetailPage() {
  const { isLoading, data, isError, error } = useGetMedicine();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <MedicineDetailSkeleton />;
  }

  return <MedicineDetail medicine={data.data!} />;
}
