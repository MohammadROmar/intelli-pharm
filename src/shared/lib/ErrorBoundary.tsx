import { Component } from 'react';
import type { ComponentType, CSSProperties, ErrorInfo, ReactNode } from 'react';

import { isChunkLoadError } from './chunkError';

export type ErrorBoundaryFallbackProps = { error: Error; reset: () => void };

type FallbackRender = (props: ErrorBoundaryFallbackProps) => ReactNode;

export type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: () => void;
  resetKeys?: unknown[];
} & (
  | {
      fallbackRender: FallbackRender;
      FallbackComponent?: never;
      fallback?: never;
    }
  | {
      FallbackComponent: ComponentType<ErrorBoundaryFallbackProps>;
      fallbackRender?: never;
      fallback?: never;
    }
  | {
      fallback: ReactNode;
      FallbackComponent?: never;
      fallbackRender?: never;
    }
  | {
      fallback?: never;
      FallbackComponent?: never;
      fallbackRender?: never;
    }
);

const defaultFallbackStyles = {
  root: {
    minHeight: '18rem',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem',
    color: 'var(--foreground)',
    background: 'var(--background)',
    fontFamily: 'inherit',
  } satisfies CSSProperties,
  card: {
    width: 'min(100%, 30rem)',
    padding: '1.5rem',
    border: '1px solid var(--border)',
    borderRadius: '0.75rem',
    background: 'var(--card)',
    boxShadow: '0 1px 2px rgb(0 0 0 / 0.05)',
  } satisfies CSSProperties,
  eyebrow: {
    margin: '0 0 0.5rem',
    color: 'var(--muted-foreground)',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  } satisfies CSSProperties,
  title: {
    margin: 0,
    color: 'var(--foreground)',
    fontSize: '1.25rem',
    fontWeight: 650,
    lineHeight: 1.4,
  } satisfies CSSProperties,
  description: {
    margin: '0.75rem 0 0',
    color: 'var(--muted-foreground)',
    fontSize: '0.925rem',
    lineHeight: 1.7,
  } satisfies CSSProperties,
  button: {
    minHeight: '2.5rem',
    marginTop: '1.25rem',
    padding: '0.5rem 1rem',
    border: 0,
    borderRadius: '0.5rem',
    color: 'var(--primary-foreground)',
    background: 'var(--primary)',
    font: 'inherit',
    fontWeight: 600,
    cursor: 'pointer',
  } satisfies CSSProperties,
};

type State =
  | {
      didCatch: false;
      error: null;
    }
  | {
      didCatch: true;
      error: Error;
    };

type FallbackCopy = {
  action: string;
  description: string;
  eyebrow: string;
  title: string;
};

const INITIAL_STATE: State = {
  didCatch: false,
  error: null,
};

function isArabicDocument(): boolean {
  if (
    typeof document !== 'undefined' &&
    document.documentElement.lang.toLowerCase().startsWith('ar')
  ) {
    return true;
  }

  try {
    return (
      localStorage.getItem('i18nextLng')?.toLowerCase().startsWith('ar') ??
      false
    );
  } catch {
    return false;
  }
}

function getFallbackCopy(
  isArabic: boolean,
  isChunkError: boolean,
): FallbackCopy {
  if (isArabic) {
    return isChunkError
      ? {
          eyebrow: 'تعذر تحميل الصفحة',
          title: 'لم نتمكن من تحميل هذا الجزء من التطبيق',
          description:
            'قد يكون اتصالك بالإنترنت غير مستقر أو تم تحديث التطبيق. تحقق من الاتصال، ثم أعد تحميل التطبيق عندما تكون مستعدًا.',
          action: 'إعادة تحميل التطبيق',
        }
      : {
          eyebrow: 'خطأ غير متوقع',
          title: 'حدث خطأ ما',
          description: 'حاول مرة أخرى. إذا استمرت المشكلة، أعد تحميل الصفحة.',
          action: 'المحاولة مجددًا',
        };
  }

  return isChunkError
    ? {
        eyebrow: 'Loading interrupted',
        title: 'This part of the app could not be loaded',
        description:
          'Your connection may be unstable, or the app may have been updated. Check your connection, then reload when you are ready.',
        action: 'Reload app',
      }
    : {
        eyebrow: 'Unexpected error',
        title: 'Something went wrong',
        description: 'Try again. If the problem continues, reload the page.',
        action: 'Try again',
      };
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = INITIAL_STATE;

  static getDerivedStateFromError(error: unknown): State {
    const normalizedError =
      error instanceof Error
        ? error
        : new Error(String(error ?? 'Unknown error'));

    return {
      didCatch: true,
      error: normalizedError,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);

    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error);
      console.error('[ErrorBoundary] Stack:', info.componentStack);
    }
  }

  componentDidUpdate(previousProps: ErrorBoundaryProps): void {
    const { resetKeys } = this.props;

    if (!this.state.didCatch || !resetKeys) return;

    const previousResetKeys = previousProps.resetKeys;

    const resetKeysChanged =
      resetKeys.length !== previousResetKeys?.length ||
      resetKeys.some(
        (key, index) => !Object.is(key, previousResetKeys?.[index]),
      );

    if (resetKeysChanged) {
      this.resetBoundary();
    }
  }

  private resetBoundary = (): void => {
    this.props.onReset?.();
    this.setState(INITIAL_STATE);
  };

  reset = (): void => {
    if (this.state.didCatch && isChunkLoadError(this.state.error)) {
      this.props.onReset?.();
      window.location.reload();
      return;
    }

    this.resetBoundary();
  };

  render(): ReactNode {
    const { children, fallbackRender, FallbackComponent, fallback } =
      this.props;
    const { didCatch, error } = this.state;

    if (!didCatch) return children;

    const fallbackProps: ErrorBoundaryFallbackProps = {
      error,
      reset: this.reset,
    };

    if (fallbackRender) {
      return fallbackRender(fallbackProps);
    }

    if (FallbackComponent) {
      return <FallbackComponent {...fallbackProps} />;
    }

    if (fallback !== undefined) {
      return fallback;
    }

    const isArabic = isArabicDocument();
    const copy = getFallbackCopy(isArabic, isChunkLoadError(error));

    return (
      <div
        aria-live="assertive"
        dir={isArabic ? 'rtl' : 'ltr'}
        role="alert"
        style={defaultFallbackStyles.root}
      >
        <div style={defaultFallbackStyles.card}>
          <p style={defaultFallbackStyles.eyebrow}>{copy.eyebrow}</p>

          <h2 style={defaultFallbackStyles.title}>{copy.title}</h2>

          <p style={defaultFallbackStyles.description}>{copy.description}</p>

          <button
            onClick={this.reset}
            style={defaultFallbackStyles.button}
            type="button"
          >
            {copy.action}
          </button>
        </div>
      </div>
    );
  }
}
