import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardCheck } from 'lucide-react';

import {
  DeliveryPaymentStatusBadge,
  DeliveryStatusBadge,
  type DeliveryStatus,
  type PaymentStatus,
} from '@/entities/delivery';
import {
  Button,
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';

type Props = PropsWithChildren<{
  open: boolean;
  setOpen: (open: boolean) => void;
  currentStatus: DeliveryStatus;
  currentPaymentStatus: PaymentStatus;
}>;

export function ChangeDeliveryStatusSheet({
  open,
  setOpen,
  currentStatus,
  currentPaymentStatus,
  children,
}: Props) {
  const { t, i18n } = useTranslation('deliveries', {
    keyPrefix: 'changeStatus',
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="h-10! min-w-40! gap-2! px-4! shadow-sm"
        >
          <ClipboardCheck className="size-4" />
          {t('trigger')}
        </Button>
      </SheetTrigger>

      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="w-full! gap-0! overflow-hidden! p-0! sm:max-w-md!"
      >
        <SheetHeader className="border-b p-5! pe-12!">
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle')}
            icon={ClipboardCheck}
            aria-hidden
          />
        </SheetHeader>

        <div className="thin-scrollbar min-h-0 flex-1 space-y-5 overflow-y-auto p-5">
          <div className="bg-muted/40 grid grid-cols-2 gap-3 rounded-xl border p-3">
            <div className="bg-background space-y-2 rounded-lg p-3">
              <span className="text-muted-foreground text-xs">
                {t('currentStatus')}
              </span>
              <DeliveryStatusBadge status={currentStatus} />
            </div>
            <div className="bg-background space-y-2 rounded-lg p-3">
              <span className="text-muted-foreground text-xs">
                {t('currentPaymentStatus')}
              </span>
              <DeliveryPaymentStatusBadge status={currentPaymentStatus} />
            </div>
          </div>

          <div>{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
