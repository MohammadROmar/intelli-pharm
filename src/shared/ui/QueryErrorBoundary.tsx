import type { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { QueryError } from './QueryError';
import type { ApiError } from '../api';
import { ErrorBoundary } from '../lib';

type Props = { children: ReactNode };

export function QueryErrorBoundary({ children }: Props) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, reset }) => (
        <QueryError error={error as ApiError} onRetry={reset} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
