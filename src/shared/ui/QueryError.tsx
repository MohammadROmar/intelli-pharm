import type { ReactElement } from 'react';
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

type ErrorVariant = 'network' | 'auth' | 'notFound' | 'server';

function resolveVariant(status?: number): ErrorVariant {
  if (!status) return 'network';
  if (status === 401 || status === 403) return 'auth';
  if (status === 404) return 'notFound';
  return 'server';
}

function toTitleKey(i18nKey: string): string {
  const parts = (i18nKey ?? 'unknown').split('.');
  parts[parts.length - 1] += 'Title';
  return parts.join('.');
}

const VARIANT_ICON: Record<ErrorVariant, ReactElement> = {
  network: <WifiOff className="size-7" aria-hidden />,
  auth: <ShieldOff className="size-7" aria-hidden />,
  notFound: <SearchX className="size-7" aria-hidden />,
  server: <AlertTriangle className="size-7" aria-hidden />,
};

const VARIANT_ICON_CLASS: Record<ErrorVariant, string> = {
  network: 'bg-muted text-muted-foreground',
  auth: 'bg-destructive/10 text-destructive',
  notFound: 'bg-muted text-muted-foreground',
  server: 'bg-destructive/10 text-destructive',
};

const VARIANT_BADGE_CLASS: Record<ErrorVariant, string> = {
  network: 'bg-muted/80 text-muted-foreground',
  auth: 'bg-destructive/10 text-destructive',
  notFound: 'bg-muted/80 text-muted-foreground',
  server: 'bg-destructive/10 text-destructive',
};

const VARIANT_BADGE_KEY: Record<ErrorVariant, string> = {
  network: 'networkBadge',
  auth: 'authBadge',
  notFound: 'notFoundBadge',
  server: 'serverBadge',
};

type Props = {
  error: ApiError;
  onRetry?: () => void;
  isRetrying?: boolean;
};

export function QueryError({ error, onRetry, isRetrying = false }: Props) {
  const { t } = useTranslation('errors');
  const variant = resolveVariant(error.status);

  return (
    <div className="grid h-full min-h-[60vh] place-items-center px-6 py-20">
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div
          className={`animate-in fade-in zoom-in-95 fill-mode-[both] mb-5 flex size-16 items-center justify-center rounded-2xl duration-500 motion-reduce:animate-none ${VARIANT_ICON_CLASS[variant]}`}
        >
          {VARIANT_ICON[variant]}
        </div>

        <div
          className={`animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] mb-6 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-widest uppercase duration-500 [animation-delay:75ms] motion-reduce:animate-none ${VARIANT_BADGE_CLASS[variant]}`}
        >
          {t(VARIANT_BADGE_KEY[variant])}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-3 duration-700 [animation-delay:125ms] motion-reduce:animate-none">
          <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {t(toTitleKey(error.i18nKey))}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {t(error.i18nKey)}
          </p>
        </div>

        {onRetry !== undefined ? (
          <>
            <div
              aria-hidden
              className="bg-border animate-in fade-in fill-mode-[both] my-7 h-px w-10 duration-500 [animation-delay:200ms] motion-reduce:animate-none"
            />

            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] w-full max-w-xs duration-500 [animation-delay:225ms] motion-reduce:animate-none">
              <Button
                onClick={onRetry}
                disabled={isRetrying}
                className="disabled:button-shimmer group w-full gap-2 sm:w-auto"
              >
                <RefreshCw
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-hover:rotate-180"
                />
                {t('retry')}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
