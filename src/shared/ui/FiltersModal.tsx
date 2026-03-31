import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';

import { Button } from './Button';
import { Badge } from './badge';
import { Separator } from './Separator';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './dialog';
import { CardSectionHeader } from './CardSectionHeader';
import { ScrollArea } from './scroll-area';
import { cn } from '../lib';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClear: () => void;
  title: string;
  subtitle: string;
  form: string;
  hasActiveFilters?: boolean;
  className?: string;
} & PropsWithChildren;

type TriggerProps = {
  onClick: () => void;
  activeCount?: number;
};

export function FiltersTrigger({ onClick, activeCount = 0 }: TriggerProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.filters',
  });

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className="relative gap-2"
    >
      <SlidersHorizontal className="size-4" />
      {t('trigger')}
      {activeCount > 0 && (
        <Badge className="ml-1 flex size-4 items-center justify-center rounded-full p-0 text-[10px]">
          {activeCount}
        </Badge>
      )}
    </Button>
  );
}

export function FiltersModal({
  open,
  onOpenChange,
  onClear,
  title,
  subtitle,
  hasActiveFilters,
  className,
  form,
  children,
}: Props) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.filters',
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('sm:max-w-md', className)}>
        <DialogHeader className="text-start">
          <CardSectionHeader
            title={title}
            description={subtitle}
            icon={SlidersHorizontal}
          />
        </DialogHeader>

        <Separator />
        <ScrollArea className="max-h-[60vh]">{children}</ScrollArea>
        <Separator />

        <DialogFooter className="flex-row justify-end! gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={!hasActiveFilters}
            className="text-muted-foreground gap-1.5"
          >
            <X className="size-3.5" />
            {t('clear')}
          </Button>

          <Button type="submit" form={form} size="sm">
            {t('apply')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
