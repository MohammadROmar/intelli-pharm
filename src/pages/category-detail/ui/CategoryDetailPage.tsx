import { useParams } from 'react-router';

import { CategoryChildrenTable } from './CategoryChildrenTable';
import { CategoryDetailHeader } from './CategoryDetailHeader';
import { CategoryMetaGrid } from './CategoryMetaGrid';
import { useGetCategorySuspense } from '@/entities/category';
import { QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function CategoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  if (!id || Number.isNaN(categoryId)) {
    return <QueryDisabled path="/dashboard/categories" />;
  }

  return (
    <QueryErrorBoundary>
      <CategoryDetailContent categoryId={categoryId} />
    </QueryErrorBoundary>
  );
}

type CategoryDetailContentProps = { categoryId: number };

function CategoryDetailContent({ categoryId }: CategoryDetailContentProps) {
  const { data } = useGetCategorySuspense(categoryId);

  const category = data.data!;

  return (
    <div className="space-y-6">
      <CategoryDetailHeader category={category} />
      <CategoryMetaGrid category={category} />
      <CategoryChildrenTable category={category} />
    </div>
  );
}
