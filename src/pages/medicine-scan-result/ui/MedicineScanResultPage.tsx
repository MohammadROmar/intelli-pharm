import { lazy, Suspense, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

import { useKeyboardBarcodeScanner } from '@/shared/barcode';

import { BarcodeNotFound } from './BarcodeNotFound';
import { ScanResultCardSkeleton } from './ScanResultCardSkeleton';
import { MedicineScanResultErrorBoundary } from './MedicineScanResultErrorBoundary';

const MedicineScanResultContent = lazy(
  () => import('./MedicineScanResultContent'),
);

function decodeBarcode(barcode: string | undefined) {
  if (!barcode) return '';

  try {
    return decodeURIComponent(barcode);
  } catch {
    return barcode;
  }
}

export default function MedicineScanResultPage() {
  const { barcode } = useParams<{ barcode: string }>();
  const navigate = useNavigate();

  const decodedBarcode = decodeBarcode(barcode);

  const handleScan = useCallback(
    (nextBarcode: string) => {
      if (nextBarcode === decodedBarcode) return;

      navigate(`/dashboard/medicines/scan/${encodeURIComponent(nextBarcode)}`);
    },
    [decodedBarcode, navigate],
  );

  useKeyboardBarcodeScanner({
    onScan: handleScan,
  });

  if (!decodedBarcode) {
    return <BarcodeNotFound barcode="" />;
  }

  return (
    <MedicineScanResultErrorBoundary
      key={decodedBarcode}
      barcode={decodedBarcode}
    >
      <Suspense fallback={<ScanResultCardSkeleton />}>
        <MedicineScanResultContent barcode={decodedBarcode} />
      </Suspense>
    </MedicineScanResultErrorBoundary>
  );
}
