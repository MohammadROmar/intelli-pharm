import { Suspense } from 'react';
import type { ElementType, ReactNode } from 'react';

type WithSuspenseProps = { loader?: ReactNode; Component: ElementType };

export function WithSuspense({ loader, Component }: WithSuspenseProps) {
  return (
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  );
}
