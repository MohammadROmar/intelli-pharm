import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { PackageSearch, ScanBarcode } from 'lucide-react';

import { UsbHint } from '@/shared/barcode';

type BarcodeNotFoundProps = {
  barcode: string;
};

export function BarcodeNotFound({ barcode }: BarcodeNotFoundProps) {
  const { t } = useTranslation('medicines', {
    keyPrefix: 'scan',
  });

  return (
    <div className="grid h-full">
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <div className="bg-muted text-muted-foreground mb-6 flex size-16 items-center justify-center rounded-2xl">
          <PackageSearch className="size-8" aria-hidden />
        </div>

        <h2 className="text-foreground mb-2 text-xl font-semibold">
          {t('notFoundTitle')}
        </h2>

        <p className="text-muted-foreground mb-2 text-sm leading-relaxed">
          {t('notFoundMessage')}
        </p>

        {barcode && (
          <p className="text-muted-foreground mb-8 font-mono text-xs">
            {barcode}
          </p>
        )}

        <Link
          to="/dashboard/medicines/scan"
          className="flex items-center gap-2"
        >
          <ScanBarcode className="size-4" aria-hidden />
          {t('scanAgain')}
        </Link>

        <div className="mt-8 w-full max-w-sm">
          <UsbHint />
        </div>
      </div>
    </div>
  );
}
