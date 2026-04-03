import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScanBarcode } from 'lucide-react';

import { UsbHint } from './UsbHint';
import { BarcodeScannerView } from './BarcodeScannerView';
import { useKeyboardBarcodeScanner } from './useKeyboardBarcodeScanner';
import {
  Badge,
  Button,
  Separator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  CardSectionHeader,
} from '../ui';

function ScannedValuePreview({ value }: { value: string }) {
  const { t } = useTranslation('translation', { keyPrefix: 'barcode' });

  return (
    <div className="bg-muted/40 flex items-center justify-between gap-3 rounded-lg px-4 py-3">
      <div className="space-y-0.5">
        <p className="text-muted-foreground text-xs">{t('lastScanned')}</p>
        <p className="font-mono text-sm font-medium">{value}</p>
      </div>
      <Badge variant="secondary" className="shrink-0">
        {t('detected')}
      </Badge>
    </div>
  );
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScan: (barcode: string) => void;
};

export function BarcodeScanner({ open, onOpenChange, onScan }: Props) {
  const { t } = useTranslation('translation', { keyPrefix: 'barcode' });

  const [lastScanned, setLastScanned] = useState<string | null>(null);

  function handleScan(barcode: string) {
    setLastScanned(barcode);
    onScan(barcode);
  }

  function handleOpenChange(next: boolean) {
    if (!next) setLastScanned(null);
    onOpenChange(next);
  }

  useKeyboardBarcodeScanner({ enabled: open, onScan: handleScan });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('subtitle')}
              icon={ScanBarcode}
            />
          </div>
          <DialogTitle className="sr-only flex items-center gap-2">
            <ScanBarcode className="size-4" />
            {t('title')}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {t('subtitle')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <BarcodeScannerView onScan={handleScan} />
          {lastScanned && <ScannedValuePreview value={lastScanned} />}
          <Separator />
          <UsbHint />
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t('done')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
