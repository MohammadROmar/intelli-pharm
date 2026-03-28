import { CategoryMetaGrid } from './CategoryMetaGrid';
import { CategoryDetailHeader } from './CategoryDetailHeader';
import { CategoryChildrenTable } from './CategoryChildrenTable';
import type { CategoryDetail } from '@/entities/category';

type Props = { category: CategoryDetail };

export function CategoryDetail({ category }: Props) {
  return (
    <div className="space-y-6">
      <CategoryDetailHeader category={category} />
      <CategoryMetaGrid category={category} />
      <CategoryChildrenTable category={category} />
    </div>
  );
}
