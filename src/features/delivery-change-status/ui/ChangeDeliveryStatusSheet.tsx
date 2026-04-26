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
  disabled?: boolean;
}>;

export function ChangeDeliveryStatusSheet({
  open,
  setOpen,
  currentStatus,
  currentPaymentStatus,
  disabled,
  children,
}: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'deliveriesPage.changeStatus',
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="gap-2"
        >
          <ClipboardCheck className="size-4" />
          {t('trigger')}
        </Button>
      </SheetTrigger>

      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('subtitle')}
              icon={ClipboardCheck}
            />
          </div>
        </SheetHeader>

        <div className="thin-scrollbar space-y-4 p-4 pt-0">
          <div className="bg-muted/75 space-y-2 rounded-lg px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                {t('currentStatus')}
              </span>
              <DeliveryStatusBadge status={currentStatus} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground text-xs">
                {t('currentPaymentStatus')}
              </span>
              <DeliveryPaymentStatusBadge status={currentPaymentStatus} />
            </div>
          </div>

          <div className="grid flex-1 overflow-y-auto">{children}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
