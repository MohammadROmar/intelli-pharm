import { Cloud, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui';

type Props = {
  labels?: {
    description: string;
    discard: string;
    dismiss: string;
    title: string;
  };
  onDismiss: () => void;
  onDiscard: () => void;
};

export function OrderDraftRestored({ labels, onDismiss, onDiscard }: Props) {
  const { t } = useTranslation('order-form', { keyPrefix: 'draft' });

  return (
    <div className="bg-muted/40 mb-5 flex items-start gap-3 rounded-xl border p-3.5">
      <span className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Cloud className="size-4" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">
          {labels?.title ?? t('restoredTitle')}
        </p>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {labels?.description ?? t('restoredDescription')}
        </p>
        <Button
          type="button"
          variant="link"
          size="sm"
          className="mt-1 h-auto p-0 text-xs"
          onClick={onDiscard}
        >
          {labels?.discard ?? t('discard')}
        </Button>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-8 shrink-0"
        onClick={onDismiss}
        aria-label={labels?.dismiss ?? t('dismiss')}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
