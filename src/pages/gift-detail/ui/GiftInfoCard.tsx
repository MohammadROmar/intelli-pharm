import { useTranslation } from 'react-i18next';
import { CalendarDays, Gift, Package, Pill, RefreshCw } from 'lucide-react';

import type { Gift as GiftType } from '@/entities/gift';
import {
  Badge,
  Separator,
  BadgeLink,
  DetailCard,
  DetailCell,
  SplitDateTime,
} from '@/shared/ui';

export function GiftInfoCard({ gift }: { gift: GiftType }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'giftsPage.detail',
  });

  return (
    <DetailCard title={t('cardTitle')} subtitle={t('cardSubtitle')} icon={Gift}>
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span className="font-mono">
            GFT-{String(gift.id).padStart(6, '0')}
          </span>
        </DetailCell>
        <DetailCell label={t('labelStatus')}>
          <Badge variant={gift.active ? 'success' : 'muted'}>
            {gift.active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelMedicine')}>
          <BadgeLink
            to={`/dashboard/medicines/${gift.medicine_id}`}
            label={gift.medicine.commercial_name.en}
            icon={Pill}
          />
        </DetailCell>
        <DetailCell label={t('labelMedicineId')}>
          <span className="font-mono text-sm">
            MED-{String(gift.medicine_id).padStart(6, '0')}
          </span>
        </DetailCell>
      </div>

      <Separator />

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
            medicine: gift.medicine.commercial_name.en,
          })}
        </p>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <SplitDateTime date={gift.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('labelUpdatedAt')}>
          <SplitDateTime date={gift.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
