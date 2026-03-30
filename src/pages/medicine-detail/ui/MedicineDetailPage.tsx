import { MedicineDetail } from './MedicineDetail';
import { useGetMedicine } from '@/entities/medicine';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function MedicineDetailPage() {
  const { isLoading, data, isError, error } = useGetMedicine();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={3} hasImage />;
  }

  return <MedicineDetail medicine={data.data!} />;
}
