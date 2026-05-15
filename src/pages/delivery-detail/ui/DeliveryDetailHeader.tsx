import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  ChangeDeliveryStatusSheet,
  useChangeDeliveryStatus,
  ChangeDeliveryStatusForm,
  toPayload,
} from '@/features/delivery-change-status';
import {
  DeliveryStatusBadge,
  DeliveryPaymentStatusBadge,
  type DeliveryDetail,
  type ChangeDeliveryStatusValues,
} from '@/entities/delivery';

type Props = { delivery: DeliveryDetail };

export function DeliveryDetailHeader({ delivery }: Props) {
  const { t } = useTranslation('deliveries', {
    keyPrefix: 'detail',
  });

  const pageTitle = `#${delivery.id} · ${t('pageTitle')} - IntelliPharma`;

  return (
    <>
      <title>{pageTitle}</title>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2.5">
          <h1 className="text-2xl font-bold tracking-tight">
            {t('deliveryNo', { id: delivery.id })}
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                {t('fields.status')}
              </span>
              <DeliveryStatusBadge status={delivery.status} />
            </div>

            <div className="bg-border h-4 w-px shrink-0" />

            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                {t('fields.paymentStatus')}
              </span>
              <DeliveryPaymentStatusBadge status={delivery.payment_status} />
            </div>
          </div>
        </div>

        <ChangeDeliveryStatus delivery={delivery} />
      </div>
    </>
  );
}

function ChangeDeliveryStatus({ delivery }: Props) {
  const [searchParams] = useSearchParams();
  const [formKey, setFormKey] = useState(0);
  const [open, setOpen] = useState(
    () => searchParams.get('focus') === 'change-status',
  );
  const { mutate, isPending } = useChangeDeliveryStatus();

  function handleSuccess() {
    setOpen(false);
    setFormKey((prev) => prev + 1);
  }

  function handleSubmit(data: ChangeDeliveryStatusValues) {
    const payload = toPayload(data);
    mutate({ id: delivery.id, payload }, { onSuccess: handleSuccess });
  }

  return (
    <ChangeDeliveryStatusSheet
      open={open}
      setOpen={setOpen}
      currentStatus={delivery.status}
      currentPaymentStatus={delivery.payment_status}
    >
      <ChangeDeliveryStatusForm
        key={formKey}
        isPending={isPending}
        onSubmit={handleSubmit}
        onReset={() => setFormKey((prev) => prev + 1)}
        defaultValues={{
          status: delivery.status,
          payment_status: delivery.payment_status,
        }}
      />
    </ChangeDeliveryStatusSheet>
  );
}
