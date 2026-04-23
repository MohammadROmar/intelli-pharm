import { useTranslation } from 'react-i18next';

import { CategoryEditForm } from '@/features/category-edit';
import { useGetCategory } from '@/entities/category';
import {
  PageTitle,
  QueryError,
  FormSkeleton,
  QueryDisabled,
} from '@/shared/ui';

export default function CategoryEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.edit',
  });

  const { data, isError, error, isLoading, isEnabled, refetch } =
    useGetCategory();

  if (!isEnabled) {
    return <QueryDisabled isEdit path="/dashboard/categories" />;
  }

  if (isError) {
    return <QueryError error={error} onRetry={refetch} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton cards={[{ rows: 3 }]} />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CategoryEditForm category={data.data!} />
    </>
  );
}
