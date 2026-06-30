import { Component } from 'react';
import type { ComponentType, CSSProperties, ErrorInfo, ReactNode } from 'react';

import {
  tryAutoReload,
  isChunkLoadError,
  alreadyTriedReload,
} from './chunkError';

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
  | { fallback: ReactNode; FallbackComponent?: never; fallbackRender?: never }
  | { fallback?: never; FallbackComponent?: never; fallbackRender?: never }
);

const defaultFallbackStyles = {
  root: {
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'system-ui',
  } satisfies CSSProperties,
  msg: { fontWeight: 600 } satisfies CSSProperties,
  button: { marginTop: '1rem', cursor: 'pointer' } satisfies CSSProperties,
};

type State =
  | { didCatch: false; error: null; willReload: false }
  | { didCatch: true; error: Error; willReload: boolean };

const INITIAL_STATE: State = {
  didCatch: false,
  error: null,
  willReload: false,
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = INITIAL_STATE;

  static getDerivedStateFromError(error: unknown): State {
    const normalized =
      error instanceof Error
        ? error
        : new Error(String(error ?? 'Unknown error'));

    const willReload =
      isChunkLoadError(normalized) && navigator.onLine && !alreadyTriedReload();

    return { didCatch: true, error: normalized, willReload };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    if (isChunkLoadError(error)) {
      if (navigator.onLine) tryAutoReload();
      return;
    }

    this.props.onError?.(error, info);

    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error);
      console.error('[ErrorBoundary] Stack:', info.componentStack);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    const { resetKeys } = this.props;
    if (!this.state.didCatch || !resetKeys?.length) return;

    const changed = resetKeys.some(
      (key, i) => key !== prevProps.resetKeys?.[i],
    );
    if (changed) this.reset();
  }

  reset = (): void => {
    this.props.onReset?.();
    this.setState(INITIAL_STATE);
  };

  render(): ReactNode {
    const { children, fallbackRender, FallbackComponent, fallback } =
      this.props;
    const { didCatch, error, willReload } = this.state;

    if (!didCatch) return children;

    if (willReload) return null;

    const props: ErrorBoundaryFallbackProps = {
      error: error!,
      reset: this.reset,
    };

    if (fallbackRender) return fallbackRender(props);
    if (FallbackComponent) return <FallbackComponent {...props} />;
    if (fallback !== undefined) return fallback;

    return (
      <div style={defaultFallbackStyles.root}>
        <p style={defaultFallbackStyles.msg}>Something went wrong</p>
        <button onClick={this.reset} style={defaultFallbackStyles.button}>
          Try again
        </button>
      </div>
    );
  }
}
