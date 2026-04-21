import { useTranslation } from 'react-i18next';
import { Banknote } from 'lucide-react';

import type { DeliveryDetail } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import { DetailCard, Separator } from '@/shared/ui';

type Props = { delivery: DeliveryDetail };

export function FinancialSummary({ delivery }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  return (
    <DetailCard
      title={t('sections.financial')}
      subtitle={t('sections.financialSubtitle')}
      icon={Banknote}
    >
      <div className="bg-primary/5 border-primary/15 rounded-xl border px-4 py-5 text-center">
        <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-widest uppercase">
          {t('fields.totalPrice')}
        </p>
        <p className="text-primary max-w-full text-[clamp(1.25rem,3vw,1.875rem)] leading-tight font-bold wrap-anywhere whitespace-normal tabular-nums">
          {formatPrice(delivery.required_payment_amount, i18n.language)}
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
          {t('fields.numberOfItems')}
        </span>
        <span className="text-sm font-semibold">
          {delivery.number_of_items}
        </span>
      </div>
    </DetailCard>
  );
}
