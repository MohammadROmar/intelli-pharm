import {
  AlertTriangle,
  CloudCog,
  RefreshCcw,
  RefreshCw,
  WifiOff,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Button } from './Button';
import { Separator } from './Separator';
import type { ErrorBoundaryFallbackProps } from '../lib';

type ErrorType = 'generic' | 'chunk-load' | 'offline';

type LocaleConfig = {
  readonly dir: 'ltr' | 'rtl';
  readonly title: string;
  readonly description: string;
  readonly chunkTitle: string;
  readonly chunkDescription: string;
  readonly offlineTitle: string;
  readonly offlineDescription: string;
  readonly tryAgain: string;
  readonly reload: string;
};

type ErrorDisplay = {
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly canTryAgain: boolean;
};

const FALLBACK_CONFIG = {
  ar: {
    dir: 'rtl',
    title: 'حدث خطأ ما',
    description:
      'حدث خطأ غير متوقع. حاول مرة أخرى — إذا استمرت المشكلة، قم بإعادة تحميل الصفحة.',
    chunkTitle: 'فشل تحميل الصفحة',
    chunkDescription:
      'تعذّر تحميل أجزاء من التطبيق. أعد تحميل الصفحة للمحاولة مرة أخرى.',
    offlineTitle: 'لا يوجد اتصال بالإنترنت',
    offlineDescription:
      'يبدو أنك غير متصل بالإنترنت. استعد الاتصال ثم أعد تحميل الصفحة.',
    tryAgain: 'إعادة المحاولة',
    reload: 'إعادة تحميل الصفحة',
  },
  en: {
    dir: 'ltr',
    title: 'Something went wrong',
    description:
      'An unexpected error occurred. Try again — if the problem persists, reload the page.',
    chunkTitle: 'Failed to load page',
    chunkDescription:
      'Part of the app could not be loaded. Reload the page to try again.',
    offlineTitle: 'No Internet Connection',
    offlineDescription:
      'You appear to be offline. Restore your connection, then reload.',
    tryAgain: 'Try Again',
    reload: 'Reload page',
  },
} satisfies Record<'ar' | 'en', LocaleConfig>;

const CHUNK_LOAD_ERROR_PATTERNS = [
  'dynamically imported module',
  'module script failed',
] as const;

function getLocaleConfig(): LocaleConfig {
  try {
    const locale =
      localStorage.getItem('i18nextLng') ?? document.documentElement.lang ?? '';
    if (locale.startsWith('ar') || document.documentElement.dir === 'rtl') {
      return FALLBACK_CONFIG.ar;
    }
  } catch (err) {
    console.warn('Failed to detect locale in ErrorBoundary:', err);
  }
  return FALLBACK_CONFIG.en;
}

function classifyError(error: Error | null | undefined): ErrorType {
  if (!navigator.onLine) return 'offline';
  const msg = error?.message?.toLowerCase() ?? '';
  if (CHUNK_LOAD_ERROR_PATTERNS.some((pattern) => msg.includes(pattern))) {
    return 'chunk-load';
  }
  return 'generic';
}

function resolveErrorDisplay(
  type: ErrorType,
  config: LocaleConfig,
): ErrorDisplay {
  switch (type) {
    case 'offline':
      return {
        title: config.offlineTitle,
        description: config.offlineDescription,
        Icon: WifiOff,
        canTryAgain: false,
      };
    case 'chunk-load':
      return {
        title: config.chunkTitle,
        description: config.chunkDescription,
        Icon: CloudCog,
        canTryAgain: false,
      };
    default:
      return {
        title: config.title,
        description: config.description,
        Icon: AlertTriangle,
        canTryAgain: true,
      };
  }
}

export function PageErrorFallback({
  error,
  reset,
}: ErrorBoundaryFallbackProps) {
  const config = getLocaleConfig();
  const errorType = classifyError(error);
  const { title, description, Icon, canTryAgain } = resolveErrorDisplay(
    errorType,
    config,
  );

  const handleTryAgain =
    errorType === 'generic' ? reset : () => window.location.reload();

  return (
    <div className="grid h-full items-center justify-center" dir={config.dir}>
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center px-4 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex size-16 items-center justify-center rounded-2xl">
          <Icon className="size-8" />
        </div>

        <h2 className="text-foreground mb-2 text-xl font-semibold">{title}</h2>

        <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
          {description}
        </p>

        <div className="flex items-center gap-4">
          {canTryAgain ? (
            <Button
              size="sm"
              variant="outline"
              onClick={handleTryAgain}
              className="gap-2"
            >
              <RefreshCcw className="size-4" />
              {config.tryAgain}
            </Button>
          ) : null}

          <Button
            size="sm"
            onClick={() => window.location.reload()}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            {config.reload}
          </Button>
        </div>

        {error?.message && errorType === 'generic' ? (
          <>
            <Separator className="my-8 max-w-xs" />
            <p className="text-muted-foreground/50 max-w-sm font-mono text-xs break-all">
              {error.message}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function SectionErrorFallback({
  error,
  reset,
}: ErrorBoundaryFallbackProps) {
  const config = getLocaleConfig();
  const errorType = classifyError(error);
  const { title, description, Icon, canTryAgain } = resolveErrorDisplay(
    errorType,
    config,
  );

  const isGenericRetry = canTryAgain && errorType === 'generic';
  const handleAction = isGenericRetry ? reset : () => window.location.reload();

  return (
    <div
      className="flex w-full flex-col items-center justify-center py-12 text-center"
      dir={config.dir}
    >
      <div className="bg-muted text-muted-foreground mb-4 flex size-12 items-center justify-center rounded-xl">
        <Icon className="size-6" />
      </div>

      <p className="text-foreground mb-1 text-sm font-semibold">{title}</p>

      <p className="text-muted-foreground mb-4 max-w-62.5 text-xs leading-relaxed">
        {description}
      </p>

      <Button
        variant="outline"
        size="sm"
        onClick={handleAction}
        className="gap-1.5"
      >
        <RefreshCw className="size-3.5" />
        {isGenericRetry ? config.tryAgain : config.reload}
      </Button>
    </div>
  );
}
