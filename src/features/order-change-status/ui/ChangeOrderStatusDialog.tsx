import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw } from 'lucide-react';

import { type OrderStatus } from '@/entities/order';
import { Button, Dialog, DialogContent } from '@/shared/ui';
import { SelectionStep } from './SelectionStep';
import { ConfirmationStep } from './ConfirmationStep';

const TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['processing', 'completed', 'cancelled'],
  processing: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

type ChangeOrderStatusDialogProps = {
  currentStatus: OrderStatus;
  onSubmit: (status: OrderStatus) => Promise<unknown>;
  isPending?: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function ChangeOrderStatusDialog({
  currentStatus,
  onSubmit,
  isPending = false,
  isOpen,
  setIsOpen,
}: ChangeOrderStatusDialogProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'ordersPage.changeStatus',
  });

  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null,
  );

  const nextStatuses = TRANSITIONS[currentStatus] || [];
  const hasTransitions = nextStatuses.length > 0;

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isPending) return;

      setIsOpen(open);

      if (!open) {
        setTimeout(() => {
          setStep('select');
          setSelectedStatus(null);
        }, 300);
      }
    },
    [isPending, setIsOpen],
  );

  async function handleConfirm() {
    if (!selectedStatus) return;
    try {
      await onSubmit(selectedStatus);
      handleOpenChange(false);
    } catch {
      setStep('select');
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleOpenChange(true)}
        disabled={!hasTransitions}
        className="bg-card! shrink-0 gap-1.5"
      >
        <RefreshCw className="size-4" />
        {t('trigger')}
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          {step === 'select' ? (
            <SelectionStep
              currentStatus={currentStatus}
              nextStatuses={nextStatuses}
              selectedStatus={selectedStatus}
              onSelect={setSelectedStatus}
              onCancel={() => handleOpenChange(false)}
              onNext={() => setStep('confirm')}
            />
          ) : (
            selectedStatus && (
              <ConfirmationStep
                currentStatus={currentStatus}
                selectedStatus={selectedStatus}
                isPending={isPending}
                onBack={() => setStep('select')}
                onConfirm={handleConfirm}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
