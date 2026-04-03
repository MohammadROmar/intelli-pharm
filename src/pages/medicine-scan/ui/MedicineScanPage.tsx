import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScanBarcode } from 'lucide-react';

import {
  UsbHint,
  BarcodeScannerView,
  useKeyboardBarcodeScanner,
} from '@/shared/barcode';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  PageTitle,
} from '@/shared/ui';

export default function MedicineScanPage() {
  const navigate = useNavigate();

  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.scan',
  });

  const handleScan = useCallback(
    (barcode: string) => {
      navigate(`/dashboard/medicines/scan/${encodeURIComponent(barcode)}`);
    },
    [navigate],
  );

  useKeyboardBarcodeScanner({ onScan: handleScan });

  return (
    <>
      <PageTitle title={t('title')} subtitle={t('subtitle')} />
      <Card>
        <CardHeader className="text-center">
          <div className="bg-muted text-muted-foreground mx-auto flex size-16 items-center justify-center rounded-2xl">
            <ScanBarcode className="size-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {t('cardTitle')}
            </h1>
            <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
              {t('cardSubtitle')}
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <BarcodeScannerView onScan={handleScan} />
        </CardContent>
        <CardFooter className="w-full items-center justify-center">
          <UsbHint />
        </CardFooter>
      </Card>
    </>
  );
}
