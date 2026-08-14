import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';

import { STATUS_META } from '../lib/utils';
import { OrderStatusBadge, type OrderStatus } from '@/entities/order';
import { cn } from '@/shared/lib';

type StatusCardProps = {
  status: OrderStatus;
  selected: boolean;
  onSelect: (status: OrderStatus) => void;
};

export function StatusCard({ status, selected, onSelect }: StatusCardProps) {
  const { t } = useTranslation('orders', {
    keyPrefix: 'changeStatus',
  });

  const { icon: Icon, destructive } = STATUS_META[status];

  return (
    <button
      type="button"
      onClick={() => onSelect(status)}
      aria-pressed={selected}
      className={cn(
        'min-h-16 w-full cursor-pointer rounded-lg border-2 p-4 text-start transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none',
        selected && !destructive && 'border-primary! bg-primary/5',
        selected && destructive && 'border-destructive! bg-destructive/5',
        !selected &&
          'border-border hover:border-muted-foreground/40 hover:bg-muted/40',
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Icon
            aria-hidden="true"
            className={cn(
              'size-5 shrink-0',
              selected && !destructive && 'text-primary',
              selected && destructive && 'text-destructive',
              !selected && 'text-muted-foreground',
            )}
          />
          <div className="space-y-0.5">
            <OrderStatusBadge status={status} withIcon={false} />
            <p className="text-muted-foreground text-xs">
              {t(`statusDescription.${status}`)}
            </p>
          </div>
        </div>
        {selected ? (
          <div
            className={cn(
              'flex size-5 shrink-0 items-center justify-center rounded-full',
              destructive ? 'bg-destructive' : 'bg-primary',
            )}
          >
            <CheckCircle2
              aria-hidden="true"
              className={cn(
                'size-3',
                destructive
                  ? 'text-destructive-foreground'
                  : 'text-primary-foreground',
              )}
            />
          </div>
        ) : null}
      </div>
    </button>
  );
}
