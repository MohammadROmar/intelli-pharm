import { useTranslation } from 'react-i18next';
import { CheckCircle2, ClipboardCheck, User } from 'lucide-react';

import type { DeliveryConfirmation } from '@/entities/delivery';
import { cn, formatPrice } from '@/shared/lib';
import { DetailCard, DetailCell, SplitDateTime } from '@/shared/ui';

type Props = { confirmations: DeliveryConfirmation[] };

export function Confirmations({ confirmations }: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.detail',
  });

  if (confirmations.length === 0) return null;

  const total = confirmations.length;

  return (
    <DetailCard
      title={t('sections.confirmation')}
      subtitle={t('sections.confirmationSubtitle')}
      icon={ClipboardCheck}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {confirmations.map((confirmation, index) => {
          const notLastIn1Col = index < total - 1;

          const lastRowStart2Cols = Math.floor((total - 1) / 2) * 2;
          const notLastIn2Cols = index < lastRowStart2Cols;

          return (
            <div
              key={confirmation.id}
              className={cn(
                'space-y-4',
                notLastIn1Col && 'mb-5 border-b pb-5',
                'md:mb-0 md:border-b-0 md:pb-0',
                notLastIn2Cols && 'md:mb-5 md:border-b! md:pb-5',
              )}
            >
              <DetailCell label={t('fields.receiverName')}>
                <span className="inline-flex items-center gap-1.5">
                  <User className="text-muted-foreground size-3.5 shrink-0" />
                  {confirmation.receiver_name}
                </span>
              </DetailCell>

              <DetailCell label={t('fields.paymentCollected')}>
                <span className="tabular-nums">
                  {formatPrice(confirmation.payment_amount, i18n.language)}
                </span>
              </DetailCell>

              <DetailCell label={t('fields.confirmedAt')}>
                <SplitDateTime
                  date={confirmation.created_at}
                  icon={CheckCircle2}
                />
              </DetailCell>

              {confirmation.check_notes && (
                <DetailCell label={t('fields.checkNotes')}>
                  <p className="text-sm leading-relaxed font-medium">
                    {confirmation.check_notes}
                  </p>
                </DetailCell>
              )}
            </div>
          );
        })}
      </div>
    </DetailCard>
  );
}
