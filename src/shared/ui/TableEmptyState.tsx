import { FolderOpen, SearchX } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from './Button';

interface Props {
  variant: 'empty' | 'search';
  query?: string;
  onClearSearch?: () => void;
  onAdd?: () => void;
}

export function TableEmptyState({
  variant,
  query,
  onClearSearch,
  onAdd,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.noResults',
  });

  const isSearch = variant === 'search';
  const Icon = isSearch ? SearchX : FolderOpen;

  return (
    <tr>
      <td colSpan={100} className="py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-muted text-muted-foreground flex h-14 w-14 items-center justify-center rounded-2xl">
            <Icon className="h-7 w-7" />
          </div>

          <p className="text-foreground text-sm font-semibold">
            {isSearch ? t('noResultsTitle') : t('emptyTitle')}
          </p>

          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {isSearch ? t('noResultsMessage', { query }) : t('emptyMessage')}
          </p>

          {isSearch && onClearSearch && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSearch}
              className="mt-1"
            >
              {t('clearSearch')}
            </Button>
          )}

          {!isSearch && onAdd && (
            <Button size="sm" onClick={onAdd} className="mt-1">
              {t('addFirstItem')}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
