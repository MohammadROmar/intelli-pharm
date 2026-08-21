import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Pill, Plus, Trash2 } from 'lucide-react';

import { formatPrice } from '@/shared/lib';
import { Button, Input } from '@/shared/ui';

import type { OrderCartItem as CartItem } from '../model/orderEditorTypes';

type Props = {
  item: CartItem;
  disabled: boolean;
  onQuantityChange: (medicineId: number, quantity: number) => void;
  onRemove: (medicineId: number) => void;
};

function OrderCartItemImpl({
  item,
  disabled,
  onQuantityChange,
  onRemove,
}: Props) {
  const { t, i18n } = useTranslation('order-form', { keyPrefix: 'cart.item' });

  return (
    <article className="rounded-xl border p-3">
      <div className="flex min-w-0 gap-3">
        <div className="bg-muted flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
          {item.image ? (
            <img
              src={item.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <Pill
              className="text-muted-foreground size-5"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">
                {item.commercialName}
              </h3>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {formatPrice(item.price, i18n.language)} ·{' '}
                {t('stock', { count: item.availableQuantity })}
              </p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive size-8 shrink-0"
              disabled={disabled}
              onClick={() => onRemove(item.medicineId)}
              aria-label={t('remove', { medicine: item.commercialName })}
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={disabled || item.quantity <= 1}
              onClick={() =>
                onQuantityChange(item.medicineId, item.quantity - 1)
              }
              aria-label={t('decrease', { medicine: item.commercialName })}
            >
              <Minus className="size-3.5" aria-hidden="true" />
            </Button>

            <Input
              type="number"
              inputMode="numeric"
              min={1}
              max={item.availableQuantity}
              step={1}
              value={item.quantity}
              disabled={disabled}
              className="h-8 w-20 text-center tabular-nums"
              aria-label={t('quantity', { medicine: item.commercialName })}
              onChange={(event) =>
                onQuantityChange(item.medicineId, Number(event.target.value))
              }
            />

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              disabled={disabled || item.quantity >= item.availableQuantity}
              onClick={() =>
                onQuantityChange(item.medicineId, item.quantity + 1)
              }
              aria-label={t('increase', { medicine: item.commercialName })}
            >
              <Plus className="size-3.5" aria-hidden="true" />
            </Button>

            <span className="ms-auto text-sm font-bold tabular-nums">
              {formatPrice(
                Number(item.price) * item.quantity,
                i18n.language,
              )}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export const OrderCartItem = memo(OrderCartItemImpl);
