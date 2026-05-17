import { useTranslation } from 'react-i18next';

import { CategoriesTable } from './CategoryTable';
import { useGetCategoriesSuspense } from '../model/useGetCategoriesSuspense';
import { PageTitle, QueryErrorBoundary } from '@/shared/ui';

export default function CategoryListPage() {
  return (
    <QueryErrorBoundary>
      <CategoryListContent />
    </QueryErrorBoundary>
  );
}

function CategoryListContent() {
  const { t } = useTranslation('categories', { keyPrefix: 'list' });
  const { data } = useGetCategoriesSuspense();

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CategoriesTable data={data!.data!} />
    </>
  );
}
