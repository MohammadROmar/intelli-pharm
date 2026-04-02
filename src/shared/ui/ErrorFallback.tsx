import { useTranslation } from 'react-i18next';
import { AlertTriangle, RefreshCw } from 'lucide-react';

import { Button } from './Button';
import { Separator } from './Separator';
import type { ErrorBoundaryFallbackProps } from './ErrorBoundary';

export function PageErrorFallback({
  error,
  reset,
}: ErrorBoundaryFallbackProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.errorBoundary',
  });

  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 text-center">
      <div className="bg-muted text-muted-foreground mb-6 flex size-16 items-center justify-center rounded-2xl">
        <AlertTriangle className="size-8" />
      </div>

      <h2 className="text-foreground mb-2 text-xl font-semibold">
        {t('title')}
      </h2>

      <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
        {t('description')}
      </p>

      <Button variant="outline" onClick={reset} className="gap-2">
        <RefreshCw className="size-4" />
        {t('tryAgain')}
      </Button>

      {import.meta.env.DEV && (
        <>
          <Separator className="my-8 max-w-xs" />
          <p className="text-muted-foreground/50 max-w-sm font-mono text-xs break-all">
            {error.message}
          </p>
        </>
      )}
    </div>
  );
}

export function SectionErrorFallback({ reset }: ErrorBoundaryFallbackProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.errorBoundary',
  });

  return (
    <div className="flex w-full flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted text-muted-foreground mb-4 flex size-12 items-center justify-center rounded-xl">
        <AlertTriangle className="size-6" />
      </div>

      <p className="text-foreground mb-1 text-sm font-semibold">{t('title')}</p>
      <p className="text-muted-foreground mb-4 text-xs">{t('description')}</p>

      <Button variant="outline" size="sm" onClick={reset} className="gap-1.5">
        <RefreshCw className="size-3.5" />
        {t('tryAgain')}
      </Button>
    </div>
  );
}

export const DefaultErrorFallback = PageErrorFallback;
