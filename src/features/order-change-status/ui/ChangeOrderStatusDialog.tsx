import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardEdit } from 'lucide-react';

import { SelectionStep } from './SelectionStep';
import { ConfirmationStep } from './ConfirmationStep';
import { type OrderStatus } from '@/entities/order';
import { Button, Dialog, DialogContent } from '@/shared/ui';

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
  const { t } = useTranslation('orders');

  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null,
  );

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
        className="bg-card! gap-1.5"
      >
        <ClipboardEdit className="size-4" />
        {t('changeStatus.trigger')}
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="thin-scrollbar max-h-svh sm:max-w-md">
          <div tabIndex={0} aria-hidden className="sr-only" />

          {step === 'select' ? (
            <SelectionStep
              currentStatus={currentStatus}
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
