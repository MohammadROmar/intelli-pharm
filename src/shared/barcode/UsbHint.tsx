import { useTranslation } from 'react-i18next';
import { ScanBarcode } from 'lucide-react';

export function UsbHint() {
  const { t } = useTranslation('common', { keyPrefix: 'barcode' });

  return (
    <div className="border-primary flex items-start gap-3 rounded-lg border border-dashed px-4 py-3">
      <ScanBarcode className="text-muted-foreground mt-0.5 size-4 shrink-0" />
      <p className="text-muted-foreground text-xs leading-relaxed">
        {t('usbHint')}
      </p>
    </div>
  );
}
