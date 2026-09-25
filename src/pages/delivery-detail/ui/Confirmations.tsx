import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  ImageOff,
  ReceiptText,
  User,
} from 'lucide-react';

import type { DeliveryConfirmation } from '@/entities/delivery';
import { formatPrice } from '@/shared/lib';
import { DetailCard, DetailCell, Separator, SplitDateTime } from '@/shared/ui';

type Props = { confirmations: DeliveryConfirmation[] };

export function Confirmations({ confirmations }: Props) {
  const { t, i18n } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });

  return (
    <DetailCard
      title={t('sections.confirmation')}
      subtitle={t('sections.confirmationSubtitle')}
      icon={ClipboardCheck}
      itemsCount={confirmations.length || undefined}
    >
      {confirmations.length === 0 ? (
        <div className="bg-muted/30 flex flex-col items-center rounded-xl border border-dashed px-5 py-8 text-center">
          <ImageOff className="text-muted-foreground mb-3 size-7" />
          <p className="font-semibold">{t('confirmation.noConfirmations')}</p>
          <p className="text-muted-foreground mt-1 max-w-60 text-sm leading-relaxed">
            {t('confirmation.noConfirmationsDescription')}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {confirmations.map((confirmation, index) => (
            <DeliveryConfirmationCard
              key={confirmation.id}
              confirmation={confirmation}
              index={index}
              isLast={index === confirmations.length - 1}
              language={i18n.language}
            />
          ))}
        </div>
      )}
    </DetailCard>
  );
}

type ConfirmationCardProps = {
  confirmation: DeliveryConfirmation;
  index: number;
  isLast: boolean;
  language: string;
};

function DeliveryConfirmationCard({
  confirmation,
  index,
  isLast,
  language,
}: ConfirmationCardProps) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail',
  });
  const confirmationCode = `CNF-${String(confirmation.id).padStart(6, '0')}`;

  return (
    <article className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg">
            <ReceiptText className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold">
              {t('confirmation.record', { number: index + 1 })}
            </p>
            <p className="text-muted-foreground text-xs tabular-nums">
              {confirmationCode}
            </p>
          </div>
        </div>
      </div>

      <DeliveryProof confirmation={confirmation} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
        <DetailCell label={t('fields.receiverName')}>
          <span className="inline-flex items-center gap-1.5 font-medium">
            <User className="text-muted-foreground size-3.5 shrink-0" />
            {confirmation.receiver_name}
          </span>
        </DetailCell>

        <DetailCell label={t('fields.paymentCollected')}>
          <span className="font-semibold tabular-nums">
            {formatPrice(confirmation.payment_amount, language)}
          </span>
        </DetailCell>

        <DetailCell label={t('fields.confirmedAt')}>
          <SplitDateTime date={confirmation.created_at} icon={CheckCircle2} />
        </DetailCell>

        {confirmation.check_notes ? (
          <DetailCell label={t('fields.checkNotes')}>
            <p className="text-sm leading-relaxed">
              {confirmation.check_notes}
            </p>
          </DetailCell>
        ) : null}
      </div>

      {isLast ? null : <Separator />}
    </article>
  );
}

function DeliveryProof({
  confirmation,
}: {
  confirmation: DeliveryConfirmation;
}) {
  const { t } = useTranslation('delivery-detail', {
    keyPrefix: 'detail.confirmation',
  });

  if (!confirmation.receipt_image) {
    return (
      <div className="bg-muted/30 flex aspect-16/10 items-center justify-center rounded-xl border border-dashed text-center">
        <div className="space-y-2 px-4">
          <ImageOff className="text-muted-foreground mx-auto size-6" />
          <p className="text-muted-foreground text-sm font-medium">
            {t('noProof')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={confirmation.receipt_image}
      target="_blank"
      rel="noreferrer"
      className="group bg-muted focus-visible:ring-ring relative block aspect-16/10 overflow-hidden rounded-xl border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <img
        src={confirmation.receipt_image}
        alt={t('proofAlt', { receiver: confirmation.receiver_name })}
        className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
        loading="lazy"
        decoding="async"
      />
      <span className="bg-background/90 absolute inset-x-2 bottom-2 flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold shadow-sm backdrop-blur-sm">
        <ExternalLink className="size-3.5" aria-hidden="true" />
        {t('openProof')}
      </span>
    </a>
  );
}
