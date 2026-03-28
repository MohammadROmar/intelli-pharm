import { FolderTree, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { CategoryChild, CategoryDetail } from '@/entities/category';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableActions,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui';

type Props = { category: CategoryDetail };

export function CategoryChildrenTable({ category }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.detail',
  });

  const { children } = category;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-base">
              <FolderTree className="size-4" />
              {t('childrenTitle')}
            </CardTitle>
            <CardDescription>{t('childrenSubtitle')}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {children.length > 0 && (
              <Badge variant="secondary">{children.length}</Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={children.length === 0 ? undefined : 'p-0'}>
        {children.length === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center gap-3 py-10">
            <FolderTree className="size-8" />
            <p className="text-center text-sm font-medium">{t('noChildren')}</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-36">{t('colId')}</TableHead>
                <TableHead>{t('colName')}</TableHead>
                <TableHead>{t('colActions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {children.map((child: CategoryChild) => (
                <TableRow key={child.id}>
                  <TableCell className="text-muted-foreground font-mono text-xs">
                    {child.id}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-2 font-medium">
                      <Tag className="text-muted-foreground size-3.5 shrink-0" />
                      {child.name}
                    </span>
                  </TableCell>
                  <TableActions
                    item={child}
                    itemId={child.id}
                    path="/dashboard/categories"
                  >
                    <TableActions.Detail />
                  </TableActions>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
