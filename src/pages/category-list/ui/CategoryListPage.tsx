import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { CategoryRow, type CategoryListItem } from '@/entities/category';
import {
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  PageTitle,
} from '@/shared/ui';
import { TableCard } from '@/widgets/table-card';

const categories: CategoryListItem[] = [
  {
    id: 1,
    name: 'Electronics',
    parentId: null,
    parentName: null,
  },
  {
    id: 2,
    name: 'Smartphones',
    parentId: 1,
    parentName: 'Electronics',
  },
  {
    id: 3,
    name: 'Laptops',
    parentId: 1,
    parentName: 'Electronics',
  },
  {
    id: 4,
    name: 'Clothing',
    parentId: null,
    parentName: null,
  },
  {
    id: 5,
    name: "Men's Clothing",
    parentId: 4,
    parentName: 'Clothing',
  },
  {
    id: 6,
    name: "Women's Clothing",
    parentId: 4,
    parentName: 'Clothing',
  },
  {
    id: 7,
    name: 'Books',
    parentId: null,
    parentName: null,
  },
  {
    id: 8,
    name: 'Fiction',
    parentId: 7,
    parentName: 'Books',
  },
  {
    id: 9,
    name: 'Home & Kitchen',
    parentId: null,
    parentName: null,
  },
  {
    id: 10,
    name: 'Furniture',
    parentId: 9,
    parentName: 'Home & Kitchen',
  },
];

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
          {categories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </TableBody>
      </TableCard>
    </>
  );
}
