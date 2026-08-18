import type { ReactNode } from 'react';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import type { ApiError } from '@/shared/api';
import { ErrorBoundary } from '@/shared/lib';
import { QueryError } from '@/shared/ui';

import { BarcodeNotFound } from './BarcodeNotFound';

type MedicineScanResultErrorBoundaryProps = {
  barcode: string;
  children: ReactNode;
};

export function MedicineScanResultErrorBoundary({
  barcode,
  children,
}: MedicineScanResultErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, reset: resetBoundary }) => {
        const apiError = error as ApiError;

        if (apiError.status === 404) {
          return <BarcodeNotFound barcode={barcode} />;
        }

        return <QueryError error={apiError} onRetry={resetBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
