import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, PackagePlus, Pill } from 'lucide-react';

import type { AlternativeMedicine } from '@/entities/medicine';
import { formatPrice } from '@/shared/lib';
import { Badge, Button } from '@/shared/ui';

type Props = {
  medicine: AlternativeMedicine;
  selected: boolean;
  language: 'ar' | 'en';
  onAdd: (medicine: AlternativeMedicine) => void;
};

function AlternativeMedicineItemImpl({
  medicine,
  selected,
  language,
  onAdd,
}: Props) {
  const { t, i18n } = useTranslation('order-form', {
    keyPrefix: 'alternatives.item',
  });
  const name =
    medicine.commercial_name[language] ||
    medicine.commercial_name[language === 'ar' ? 'en' : 'ar'];
  const available = medicine.is_active && medicine.available_quantity > 0;

  return (
    <article className="bg-card rounded-xl border p-3.5">
      <div className="flex min-w-0 gap-3">
        <div className="bg-muted flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
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
              className="text-muted-foreground size-5"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 truncate text-sm font-semibold">{name}</h3>
            <span className="shrink-0 text-xs font-bold tabular-nums">
              {formatPrice(medicine.price, i18n.language)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant={available ? 'success' : 'destructive'}>
              {available
                ? t('available', { count: medicine.available_quantity })
                : t('unavailable')}
            </Badge>
          </div>

          <Button
            type="button"
            size="sm"
            className="mt-3 gap-2"
            disabled={!available || selected}
            onClick={() => onAdd(medicine)}
          >
            {selected ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <PackagePlus className="size-4" aria-hidden="true" />
            )}
            {selected ? t('selected') : t('add')}
          </Button>
        </div>
      </div>
    </article>
  );
}

export const AlternativeMedicineItem = memo(AlternativeMedicineItemImpl);
