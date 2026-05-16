import { Component } from 'react';
import type { ComponentType, ErrorInfo, ReactNode } from 'react';

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

type State =
  | { didCatch: false; error: null }
  | { didCatch: true; error: Error };

const INITIAL_STATE: State = { didCatch: false, error: null };

export class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
  state: State = INITIAL_STATE;

  static getDerivedStateFromError(error: unknown): State {
    const normalized =
      error instanceof Error
        ? error
        : new Error(String(error ?? 'Unknown error'));
    return { didCatch: true, error: normalized };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
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
    const { didCatch, error } = this.state;

    if (!didCatch) return children;

    const props: ErrorBoundaryFallbackProps = {
      error: error!,
      reset: this.reset,
    };

    if (fallbackRender) return fallbackRender(props);
    if (FallbackComponent) return <FallbackComponent {...props} />;
    if (fallback !== undefined) return fallback;

    return (
      <div
        style={{
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui',
        }}
      >
        <p style={{ fontWeight: 600 }}>Something went wrong</p>
        <button
          onClick={this.reset}
          style={{ marginTop: '1rem', cursor: 'pointer' }}
        >
          Try again
        </button>
      </div>
    );
  }
}
