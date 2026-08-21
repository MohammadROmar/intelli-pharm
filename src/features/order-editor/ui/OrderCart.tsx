import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, LoaderCircle, PackageCheck, ShoppingBasket } from 'lucide-react';

import { formatPrice } from '@/shared/lib';
import { Button, Separator } from '@/shared/ui';

import type { OrderCartItem as CartItem } from '../model/orderEditorTypes';
import { OrderCartItem } from './OrderCartItem';

type Props = {
  items: CartItem[];
  isPending: boolean;
  onBack: () => void;
  onSubmit: () => void;
  onQuantityChange: (medicineId: number, quantity: number) => void;
  onRemove: (medicineId: number) => void;
};

export function OrderCart({
  items,
  isPending,
  onBack,
  onSubmit,
  onQuantityChange,
  onRemove,
}: Props) {
  const { t, i18n } = useTranslation('order-form', { keyPrefix: 'cart' });
  const summary = useMemo(
    () =>
      items.reduce(
        (result, item) => ({
          units: result.units + item.quantity,
          subtotal: result.subtotal + Number(item.price) * item.quantity,
        }),
        { units: 0, subtotal: 0 },
      ),
    [items],
  );

  return (
    <div className="flex min-h-0 flex-col">
      <div className="flex items-start gap-3">
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          <ShoppingBasket className="size-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-semibold">{t('title')}</h2>
          <p className="text-muted-foreground text-xs">
            {t('summary', { medicines: items.length, units: summary.units })}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      {items.length === 0 ? (
        <div className="bg-muted/20 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed p-5 text-center">
          <ShoppingBasket
            className="text-muted-foreground size-7"
            aria-hidden="true"
          />
          <h3 className="mt-2 text-sm font-semibold">{t('emptyTitle')}</h3>
          <p className="text-muted-foreground mt-1 text-xs">
            {t('emptyDescription')}
          </p>
        </div>
      ) : (
        <div className="max-h-[min(48vh,32rem)] space-y-2.5 overflow-y-auto pe-1">
          {items.map((item) => (
            <OrderCartItem
              key={item.medicineId}
              item={item}
              disabled={isPending}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}

      <div className="mt-4 space-y-3 border-t pt-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground text-sm">
            {t('estimatedSubtotal')}
          </span>
          <span className="font-bold tabular-nums">
            {formatPrice(summary.subtotal, i18n.language)}
          </span>
        </div>
        <p className="text-muted-foreground text-xs">{t('priceHint')}</p>

        <Button
          type="button"
          className="w-full gap-2"
          disabled={isPending || items.length === 0}
          onClick={onSubmit}
        >
          {isPending ? (
            <LoaderCircle
              className="size-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            <PackageCheck className="size-4" aria-hidden="true" />
          )}
          {isPending ? t('submitting') : t('submit')}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full gap-2"
          disabled={isPending}
          onClick={onBack}
        >
          <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
          {t('back')}
        </Button>
      </div>
    </div>
  );
}
