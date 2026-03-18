import { useTranslation } from 'react-i18next';

import { CategoryCreateForm } from '@/features/category-create';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageTitle,
} from '@/shared/ui';

export default function CategoryCreatePage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <Card>
        <CardHeader>
          <CardTitle>{t('formTitle')}</CardTitle>
          <CardDescription>{t('formSubtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryCreateForm />
        </CardContent>
      </Card>
    </>
  );
}
