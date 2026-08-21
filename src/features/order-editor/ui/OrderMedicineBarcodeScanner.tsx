import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoaderCircle, ScanBarcode } from 'lucide-react';

import type { BarcodeScanResult } from '@/entities/medicine';
import {
  BarcodeScanner,
  useKeyboardBarcodeScanner,
} from '@/shared/barcode';
import { Button } from '@/shared/ui';

import { useOrderMedicineBarcodeScan } from '../model/useOrderMedicineBarcodeScan';

type Props = {
  disabled?: boolean;
  onUnavailableMedicine?: (medicine: BarcodeScanResult) => void;
};

export function OrderMedicineBarcodeScanner({
  disabled = false,
  onUnavailableMedicine,
}: Props) {
  const { t } = useTranslation('order-form', {
    keyPrefix: 'medicines.barcode',
  });
  const [open, setOpen] = useState(false);
  const { scanBarcode, isPending } = useOrderMedicineBarcodeScan({
    onUnavailableMedicine,
  });

  useKeyboardBarcodeScanner({
    enabled: !disabled && !isPending && !open,
    onScan: scanBarcode,
  });

  const handleScan = useCallback(
    (barcode: string) => {
      setOpen(false);
      scanBarcode(barcode);
    },
    [scanBarcode],
  );

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="shrink-0 gap-2"
        disabled={disabled || isPending}
        onClick={() => setOpen(true)}
      >
        {isPending ? (
          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <ScanBarcode className="size-4" aria-hidden="true" />
        )}
        {isPending ? t('scanning') : t('action')}
      </Button>

      <BarcodeScanner
        open={open}
        onOpenChange={setOpen}
        onScan={handleScan}
      />
    </>
  );
}
