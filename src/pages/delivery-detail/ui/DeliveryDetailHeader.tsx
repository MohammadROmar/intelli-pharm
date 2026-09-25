import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';
import { Truck } from 'lucide-react';

import {
  ChangeDeliveryStatusForm,
  ChangeDeliveryStatusSheet,
  toPayload,
  useChangeDeliveryStatus,
} from '@/features/delivery-change-status';
import {
  DeliveryStatusBadge,
  type ChangeDeliveryStatusValues,
  type DeliveryDetail,
} from '@/entities/delivery';

type Props = { delivery: DeliveryDetail; canUpdate: boolean };

export function DeliveryDetailHeader({ delivery, canUpdate }: Props) {
  const { t } = useTranslation('delivery-detail', { keyPrefix: 'detail' });
  const deliveryCode = `DEL-${String(delivery.id).padStart(6, '0')}`;

  return (
    <>
      <title>{`${deliveryCode} · ${t('pageTitle')} - IntelliPharm`}</title>

      <header className="bg-card relative overflow-hidden rounded-2xl border p-5 shadow-sm sm:p-6">
        <div
          className="bg-primary/5 pointer-events-none absolute -end-12 -top-16 size-40 rounded-full"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="bg-primary/10 text-primary hidden size-12 shrink-0 items-center justify-center rounded-xl border sm:flex">
              <Truck className="size-6" />
            </div>

            <div className="min-w-0 space-y-3">
              <div>
                <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-[0.16em] uppercase">
                  {t('recordLabel')}
                </p>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {deliveryCode}
                </h1>
                <p className="text-muted-foreground mt-1 text-sm">
                  {t('orderContext', { orderId: delivery.order_id })}
                </p>
              </div>

              <DeliveryStatusBadge status={delivery.status} />
            </div>
          </div>

          {canUpdate && <ChangeDeliveryStatus delivery={delivery} />}
        </div>
      </header>
    </>
  );
}

function ChangeDeliveryStatus({ delivery }: Omit<Props, 'canUpdate'>) {
  const [searchParams] = useSearchParams();
  const [formKey, setFormKey] = useState(0);
  const [open, setOpen] = useState(
    () => searchParams.get('focus') === 'change-status',
  );
  const { mutate, isPending } = useChangeDeliveryStatus();

  const defaultValues = useMemo<ChangeDeliveryStatusValues>(
    () => ({
      status: delivery.status,
      check_notes: '',
      receiver_name: '',
      payment_amount: '',
    }),
    [delivery.status],
  );

  const handleReset = useCallback(() => {
    setFormKey((previousKey) => previousKey + 1);
  }, []);

  const handleSuccess = useCallback(() => {
    setOpen(false);
    handleReset();
  }, [handleReset]);

  const handleSubmit = useCallback(
    (values: ChangeDeliveryStatusValues) => {
      mutate(
        { id: delivery.id, payload: toPayload(values) },
        { onSuccess: handleSuccess },
      );
    },
    [delivery.id, handleSuccess, mutate],
  );

  return (
    <ChangeDeliveryStatusSheet
      open={open}
      setOpen={setOpen}
      currentStatus={delivery.status}
    >
      <ChangeDeliveryStatusForm
        key={formKey}
        isPending={isPending}
        onSubmit={handleSubmit}
        onReset={handleReset}
        defaultValues={defaultValues}
      />
    </ChangeDeliveryStatusSheet>
  );
}
