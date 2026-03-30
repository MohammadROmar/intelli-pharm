import { useGetCategory } from '@/entities/category';
import { DetailSkeleton, QueryError } from '@/shared/ui';
import { CategoryDetailHeader } from './CategoryDetailHeader';
import { CategoryMetaGrid } from './CategoryMetaGrid';
import { CategoryChildrenTable } from './CategoryChildrenTable';

export default function CategoryDetailPage() {
  const { data, isLoading, isError, error, refetch } = useGetCategory();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <DetailSkeleton cards={[{ rows: 4 }]} tables={1} />;
  }

  const category = data.data!;

  return (
    <div className="space-y-6">
      <CategoryDetailHeader category={category} />
      <CategoryMetaGrid category={category} />
      <CategoryChildrenTable category={category} />
    </div>
  );
}
