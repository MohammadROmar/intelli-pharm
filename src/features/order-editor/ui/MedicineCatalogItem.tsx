import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, GitCompareArrows, PackagePlus, Pill } from 'lucide-react';

import type { Medicine } from '@/entities/medicine';
import { formatPrice } from '@/shared/lib';
import { Badge, Button } from '@/shared/ui';

type Props = {
  medicine: Medicine;
  selected: boolean;
  onAdd: (medicine: Medicine) => void;
  onShowAlternatives: (medicine: Medicine) => void;
};

function MedicineCatalogItemImpl({
  medicine,
  selected,
  onAdd,
  onShowAlternatives,
}: Props) {
  const { t, i18n } = useTranslation('order-form', {
    keyPrefix: 'medicines.item',
  });
  const available = medicine.is_active && medicine.available_quantity > 0;

  return (
    <article className="bg-card [contain-intrinsic-size:112px] [content-visibility:auto] rounded-xl border p-3.5 transition-colors hover:border-current/20">
      <div className="flex min-w-0 gap-3.5">
        <div className="bg-muted flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
          {medicine.images[0] ? (
            <img
              src={medicine.images[0]}
              alt=""
              loading="lazy"
              decoding="async"
              className="size-full object-cover"
            />
          ) : (
            <Pill
              className="text-muted-foreground size-6"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold">
                {medicine.commercial_name}
              </h3>
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs">
                {medicine.scientific_name}
              </p>
            </div>

            <p className="shrink-0 text-sm font-bold tabular-nums">
              {formatPrice(medicine.price, i18n.language)}
            </p>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <Badge variant={available ? 'success' : 'destructive'}>
              {available
                ? t('available', { count: medicine.available_quantity })
                : t('unavailable')}
            </Badge>

            {medicine.gift.required_quantity > 0 ? (
              <Badge variant="muted">
                {t('gift', {
                  required: medicine.gift.required_quantity,
                  gift: medicine.gift.gift_quantity,
                })}
              </Badge>
            ) : null}
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button
              type="button"
              size="sm"
              disabled={!available || selected}
              className="gap-2"
              onClick={() => onAdd(medicine)}
            >
              {selected ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <PackagePlus className="size-4" aria-hidden="true" />
              )}
              {selected ? t('selected') : t('add')}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => onShowAlternatives(medicine)}
            >
              <GitCompareArrows className="size-4" aria-hidden="true" />
              {t('alternatives')}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

export const MedicineCatalogItem = memo(MedicineCatalogItemImpl);
