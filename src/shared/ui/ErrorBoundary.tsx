import { Component } from 'react';
import type { ComponentType, ErrorInfo, ReactNode } from 'react';

import { DefaultErrorFallback } from './ErrorFallback';

export type ErrorBoundaryFallbackProps = {
  error: Error;
  reset: () => void;
};

type FallbackRender = (props: ErrorBoundaryFallbackProps) => ReactNode;

type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, info: ErrorInfo) => void;

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

type ErrorBoundaryState =
  | { didCatch: false; error: null }
  | { didCatch: true; error: Error };

const INITIAL_STATE: ErrorBoundaryState = { didCatch: false, error: null };

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = INITIAL_STATE;

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const normalized =
      error instanceof Error
        ? error
        : new Error(String(error ?? 'Unknown error'));

    return { didCatch: true, error: normalized };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.props.onError?.(error, info);
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
    this.setState(INITIAL_STATE);
  };

  render(): ReactNode {
    const { children, fallbackRender, FallbackComponent, fallback } =
      this.props;
    const { didCatch, error } = this.state;

    if (!didCatch) return children;

    const fallbackProps: ErrorBoundaryFallbackProps = {
      error: error!,
      reset: this.reset,
    };

    if (fallbackRender) return fallbackRender(fallbackProps);
    if (FallbackComponent) return <FallbackComponent {...fallbackProps} />;
    if (fallback !== undefined) return fallback;

    return <DefaultErrorFallback {...fallbackProps} />;
  }
}
