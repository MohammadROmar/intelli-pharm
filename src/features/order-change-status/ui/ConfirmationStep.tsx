import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  ArrowRight,
  Loader2,
  ClipboardEdit,
} from 'lucide-react';

import { STATUS_META } from '../lib/utils';
import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import {
  Button,
  CardSectionHeader,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

type ConfirmationStepProps = {
  currentStatus: OrderStatus;
  selectedStatus: OrderStatus;
  isPending: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export function ConfirmationStep({
  currentStatus,
  selectedStatus,
  isPending,
  onBack,
  onConfirm,
}: ConfirmationStepProps) {
  const { t } = useTranslation('orders');

  const isDestructive = STATUS_META[selectedStatus]?.destructive;

  const title = t('changeStatus.confirmTitle');
  const description = t(
    isDestructive
      ? 'changeStatus.confirmDestructiveMessage'
      : 'changeStatus.confirmMessage',
    {
      status: t(`status.${selectedStatus}`),
    },
  );

  return (
    <>
      <DialogHeader>
        <CardSectionHeader
          title={title}
          description={description}
          icon={isDestructive ? AlertTriangle : ClipboardEdit}
          aria-hidden
          iconClassName={
            isDestructive ? 'bg-destructive/10! text-destructive!' : undefined
          }
        />

        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
      </DialogHeader>

      <div className="bg-muted/70 flex items-center justify-center gap-4 rounded-lg py-6">
        <OrderStatusBadge status={currentStatus} />
        <ArrowRight className="text-muted-foreground size-5 shrink-0 rtl:rotate-180" />
        <OrderStatusBadge status={selectedStatus} />
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onBack} disabled={isPending}>
          {t('changeStatus.back')}
        </Button>
        <Button
          variant={isDestructive ? 'destructive' : 'default'}
          onClick={onConfirm}
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              {t('changeStatus.confirming')}
            </span>
          ) : (
            t('changeStatus.confirm')
          )}
        </Button>
      </DialogFooter>
    </>
  );
}
