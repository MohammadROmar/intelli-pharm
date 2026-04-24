import { useTranslation } from 'react-i18next';

import { StatusCard } from './StatusCard';
import { TerminalStateView } from './TerminalStateView';
import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@/shared/ui';

type SelectionStepProps = {
  currentStatus: OrderStatus;
  nextStatuses: OrderStatus[];
  selectedStatus: OrderStatus | null;
  onSelect: (status: OrderStatus) => void;
  onCancel: () => void;
  onNext: () => void;
};

export function SelectionStep({
  currentStatus,
  nextStatuses,
  selectedStatus,
  onSelect,
  onCancel,
  onNext,
}: SelectionStepProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ordersPage.changeStatus',
  });

  if (!nextStatuses || nextStatuses.length === 0) {
    return (
      <TerminalStateView currentStatus={currentStatus} onClose={onCancel} />
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('subtitle')}</DialogDescription>
      </DialogHeader>

      <div className="bg-muted/40 flex items-center justify-between gap-2 rounded-lg px-4 py-3">
        <span className="text-muted-foreground text-sm font-medium">
          {t('currentStatus')}
        </span>
        <OrderStatusBadge status={currentStatus} />
      </div>

      <Separator />

      <div className="space-y-3">
        {nextStatuses.map((status) => (
          <StatusCard
            key={status}
            status={status}
            selected={selectedStatus === status}
            onSelect={() => onSelect(status)}
          />
        ))}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button disabled={!selectedStatus} onClick={onNext}>
          {t('next')}
        </Button>
      </DialogFooter>
    </>
  );
}
