import { useTranslation } from 'react-i18next';

import { CategoriesTable } from './CategoryTable';
import { useGetCategories } from '../model/useGetCategories';
import { TableSkeleton, QueryError, PageTitle } from '@/shared/ui';

export default function CategoryListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.list',
  });

  const { data, isError, error, isLoading, refetch } = useGetCategories();

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CategoriesTable data={data.data!} />
    </>
  );
}
