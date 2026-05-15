import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanBarcode } from 'lucide-react';

import { ErrorBoundary } from '@/shared/lib';
import {
  Skeleton,
  DetailCard,
  DetailCell,
  SectionErrorFallback,
} from '@/shared/ui';

const Barcode = lazy(() => import('react-barcode'));

type Props = {
  barcode?: string | null;
};

export function MedicineBarcodeCard({ barcode }: Props) {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('barcodeCardTitle')}
      subtitle={t('barcodeCardSubtitle')}
      icon={ScanBarcode}
    >
      <ErrorBoundary FallbackComponent={SectionErrorFallback}>
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelBarcode')}>
            {barcode ? (
              <Suspense
                fallback={<Skeleton className="h-24 w-64 rounded-md" />}
              >
                <Barcode
                  value={barcode}
                  background="var(--card)"
                  lineColor="currentColor"
                  font="var(--font-mono)"
                />
              </Suspense>
            ) : (
              <span>-</span>
            )}
          </DetailCell>
        </div>
      </ErrorBoundary>
    </DetailCard>
  );
}
