import { LaboratoryDetail } from './LaboratoryDetail';
import { useGetLaboratory } from '@/entities/laboratory';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function LaboratoryDetailPage() {
  const { data, isLoading, isError, error } = useGetLaboratory();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 3 }]} tables={1} />;
  }

  return <LaboratoryDetail laboratory={data.data!} />;
}
