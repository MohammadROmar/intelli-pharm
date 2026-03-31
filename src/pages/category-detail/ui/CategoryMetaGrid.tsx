import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  Folders,
  FolderTree,
  RefreshCw,
  Tags,
} from 'lucide-react';

import type { CategoryDetail } from '@/entities/category';
import { Badge, DetailCard, DetailCell, Separator } from '@/shared/ui';
import { formatDate } from '@/shared/lib';

type Props = { category: CategoryDetail };

export function CategoryMetaGrid({ category }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'categoriesPage.detail',
  });

  const isTopLevel = category.parent_id === null;

  return (
    <DetailCard title={t('infoTitle')} subtitle={t('infoSubtitle')} icon={Tags}>
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
          <Badge asChild variant="secondary">
            <Link to={`/dashboard/categories/${category.parent_id}`}>
              <FolderTree className="text-muted-foreground size-4 shrink-0" />
              {category.parent_name ?? (
                <span className="text-muted-foreground font-normal">
                  {t('noParent')}
                </span>
              )}
            </Link>
          </Badge>
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
    </DetailCard>
  );
}
