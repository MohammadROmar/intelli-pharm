import { useTranslation } from 'react-i18next';
import {
  Cross,
  CalendarCheck,
  CalendarDays,
  Info,
  MapPin,
  ReceiptText,
  RefreshCw,
} from 'lucide-react';

import type { DebtDetail } from '@/entities/debt';
import { formatDate, formatPrice } from '@/shared/lib';
import {
  BadgeLink,
  DetailCard,
  DetailCell,
  Separator,
  SplitDateTime,
} from '@/shared/ui';

type Props = {
  debt: DebtDetail;
  canViewPharmacy: boolean;
};

export function DebtContextCard({ debt, canViewPharmacy }: Props) {
  const { t, i18n } = useTranslation('debt-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.context')}
      subtitle={t('sections.contextSubtitle')}
      icon={Info}
    >
      <DetailCell label={t('fields.pharmacy')}>
        <BadgeLink
          to={
            canViewPharmacy
              ? `/dashboard/pharmacies/${debt.pharmacy_id}`
              : undefined
          }
          label={debt.pharmacy_name}
          icon={Cross}
        />
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.region')}>
        <span className="inline-flex items-center gap-2 font-medium">
          <MapPin className="text-muted-foreground size-4" aria-hidden="true" />
          {debt.region_name}
        </span>
      </DetailCell>

      <Separator />

      <DetailCell label={t('fields.lastPayment')}>
        {debt.last_payment ? (
          <div className="space-y-1.5">
            <p className="font-semibold tabular-nums">
              {formatPrice(String(debt.last_payment.amount), i18n.language)}
            </p>
            <p className="text-muted-foreground inline-flex items-center gap-1.5 text-xs">
              <CalendarCheck className="size-3.5" aria-hidden="true" />
              {formatDate(debt.last_payment.payment_date, i18n.language)}
            </p>
          </div>
        ) : (
          <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
            <ReceiptText className="size-4" aria-hidden="true" />
            {t('fields.noPayments')}
          </span>
        )}
      </DetailCell>

      <Separator />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-1">
        <DetailCell label={t('fields.createdAt')} className="min-w-0">
          <SplitDateTime date={debt.created_at} icon={CalendarDays} />
        </DetailCell>
        <DetailCell label={t('fields.updatedAt')} className="min-w-0">
          <SplitDateTime date={debt.updated_at} icon={RefreshCw} />
        </DetailCell>
      </div>
    </DetailCard>
  );
}
