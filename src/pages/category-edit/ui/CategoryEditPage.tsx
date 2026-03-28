import { useTranslation } from 'react-i18next';

import { CategoryEditForm } from '@/features/category-edit';
import { useGetCategory } from '@/entities/category';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormSkeleton,
  PageTitle,
  QueryError,
} from '@/shared/ui';

export default function CategoryEditPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.edit',
  });

  const { data, isError, error, isLoading } = useGetCategory();

  if (isError) {
    return <QueryError error={error} />;
  }

  if (isLoading || !data) {
    return <FormSkeleton fields={2} />;
  }

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('formTitle')}</CardTitle>
          <CardDescription>{t('formSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryEditForm category={data.data!} />
        </CardContent>
      </Card>
    </>
  );
}
