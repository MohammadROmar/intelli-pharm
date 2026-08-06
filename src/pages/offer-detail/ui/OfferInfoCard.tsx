import { useTranslation } from 'react-i18next';
import {
  BadgePercent,
  CalendarDays,
  Package,
  Pill,
  RefreshCw,
  Tag,
} from 'lucide-react';

import { OfferTypeBadge, type Offer } from '@/entities/offer';
import { formatPrice } from '@/shared/lib';
import {
  Badge,
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
  SplitDateTime,
} from '@/shared/ui';

type Props = { offer: Offer; canViewMedicine: boolean };

export function OfferInfoCard({ offer, canViewMedicine }: Props) {
  const { t, i18n } = useTranslation('offers', { keyPrefix: 'detail' });

  return (
    <DetailCard title={t('cardTitle')} subtitle={t('cardSubtitle')} icon={Tag}>
      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelId')}>
          <span className="font-mono">
            OFF-{String(offer.id).padStart(6, '0')}
          </span>
        </DetailCell>
        <DetailCell label={t('labelStatus')}>
          <Badge variant={offer.is_active ? 'success' : 'muted'}>
            {offer.is_active ? t('active') : t('inactive')}
          </Badge>
        </DetailCell>
      </div>

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelType')}>
          <OfferTypeBadge type={offer.type} />
        </DetailCell>
        <DetailCell label={t('labelRequiredAmount')}>
          <span className="font-semibold tabular-nums">
            {formatPrice(offer.required_amount, i18n.language)}
          </span>
        </DetailCell>
      </div>

      <Separator />

      {offer.type === 'percentage' ? (
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelPercentage')}>
            <span className="flex items-center gap-1.5 text-blue-500">
              <BadgePercent className="size-4 shrink-0" />
              <span className="text-foreground font-semibold tabular-nums">
                {offer.percentage}%
              </span>
            </span>
          </DetailCell>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <DetailCell label={t('labelMedicine')}>
            <BadgeLink
              to={
                canViewMedicine
                  ? `/dashboard/medicines/${offer.medicine.id}`
                  : undefined
              }
              label={offer.medicine.commercial_name}
              icon={Pill}
            />
          </DetailCell>
          <DetailCell label={t('labelGiftQuantity')}>
            <span className="flex items-center gap-1.5">
              <Package className="text-muted-foreground size-4 shrink-0" />
              <span className="tabular-nums">{offer.quantity}</span>
              <span className="text-muted-foreground text-xs font-normal">
                {t('units')}
              </span>
            </span>
          </DetailCell>
        </div>
      )}

      <Separator />

      <div className="grid grid-cols-2 gap-6">
        <DetailCell label={t('labelCreatedAt')}>
          <SplitDateTime date={offer.created_at} icon={CalendarDays} />
        </DetailCell>

        <DetailCell label={t('labelUpdatedAt')}>
          <SplitDateTime date={offer.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
