import { useTranslation } from 'react-i18next';

import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui';

type TerminalStateViewProps = {
  currentStatus: OrderStatus;
  onClose: () => void;
};

export function TerminalStateView({
  currentStatus,
  onClose,
}: TerminalStateViewProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ordersPage.changeStatus.terminal',
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription>{t('subtitle')}</DialogDescription>
      </DialogHeader>

      <div className="bg-muted/40 flex w-full items-center justify-between gap-2 rounded-lg px-4 py-3">
        <span className="text-muted-foreground text-sm font-medium">
          {t('currentStatus')}
        </span>
        <OrderStatusBadge status={currentStatus} />
      </div>

      <DialogFooter className="sm:justify-center">
        <Button
          variant="default"
          onClick={onClose}
          className="w-full sm:w-auto"
        >
          {t('close', 'Close')}
        </Button>
      </DialogFooter>
    </>
  );
}
