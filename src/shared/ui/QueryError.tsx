import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  RefreshCw,
  SearchX,
  ShieldOff,
  WifiOff,
} from 'lucide-react';

import { Button } from './Button';
import type { ApiError } from '../api';

function getIcon(error: ApiError) {
  if (!error.status) return <WifiOff className="size-8" />;
  if (error.status === 401 || error.status === 403)
    return <ShieldOff className="size-8" />;
  if (error.status === 404) return <SearchX className="size-8" />;
  return <AlertTriangle className="size-8" />;
}

function toTitleKey(i18nKey: string) {
  const parts = (i18nKey ?? 'unknown').split('.');
  parts[parts.length - 1] += 'Title';
  return parts.join('.');
}

type Props = { error: ApiError; onRetry?: () => void; isRetrying?: boolean };

export function QueryError({ error, onRetry, isRetrying = false }: Props) {
  const { t } = useTranslation('errors');
  const icon = getIcon(error);

  return (
    <div className="grid h-full">
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex h-16 w-16 items-center justify-center rounded-2xl">
          {icon}
        </div>

        <h2 className="text-foreground mb-1 text-xl font-semibold">
          {t(toTitleKey(error.i18nKey))}
        </h2>

        <p className="text-muted-foreground mb-6 max-w-sm text-sm leading-relaxed">
          {t(error.i18nKey)}
        </p>

        {onRetry && (
          <Button onClick={onRetry} disabled={isRetrying}>
            <RefreshCw
              className={`size-4 transition-transform duration-300 ${
                isRetrying ? 'animate-spin' : ''
              }`}
            />
            {t('retry')}
          </Button>
        )}
      </div>
    </div>
  );
}
