import { CategoryForm } from '@/entities/category';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  PageTitle,
} from '@/shared/ui';
import { useTranslation } from 'react-i18next';

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
          <CategoryForm
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </CardContent>
      </Card>
    </>
  );
}
