import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, X } from 'lucide-react';

import { Badge } from './badge';
import { Button } from './Button';
import { Kbd, KbdGroup } from './kbd';
import { Separator } from './Separator';
import { ScrollArea } from './scroll-area';
import { CardSectionHeader } from './CardSectionHeader';
import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from './dialog';
import { cn, useKeyboardShortcut } from '../lib';

type TriggerProps = {
  onClick: () => void;
  activeCount?: number;
  className?: string;
};

export function FiltersTrigger({
  onClick,
  activeCount = 0,
  className,
}: TriggerProps) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'common.filters',
  });

  useKeyboardShortcut(
    {
      key: 'f',
      ctrlOrMeta: true,
      shift: true,
      preventDefault: true,
    },
    onClick,
  );

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn('relative gap-2', className)}
    >
      <SlidersHorizontal className="size-4" />
      <span>{t('trigger')}</span>

      {activeCount > 0 && (
        <Badge className="ml-1 flex size-4 items-center justify-center rounded-full p-0 text-[10px]">
          {activeCount}
        </Badge>
      )}

      <KbdGroup className="hidden! lg:flex! rtl:flex-row-reverse">
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>F</Kbd>
      </KbdGroup>
    </Button>
  );
}

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
      <DialogContent className={cn('p-0! sm:max-w-md', className)}>
        <DialogHeader className="relative p-6! pb-0! text-start">
          <div aria-hidden>
            <CardSectionHeader
              title={title}
              description={subtitle}
              icon={SlidersHorizontal}
            />
          </div>
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">{subtitle}</DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="mx-2 max-h-[60vh] px-4">{children}</ScrollArea>
        <Separator />

        <DialogFooter className="flex-row justify-end! gap-2 p-6 pt-0">
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
