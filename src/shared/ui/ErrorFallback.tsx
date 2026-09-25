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
  readonly genericBadge: string;
  readonly chunkBadge: string;
  readonly offlineBadge: string;
  readonly tryAgain: string;
  readonly reload: string;
};

type ErrorDisplay = {
  readonly title: string;
  readonly description: string;
  readonly Icon: LucideIcon;
  readonly canTryAgain: boolean;
  readonly iconClass: string;
  readonly badgeClass: string;
  readonly badge: string;
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
    genericBadge: 'خطأ في التطبيق',
    chunkBadge: 'فشل التحميل',
    offlineBadge: 'غير متصل',
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
    offlineTitle: 'No internet connection',
    offlineDescription:
      'You appear to be offline. Restore your connection, then reload.',
    genericBadge: 'Application Error',
    chunkBadge: 'Load Failed',
    offlineBadge: 'Offline',
    tryAgain: 'Try again',
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
        iconClass: 'bg-muted text-muted-foreground',
        badgeClass: 'bg-muted/80 text-muted-foreground',
        badge: config.offlineBadge,
      };
    case 'chunk-load':
      return {
        title: config.chunkTitle,
        description: config.chunkDescription,
        Icon: CloudCog,
        canTryAgain: false,
        iconClass: 'bg-muted text-muted-foreground',
        badgeClass: 'bg-muted/80 text-muted-foreground',
        badge: config.chunkBadge,
      };
    default:
      return {
        title: config.title,
        description: config.description,
        Icon: AlertTriangle,
        canTryAgain: true,
        iconClass: 'bg-destructive/10 text-destructive',
        badgeClass: 'bg-destructive/10 text-destructive',
        badge: config.genericBadge,
      };
  }
}

export function PageErrorFallback({
  error,
  reset,
}: ErrorBoundaryFallbackProps) {
  const config = getLocaleConfig();
  const errorType = classifyError(error);
  const {
    title,
    description,
    Icon,
    canTryAgain,
    iconClass,
    badgeClass,
    badge,
  } = resolveErrorDisplay(errorType, config);

  const showStackTrace =
    errorType === 'generic' && Boolean(error?.message) && import.meta.env.DEV;

  return (
    <div
      className="grid h-full min-h-[60vh] place-items-center px-6 py-20"
      dir={config.dir}
    >
      <div className="flex w-full max-w-sm flex-col items-center text-center">
        <div
          className={`animate-in fade-in zoom-in-95 fill-mode-[both] mb-5 flex size-16 items-center justify-center rounded-2xl duration-500 motion-reduce:animate-none ${iconClass}`}
        >
          <Icon className="size-7" aria-hidden />
        </div>

        <div
          className={`animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] mb-6 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold tracking-widest uppercase duration-500 [animation-delay:75ms] motion-reduce:animate-none ${badgeClass}`}
        >
          {badge}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] space-y-3 duration-700 [animation-delay:125ms] motion-reduce:animate-none">
          <h2 className="text-foreground text-2xl font-bold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
            {description}
          </p>
        </div>

        <div
          aria-hidden
          className="bg-border animate-in fade-in fill-mode-[both] my-7 h-px w-10 duration-500 [animation-delay:200ms] motion-reduce:animate-none"
        />

        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-[both] flex w-full max-w-xs flex-col gap-3 duration-700 [animation-delay:250ms] motion-reduce:animate-none sm:max-w-none sm:flex-row sm:justify-center">
          {canTryAgain && (
            <Button variant="outline" onClick={reset} className="group gap-2">
              <RefreshCcw
                aria-hidden
                className="size-4 origin-center transition-transform duration-200 group-hover:rotate-90"
              />
              {config.tryAgain}
            </Button>
          )}

          <Button
            onClick={() => window.location.reload()}
            className="group gap-2"
          >
            <RefreshCw
              aria-hidden
              className="size-4 origin-center transition-transform duration-200 group-hover:rotate-90"
            />
            {config.reload}
          </Button>
        </div>

        {showStackTrace && (
          <div className="animate-in fade-in fill-mode-[both] flex w-full flex-col items-center duration-500 [animation-delay:300ms] motion-reduce:animate-none">
            <Separator className="my-8 max-w-xs" />
            <p className="text-muted-foreground/50 max-w-sm font-mono text-xs break-all">
              {error?.message}
            </p>
          </div>
        )}
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
  const { title, description, Icon, canTryAgain, iconClass } =
    resolveErrorDisplay(errorType, config);

  const isGenericRetry = canTryAgain && errorType === 'generic';
  const handleAction = isGenericRetry ? reset : () => window.location.reload();

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center py-12 text-center"
      dir={config.dir}
    >
      <div
        className={`animate-in fade-in zoom-in-95 fill-mode-[both] mb-4 flex size-12 items-center justify-center rounded-xl duration-500 motion-reduce:animate-none ${iconClass}`}
      >
        <Icon className="size-5" aria-hidden />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 fill-mode-[both] space-y-1.5 duration-500 [animation-delay:75ms] motion-reduce:animate-none">
        <p className="text-foreground text-sm font-semibold">{title}</p>
        <p className="text-muted-foreground max-w-xs text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-3 fill-mode-[both] mt-5 duration-500 [animation-delay:125ms] motion-reduce:animate-none">
        <Button
          variant="outline"
          size="sm"
          onClick={handleAction}
          className="gap-1.5"
        >
          <span aria-hidden>
            <RefreshCw className="size-3.5" />
          </span>
          {isGenericRetry ? config.tryAgain : config.reload}
        </Button>
      </div>
    </div>
  );
}
