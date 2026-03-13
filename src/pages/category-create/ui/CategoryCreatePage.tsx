import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CategoryForm } from '@/entities/category';
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
          <Form />
        </CardContent>
      </Card>
    </>
  );
}

function Form() {
  const [formKey, setFormKey] = useState(0);

  return (
    <CategoryForm
      key={formKey}
      onSubmit={(data) => {
        console.log(data);
      }}
      onReset={() => setFormKey((prev) => prev + 1)}
    />
  );
}
