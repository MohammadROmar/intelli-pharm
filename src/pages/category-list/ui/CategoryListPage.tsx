import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CategoryRow } from '@/entities/category';
import { dummyCategories } from '@/entities/category/model/dummyCategories'; // TO BE REMOVED
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  PageTitle,
} from '@/shared/ui';
import { TableCard } from '@/widgets/table-card';

export default function CategoryListPage() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.list',
  });

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />

      <TableCard
        basePath="/dashboard/categories"
        currentPage={parseInt(page ?? '1')}
        maxPages={20}
        title={t('all')}
        totalItems={200}
      >
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">{t('id')}</TableHead>
            <TableHead>{t('name')}</TableHead>
            <TableHead>{t('parentName')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyCategories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
