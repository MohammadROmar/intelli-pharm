import { useTranslation } from 'react-i18next';
import { ScanBarcode } from 'lucide-react';

import Barcode from 'react-barcode';

import { DetailCard, DetailCell } from '@/shared/ui';

type Props = {
  barcode?: string | null;
};

export function MedicineBarcodeCard({ barcode }: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  return (
    <DetailCard
      title={t('barcodeCardTitle')}
      subtitle={t('barcodeCardSubtitle')}
      icon={ScanBarcode}
    >
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelBarcode')}>
          {barcode ? (
            <Barcode
              value={barcode}
              background="var(--card)"
              lineColor="currentColor"
              font="var(--font-cairo)"
            />
          ) : (
            <span>-</span>
          )}
        </DetailCell>
      </div>
    </DetailCard>
  );
}
