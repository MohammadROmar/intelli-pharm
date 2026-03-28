import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  Folders,
  FolderTree,
  RefreshCw,
  Tags,
} from 'lucide-react';

import type { CategoryDetail } from '@/entities/category';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DetailCell,
  Separator,
} from '@/shared/ui';
import { formatDate } from '@/shared/lib';
import { Link } from 'react-router-dom';

type Props = { category: CategoryDetail };

export function CategoryMetaGrid({ category }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.detail',
  });

  const isTopLevel = category.parent_id === null;

  return (
    <Card className="h-fit">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center gap-2 text-base">
            <Tags className="size-4" />
            {t('infoTitle')}
          </CardTitle>
          <CardDescription>{t('infoSubtitle')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelId')}>
            <span>{category.id}</span>
          </DetailCell>
          <DetailCell label={t('labelName')}>
            <span className="flex items-center gap-1.5">
              <Folders className="text-muted-foreground size-4 shrink-0" />
              {category.name}
            </span>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelChildren')}>
            <span>
              {category.children.length > 0
                ? t('childrenCount', { count: category.children.length })
                : t('noChildren')}
            </span>
          </DetailCell>
          <DetailCell label={t('categoryType')}>
            <Badge
              variant={isTopLevel ? 'default' : 'secondary'}
              className="mt-2 font-normal"
            >
              {isTopLevel ? t('topLevel') : t('childLevel')}
            </Badge>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelParentId')}>
            {category.parent_id ? (
              <span>{category.parent_id}</span>
            ) : (
              <span className="text-muted-foreground font-normal">—</span>
            )}
          </DetailCell>
          <DetailCell label={t('labelParentName')}>
            <Link to={`/dashboard/categories/${category.parent_id}`}>
              <Badge variant="secondary">
                <FolderTree className="text-muted-foreground size-4 shrink-0" />
                {category.parent_name ?? (
                  <span className="text-muted-foreground font-normal">
                    {t('noParent')}
                  </span>
                )}
              </Badge>
            </Link>
          </DetailCell>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelCreatedAt')}>
            <span className="flex items-center gap-1.5 font-normal">
              <CalendarDays className="text-muted-foreground size-3.5 shrink-0" />
              {formatDate(category.created_at, i18n.language)}
            </span>
          </DetailCell>
          <DetailCell label={t('labelUpdatedAt')}>
            <span className="flex items-center gap-1.5 font-normal">
              <RefreshCw className="text-muted-foreground size-3.5 shrink-0" />
              {formatDate(category.updated_at, i18n.language)}
            </span>
          </DetailCell>
        </div>
      </CardContent>
    </Card>
  );
}
