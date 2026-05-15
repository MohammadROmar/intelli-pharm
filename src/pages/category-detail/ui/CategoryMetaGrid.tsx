import { useTranslation } from 'react-i18next';
import { CalendarDays, Folders, FolderTree, RefreshCw } from 'lucide-react';

import type { CategoryDetail } from '@/entities/category';
import { getLocalized } from '@/shared/lib';
import {
  Badge,
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
  SplitDateTime,
} from '@/shared/ui';

type Props = { category: CategoryDetail };

export function CategoryMetaGrid({ category }: Props) {
  const { t, i18n } = useTranslation('categories', {
    keyPrefix: 'detail',
  });

  const isTopLevel = category.parent_id === null;

  const name = getLocalized(category.name, i18n.language);

  return (
    <DetailCard
      title={t('infoTitle')}
      subtitle={t('infoSubtitle')}
      icon={Folders}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span>{category.id}</span>
        </DetailCell>
        <DetailCell label={t('labelName')}>
          <span className="flex items-center gap-1.5">
            <Folders className="text-muted-foreground size-3.5 shrink-0" />
            {name}
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
            variant={isTopLevel ? 'success' : 'info'}
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
          {category.parent_name ? (
            <BadgeLink
              label={category.parent_name}
              to={`/dashboard/categories/${category.parent_id}`}
              icon={FolderTree}
            />
          ) : (
            <Badge
              variant="secondary"
              className="text-muted-foreground font-normal"
            >
              {t('noParent')}
            </Badge>
          )}
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <SplitDateTime date={category.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('labelUpdatedAt')}>
          <SplitDateTime date={category.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
