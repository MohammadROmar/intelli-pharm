import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, Plus } from 'lucide-react';

import {
  Button,
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui';

type Props = {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  isEdit?: boolean;
} & PropsWithChildren;

export function CitySheet({
  open,
  onOpenChange,
  isEdit = false,
  children,
}: Props) {
  const { t, i18n } = useTranslation('cities', {
    keyPrefix: `${isEdit ? 'edit' : 'create'}`,
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {!isEdit && (
        <SheetTrigger asChild>
          <Button size="sm" className="flex items-center justify-center gap-2">
            <Plus className="size-4" />
            <span className="sr-only sm:not-sr-only">{t('action')}</span>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        side={isRtl ? 'left' : 'right'}
        className="w-full sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle')}
            icon={Building2}
            aria-hidden
          />
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
