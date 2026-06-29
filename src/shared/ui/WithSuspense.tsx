import { Suspense } from 'react';
import type { ReactNode } from 'react';

import { PageErrorFallback } from './ErrorFallback';
import { ErrorBoundary } from '../lib';

type WithSuspenseProps = {
  loader?: ReactNode;
  children: ReactNode;
};

export function WithSuspense({ loader = null, children }: WithSuspenseProps) {
  return (
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <Suspense fallback={loader}>{children}</Suspense>
    </ErrorBoundary>
  );
}
