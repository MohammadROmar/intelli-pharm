import { Check, ClipboardList, ShoppingBasket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib';

import type { OrderEditorStep } from '../model/orderEditorTypes';

type Props = { currentStep: OrderEditorStep };

export function OrderStepIndicator({ currentStep }: Props) {
  const { t } = useTranslation('order-form', { keyPrefix: 'steps' });
  const detailsComplete = currentStep === 'medicines';

  return (
    <nav aria-label={t('ariaLabel')} className="mb-5">
      <p className="text-muted-foreground mb-3 text-xs font-medium md:hidden">
        {t('mobile', { current: detailsComplete ? 2 : 1, total: 2 })}
      </p>

      <ol className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        <li className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors',
              detailsComplete
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-primary bg-primary/10 text-primary',
            )}
          >
            {detailsComplete ? (
              <Check className="size-4" aria-hidden="true" />
            ) : (
              <ClipboardList className="size-4" aria-hidden="true" />
            )}
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="block text-sm font-semibold">
              {t('details.title')}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {t('details.description')}
            </span>
          </span>
        </li>

        <span
          className={cn(
            'h-px transition-colors',
            detailsComplete ? 'bg-primary' : 'bg-border',
          )}
          aria-hidden="true"
        />

        <li className="flex min-w-0 items-center gap-2.5">
          <span
            className={cn(
              'flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors',
              detailsComplete
                ? 'border-primary bg-primary/10 text-primary'
                : 'text-muted-foreground bg-muted/40',
            )}
          >
            <ShoppingBasket className="size-4" aria-hidden="true" />
          </span>
          <span className="hidden min-w-0 md:block">
            <span className="block text-sm font-semibold">
              {t('medicines.title')}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {t('medicines.description')}
            </span>
          </span>
        </li>
      </ol>
    </nav>
  );
}
