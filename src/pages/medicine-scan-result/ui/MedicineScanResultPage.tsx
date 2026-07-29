import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { PackageSearch, ScanBarcode } from 'lucide-react';

import { BarcodeScanResultCard } from './BarcodeScanResultCard';
import { useGetMedicineByBarcodeSuspense } from '../model/useGetMedicineByBarcodeSuspense';
import type { ApiError } from '@/shared/api';
import { ErrorBoundary } from '@/shared/lib';
import { QueryError } from '@/shared/ui';

function BarcodeNotFound({ barcode }: { barcode: string }) {
  const { t } = useTranslation('medicines', { keyPrefix: 'scan' });

  return (
    <div className="grid h-full">
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex size-16 items-center justify-center rounded-2xl">
          <PackageSearch className="size-8" />
        </div>
        <h2 className="text-foreground mb-2 text-xl font-semibold">
          {t('notFoundTitle')}
        </h2>
        <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
          {t('notFoundMessage')}
        </p>
        <p className="text-muted-foreground mb-8 font-mono text-xs">
          {barcode}
        </p>
        <Link
          to="/dashboard/medicines/scan"
          className="flex items-center gap-2"
        >
          <ScanBarcode className="size-4" />
          {t('scanAgain')}
        </Link>
      </div>
    </div>
  );
}

type ScanErrorBoundaryProps = {
  decodedBarcode: string;
  children: ReactNode;
};

function ScanResultErrorBoundary({
  decodedBarcode,
  children,
}: ScanErrorBoundaryProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, reset: resetBoundary }) => {
        const apiError = error as ApiError;

        if (apiError?.status === 404) {
          return <BarcodeNotFound barcode={decodedBarcode} />;
        }

        return <QueryError error={apiError} onRetry={resetBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

type ScanResultContentProps = { barcode: string };

function MedicineScanResultContent({ barcode }: ScanResultContentProps) {
  const { data } = useGetMedicineByBarcodeSuspense(barcode);
  return <BarcodeScanResultCard result={data.data!} />;
}

export default function MedicineScanResultPage() {
  const { barcode } = useParams<{ barcode: string }>();
  const decodedBarcode = decodeURIComponent(barcode ?? '');

  if (!barcode) return <BarcodeNotFound barcode="" />;

  return (
    <ScanResultErrorBoundary decodedBarcode={decodedBarcode}>
      <MedicineScanResultContent barcode={barcode} />
    </ScanResultErrorBoundary>
  );
}
