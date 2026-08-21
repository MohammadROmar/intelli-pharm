import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoppingBasket } from 'lucide-react';

import {
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/shared/ui';

import type { OrderCartItem } from '../model/orderEditorTypes';
import { OrderCart } from './OrderCart';

type Props = {
  open: boolean;
  items: OrderCartItem[];
  isPending: boolean;
  labels?: {
    back: string;
    submit: string;
    submitting: string;
  };
  onOpenChange: (open: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
  onQuantityChange: (medicineId: number, quantity: number) => void;
  onRemove: (medicineId: number) => void;
};

export function OrderCartSheet({
  open,
  items,
  isPending,
  labels,
  onOpenChange,
  onBack,
  onSubmit,
  onQuantityChange,
  onRemove,
}: Props) {
  const { t, i18n } = useTranslation('order-form', { keyPrefix: 'cart' });
  const isRtl = i18n.dir() === 'rtl';
  const summary = useMemo(
    () => ({
      medicines: items.length,
      units: items.reduce((total, item) => total + item.quantity, 0),
    }),
    [items],
  );
  const summaryLabel = t('summary', summary);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="w-full sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {summaryLabel}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={summaryLabel}
            icon={ShoppingBasket}
            aria-hidden
          />
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 pt-0">
          <OrderCart
            items={items}
            isPending={isPending}
            showHeader={false}
            labels={labels}
            onBack={onBack}
            onSubmit={onSubmit}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
