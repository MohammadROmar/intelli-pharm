import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Ban, TriangleAlert } from 'lucide-react';

import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import {
  Button,
  CardSectionHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

const DESTRUCTIVE_LOADING_CLASSES =
  'disabled:button-shimmer disabled:[--skeleton-shine:color-mix(in_oklch,var(--destructive),white_45%)] disabled:[--skeleton:var(--destructive)]';

type Props = {
  orderId: number;
  currentStatus: OrderStatus;
  isOpen: boolean;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function CancelOrderDialog({
  orderId,
  currentStatus,
  isOpen,
  isPending,
  onOpenChange,
  onConfirm,
}: Props) {
  const { t } = useTranslation('orders', { keyPrefix: 'cancelOrder' });
  const orderCode = `ORD-${String(orderId).padStart(6, '0')}`;
  const handleTrigger = useCallback(() => onOpenChange(true), [onOpenChange]);
  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleTrigger}
        className="border-destructive/40! text-destructive! hover:bg-destructive/10! hover:text-destructive! h-10! min-w-40! gap-2! px-4! shadow-sm"
      >
        <Ban className="size-4" aria-hidden="true" />
        {t('trigger')}
      </Button>

      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent
          className="p-0! sm:max-w-md!"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <DialogHeader className="relative p-6! pb-0! text-start">
            <CardSectionHeader
              title={t('title', { order: orderCode })}
              description={t('description')}
              icon={TriangleAlert}
              iconClassName="bg-destructive/10! text-destructive!"
            />
            <DialogTitle className="sr-only">
              {t('title', { order: orderCode })}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {t('description')}
            </DialogDescription>
          </DialogHeader>

          <div className="mx-2 space-y-4 px-4">
            <div className="bg-muted/40 flex items-center justify-between gap-3 rounded-xl border p-4">
              <span className="text-muted-foreground text-sm font-medium">
                {t('currentStatus')}
              </span>
              <OrderStatusBadge status={currentStatus} />
            </div>

            <div className="border-destructive/20 bg-destructive/5 rounded-xl border p-4">
              <p className="text-destructive text-sm font-semibold">
                {t('warningTitle')}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {t('warningDescription')}
              </p>
            </div>
          </div>

          <DialogFooter className="flex-row justify-end! gap-2 p-6 pt-0">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
              className="min-h-11!"
            >
              {t('keepOrder')}
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              isLoading={isPending}
              disabled={isPending}
              className={`${DESTRUCTIVE_LOADING_CLASSES} min-h-11!`}
            >
              {t('confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
