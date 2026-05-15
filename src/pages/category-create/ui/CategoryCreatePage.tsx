import { useTranslation } from 'react-i18next';

import { CategoryCreateForm } from '@/features/category-create';
import { PageTitle } from '@/shared/ui';

export default function CategoryCreatePage() {
  const { t } = useTranslation('categories', {
    keyPrefix: 'create',
  });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <CategoryCreateForm />
    </>
  );
}
