import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { QueryError } from './QueryError';
import type { ApiError } from '../api';
import { ErrorBoundary, getBackoffDelay } from '../lib';

type Props = { children: ReactNode };

function ResetAttemptsOnSuccess({
  children,
  onSuccess,
}: {
  children: ReactNode;
  onSuccess: () => void;
}) {
  useEffect(() => {
    onSuccess();
  }, [onSuccess]);

  return <>{children}</>;
}

export function QueryErrorBoundary({ children }: Props) {
  const { reset } = useQueryErrorResetBoundary();
  const attemptRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleRetry = useCallback(
    (boundaryReset: () => void) => {
      const delay = getBackoffDelay(attemptRef.current);
      attemptRef.current += 1;
      setIsRetrying(true);

      timeoutRef.current = setTimeout(() => {
        reset();
        boundaryReset();
        setIsRetrying(false);
      }, delay);
    },
    [reset],
  );

  const resetAttempts = useCallback(() => {
    attemptRef.current = 0;
  }, []);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, reset: boundaryReset }) => (
        <QueryError
          error={error as ApiError}
          onRetry={() => handleRetry(boundaryReset)}
          isRetrying={isRetrying}
        />
      )}
    >
      <ResetAttemptsOnSuccess onSuccess={resetAttempts}>
        {children}
      </ResetAttemptsOnSuccess>
    </ErrorBoundary>
  );
}
