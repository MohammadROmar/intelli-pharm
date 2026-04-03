import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PackageSearch, ScanBarcode } from 'lucide-react';

import { BarcodeScanResultCard } from './BarcodeScanResultCard';
import { ScanResultCardSkeleton } from './ScanResultCardSkeleton';
import { useGetMedicineByBarcode } from '../model/useGetMedicineByBarcode';
import { QueryError } from '@/shared/ui';

function BarcodeNotFound({ barcode }: { barcode: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.scan',
  });

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
        <Link to={'/dashboard/medicines/scan'} className="gap-2">
          <ScanBarcode className="size-4" />
          {t('scanAgain')}
        </Link>
      </div>
    </div>
  );
}

export default function MedicineScanResultPage() {
  const { barcode } = useParams<{ barcode: string }>();

  const decodedBarcode = decodeURIComponent(barcode ?? '');

  const { data, isLoading, isError, error, refetch } =
    useGetMedicineByBarcode();

  if (isLoading) return <ScanResultCardSkeleton />;

  if (isError) {
    const isNotFound = error?.status === 404;
    if (isNotFound) return <BarcodeNotFound barcode={decodedBarcode} />;

    return <QueryError error={error} onRetry={refetch} />;
  }

  if (!data) return null;

  return <BarcodeScanResultCard result={data.data!} />;
}
