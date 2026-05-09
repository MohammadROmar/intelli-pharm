import { useTranslation } from 'react-i18next';
import { Gift, Package } from 'lucide-react';

import type { MedicineDetail } from '@/entities/medicine';
import { getLocalized } from '@/shared/lib';
import { DetailCard, DetailCell } from '@/shared/ui';

type Props = { medicine: MedicineDetail };

export function GiftCard({ medicine }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'medicinesPage.detail',
  });

  const { gift } = medicine;

  const name = getLocalized(medicine.commercial_name, i18n.language);

  return (
    <DetailCard
      title={t('giftTitle')}
      subtitle={t('giftSubtitle')}
      icon={Gift}
      className="lg:col-span-2"
    >
      <>
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelRequiredQty')}>
            <div className="flex items-center gap-1.5">
              <Package className="text-muted-foreground size-4 shrink-0" />
              <p>
                <span className="tabular-nums">
                  {gift.required_quantity.toLocaleString()}{' '}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {t('units')}
                </span>
              </p>
            </div>
          </DetailCell>
          <DetailCell label={t('labelGiftQty')}>
            <div className="flex items-center gap-1.5">
              <Gift className="text-primary size-4 shrink-0" />
              <p>
                <span className="text-primary font-semibold tabular-nums">
                  {gift.gift_quantity.toLocaleString()}{' '}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {t('units')}
                </span>
              </p>
            </div>
          </DetailCell>
        </div>

        <div className="bg-primary/5 border-primary/20 flex items-center gap-2 rounded-lg border px-4 py-2.5">
          <Gift className="text-primary size-4 shrink-0" />
          <p className="text-foreground text-sm">
            {t('dealSummary', {
              required: gift.required_quantity,
              gift: gift.gift_quantity,
              medicine: name,
            })}
          </p>
        </div>
      </>
    </DetailCard>
  );
}
