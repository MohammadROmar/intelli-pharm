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
  const { t } = useTranslation('orders', { keyPrefix: 'changeStatus' });

  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
    null,
  );

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (isPending) return;
      if (open) {
        setStep('select');
        setSelectedStatus(null);
      }
      setIsOpen(open);
    },
    [isPending, setIsOpen],
  );

  const handleConfirm = useCallback(async () => {
    if (!selectedStatus) return;
    try {
      await onSubmit(selectedStatus);
      handleOpenChange(false);
    } catch {
      setStep('select');
    }
  }, [handleOpenChange, onSubmit, selectedStatus]);

  const handleSelect = useCallback((status: OrderStatus) => {
    setSelectedStatus(status);
  }, []);

  const handleCancel = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  const handleNext = useCallback(() => setStep('confirm'), []);
  const handleBack = useCallback(() => setStep('select'), []);
  const handleTrigger = useCallback(
    () => handleOpenChange(true),
    [handleOpenChange],
  );

  return (
    <>
      <Button
        variant="default"
        size="sm"
        onClick={handleTrigger}
        className="h-10! min-w-40! gap-2! px-4! shadow-sm"
      >
        <ClipboardEdit className="size-4" aria-hidden="true" />
        {t('trigger')}
      </Button>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="thin-scrollbar max-h-dvh! gap-0! overflow-y-auto! p-0! sm:max-w-md!"
          onOpenAutoFocus={(event) => event.preventDefault()}
        >
          <div className="space-y-5 p-5">
            {step === 'select' ? (
              <SelectionStep
                currentStatus={currentStatus}
                selectedStatus={selectedStatus}
                onSelect={handleSelect}
                onCancel={handleCancel}
                onNext={handleNext}
              />
            ) : selectedStatus ? (
              <ConfirmationStep
                currentStatus={currentStatus}
                selectedStatus={selectedStatus}
                isPending={isPending}
                onBack={handleBack}
                onConfirm={handleConfirm}
              />
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
