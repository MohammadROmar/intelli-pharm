import { useTranslation } from 'react-i18next';

import { StatusCard } from './StatusCard';
import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import {
  Button,
  CardSectionHeader,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Separator,
} from '@/shared/ui';
import { ClipboardEdit } from 'lucide-react';

type SelectionStepProps = {
  currentStatus: OrderStatus;
  selectedStatus: OrderStatus | null;
  onSelect: (status: OrderStatus) => void;
  onCancel: () => void;
  onNext: () => void;
};

const TRANSITIONS: OrderStatus[] = [
  'pending',
  'processing',
  'completed',
  'cancelled',
];

export function SelectionStep({
  currentStatus,
  selectedStatus,
  onSelect,
  onCancel,
  onNext,
}: SelectionStepProps) {
  const { t } = useTranslation('orders', { keyPrefix: 'changeStatus' });
  const availableStatuses = TRANSITIONS.filter(
    (status) => status !== currentStatus,
  );

  return (
    <>
      <DialogHeader>
        <CardSectionHeader
          title={t('title')}
          description={t('subtitle')}
          icon={ClipboardEdit}
          aria-hidden
        />

        <DialogTitle className="sr-only">{t('title')}</DialogTitle>
        <DialogDescription className="sr-only">
          {t('subtitle')}
        </DialogDescription>
      </DialogHeader>

      <div className="bg-muted/70 flex items-center justify-between gap-2 rounded-lg px-4 py-3">
        <span className="text-muted-foreground text-sm font-medium">
          {t('currentStatus')}
        </span>
        <OrderStatusBadge status={currentStatus} />
      </div>

      <Separator />

      <div className="space-y-3">
        {availableStatuses.map((status) => (
          <StatusCard
            key={status}
            status={status}
            selected={selectedStatus === status}
            onSelect={onSelect}
          />
        ))}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onCancel} className="min-h-11!">
          {t('cancel')}
        </Button>
        <Button
          disabled={!selectedStatus}
          onClick={onNext}
          className="min-h-11!"
        >
          {t('next')}
        </Button>
      </DialogFooter>
    </>
  );
}
