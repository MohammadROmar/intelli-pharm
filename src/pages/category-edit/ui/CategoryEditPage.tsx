import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { CategoryEditForm } from '@/features/category-edit';
import { useGetCategorySuspense } from '@/entities/category';
import { PageTitle, QueryErrorBoundary, QueryDisabled } from '@/shared/ui';

export default function CategoryEditPage() {
  const { id } = useParams<{ id: string }>();
  const categoryId = Number(id);

  if (!id || Number.isNaN(categoryId)) {
    return <QueryDisabled isEdit path="/dashboard/categories" />;
  }

  return (
    <QueryErrorBoundary>
      <CategoryEditPageContent categoryId={categoryId} />
    </QueryErrorBoundary>
  );
}

type CategoryEditPageContentProps = { categoryId: number };

function CategoryEditPageContent({ categoryId }: CategoryEditPageContentProps) {
  const { t } = useTranslation('categories', {
    keyPrefix: 'edit',
  });

  const { data } = useGetCategorySuspense(categoryId);

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CategoryEditForm category={data.data!} />
    </>
  );
}
