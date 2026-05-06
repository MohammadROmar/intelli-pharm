import { Suspense } from 'react';
import type { ElementType, ReactNode } from 'react';

import { PageErrorFallback } from './ErrorFallback';
import { ErrorBoundary } from '../lib';

type WithSuspenseProps = { loader?: ReactNode; Component: ElementType };

export function WithSuspense({ loader, Component }: WithSuspenseProps) {
  return (
    <ErrorBoundary FallbackComponent={PageErrorFallback}>
      <Suspense fallback={loader}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
