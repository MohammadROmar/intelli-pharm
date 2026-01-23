import { Suspense } from 'react';
import type { ElementType, ReactNode } from 'react';

type WithSuspenseProps = { loader?: ReactNode; Component: ElementType };

function WithSuspense({ loader, Component }: WithSuspenseProps) {
  return (
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  );
}

export default WithSuspense;
