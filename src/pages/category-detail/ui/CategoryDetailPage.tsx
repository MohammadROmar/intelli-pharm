import { CategoryDetail } from './CategoryDetail';
import { useGetCategory } from '@/entities/category';
import { DetailSkeleton, QueryError } from '@/shared/ui';

export default function CategoryDetailPage() {
  const { data, isLoading, isError, error } = useGetCategory();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={1} />;
  }

  return <CategoryDetail category={data.data!} />;
}
