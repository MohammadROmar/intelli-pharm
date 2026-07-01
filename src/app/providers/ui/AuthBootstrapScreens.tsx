import { useState, type PropsWithChildren } from 'react';

import { Logo } from '@/shared/ui/index.initial';

type Direction = 'ltr' | 'rtl';
type Lang = 'en' | 'ar';
type BootstrapLocale = { lang: Lang; dir: Direction };

const DEFAULT_LOCALE: BootstrapLocale = { lang: 'en', dir: 'ltr' };

/**
 * Reads the active locale once, at mount time.
 *
 * The try/catch stays even without SSR in the picture — it's guarding a
 * real browser condition, not a server one: `localStorage` throws
 * `SecurityError` when a user has blocked all site data/cookies, or when
 * the app runs inside a sandboxed iframe without `allow-same-origin`.
 * Falling back to the `dir` attribute on <html> keeps the screen legible
 * even then.
 */
function detectBootstrapLocale(): BootstrapLocale {
  try {
    const isArabic =
      localStorage.getItem('i18nextLng')?.startsWith('ar') ??
      document.documentElement.dir === 'rtl';
    return isArabic ? { lang: 'ar', dir: 'rtl' } : DEFAULT_LOCALE;
  } catch {
    return document.documentElement.dir === 'rtl'
      ? { lang: 'ar', dir: 'rtl' }
      : DEFAULT_LOCALE;
  }
}

/**
 * Lazy-initialized so `detectBootstrapLocale` runs once per mount — not on
 * every re-render, and not at module-eval time (which would freeze the
 * locale for the life of the loaded module and break tests that need to
 * vary it). See the `rerender-lazy-state-init` rule.
 */
function useBootstrapLocale(): BootstrapLocale {
  const [locale] = useState(detectBootstrapLocale);
  return locale;
}

const copy = {
  loading: { en: 'Loading', ar: 'جارٍ التحميل' },
  reconnecting: { en: 'Reconnecting…', ar: 'جارٍ إعادة الاتصال…' },
  networkError: {
    title: { en: 'Can’t connect', ar: 'تعذَّر الاتصال' },
    body: {
      en: 'Check your internet connection and try again.',
      ar: 'تحقَّق من اتصالك بالإنترنت وأعد المحاولة.',
    },
    retry: { en: 'Try Again', ar: 'إعادة المحاولة' },
    signIn: { en: 'Sign In', ar: 'تسجيل الدخول' },
  },
  interrupted: {
    title: { en: 'Session interrupted', ar: 'انقطعت الجلسة' },
    body: {
      en: 'Your previous session was interrupted while connecting. Your credentials are safe. please sign in to continue.',
      ar: 'انقطعت جلستك السابقة أثناء الاتصال. بياناتك آمنة. يرجى تسجيل الدخول للمتابعة.',
    },
    signIn: { en: 'Sign In Again', ar: 'تسجيل الدخول مجددًا' },
  },
} as const;

const BTN_PRIMARY =
  'h-10 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const BTN_SECONDARY =
  'h-10 rounded-md border border-input bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const BODY_TEXT = 'max-w-[300px] text-sm leading-relaxed text-muted-foreground';

function BootstrapShell({
  dir,
  children,
}: PropsWithChildren<{ dir: Direction }>) {
  return (
    <div
      dir={dir}
      className="bg-background animate-in fade-in fill-mode-[both] flex h-dvh flex-col items-center justify-center gap-10 px-6 duration-300 motion-reduce:animate-none"
    >
      <Logo withColors className="size-12 shrink-0" />
      {children && (
        <div className="flex flex-col items-center gap-7">{children}</div>
      )}
    </div>
  );
}

function IconChip({ children }: PropsWithChildren) {
  return (
    <div className="bg-muted text-muted-foreground flex size-16 items-center justify-center rounded-2xl">
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="border-muted-foreground/25 border-t-foreground size-5 animate-spin rounded-full border-2"
    />
  );
}

function WifiOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
      <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
      <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
      <path d="M5 12.5A10 10 0 0 1 7.5 11" />
      <circle cx="12" cy="20" r="1" fill="currentColor" />
    </svg>
  );
}

function ShieldAlertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-7"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
  );
}

type LoadingScreenProps = { retrying: boolean };

export function LoadingScreen({ retrying }: LoadingScreenProps) {
  const { lang, dir } = useBootstrapLocale();

  if (!retrying) return <BootstrapShell dir={dir} />;

  return (
    <BootstrapShell dir={dir}>
      <div
        role="status"
        aria-live="polite"
        aria-label={copy.loading[lang]}
        className="flex flex-col items-center gap-2"
      >
        <Spinner />
        <p className="text-muted-foreground text-sm">
          {copy.reconnecting[lang]}
        </p>
      </div>
    </BootstrapShell>
  );
}

type NetworkErrorScreenProps = { onRetry: () => void; onSignIn: () => void };

export function NetworkErrorScreen({
  onRetry,
  onSignIn,
}: NetworkErrorScreenProps) {
  const { lang, dir } = useBootstrapLocale();

  return (
    <BootstrapShell dir={dir}>
      <div
        role="alert"
        className="flex flex-col items-center gap-4 text-center"
      >
        <IconChip>
          <WifiOffIcon />
        </IconChip>
        <div className="flex flex-col gap-1.5">
          <p className="text-foreground text-lg font-semibold">
            {copy.networkError.title[lang]}
          </p>
          <p className={BODY_TEXT}>{copy.networkError.body[lang]}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="button" onClick={onRetry} className={BTN_PRIMARY}>
          {copy.networkError.retry[lang]}
        </button>
        <button type="button" onClick={onSignIn} className={BTN_SECONDARY}>
          {copy.networkError.signIn[lang]}
        </button>
      </div>
    </BootstrapShell>
  );
}

type InterruptedScreenProps = { onSignIn: () => void };

export function InterruptedScreen({ onSignIn }: InterruptedScreenProps) {
  const { lang, dir } = useBootstrapLocale();

  return (
    <BootstrapShell dir={dir}>
      <div
        role="alert"
        className="flex flex-col items-center gap-4 text-center"
      >
        <IconChip>
          <ShieldAlertIcon />
        </IconChip>
        <div className="flex flex-col gap-1.5">
          <p className="text-foreground text-lg font-semibold">
            {copy.interrupted.title[lang]}
          </p>
          <p className={BODY_TEXT}>{copy.interrupted.body[lang]}</p>
        </div>
      </div>
      <button type="button" onClick={onSignIn} className={BTN_PRIMARY}>
        {copy.interrupted.signIn[lang]}
      </button>
    </BootstrapShell>
  );
}
