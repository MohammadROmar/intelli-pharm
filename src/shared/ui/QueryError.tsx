import {
  AlertTriangle,
  RefreshCw,
  SearchX,
  ShieldOff,
  WifiOff,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

import type { ApiError } from '@/shared/api';
import { Button } from '@/shared/ui';

function getIcon(error: ApiError) {
  if (!error.status) return <WifiOff className="size-8" />;
  if (error.status === 401 || error.status === 403)
    return <ShieldOff className="size-8" />;
  if (error.status === 404) return <SearchX className="size-8" />;
  return <AlertTriangle className="size-8" />;
}

function toTitleKey(i18nKey: string): string {
  const parts = i18nKey.split('.');
  parts[parts.length - 1] += 'Title';
  return parts.join('.');
}

interface Props {
  error: ApiError;
  onRetry?: () => void;
}

export function QueryError({ error, onRetry }: Props) {
  const { t } = useTranslation();
  const icon = getIcon(error);

  return (
    <div className="grid h-full">
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
          {icon}
        </div>

        <h2 className="text-foreground mb-2 text-xl font-semibold">
          {t(toTitleKey(error.i18nKey))}
        </h2>

        <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
          {t(error.i18nKey)}
        </p>

        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className="size-4" />
            {t('errors.retry')}
          </Button>
        )}
      </div>
    </div>
  );
}
