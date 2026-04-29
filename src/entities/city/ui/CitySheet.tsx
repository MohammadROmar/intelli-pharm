import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, CirclePlus } from 'lucide-react';

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
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: `citiesPage.${isEdit ? 'edit' : 'create'}`,
  });

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {!isEdit && (
        <SheetTrigger asChild>
          <Button size="sm" className="flex items-center justify-center gap-2">
            <CirclePlus className="size-4" />
            <span className="sr-only sm:not-sr-only">{t('action')}</span>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <SheetTitle className="sr-only">{t('title')}</SheetTitle>
          <SheetDescription className="sr-only">
            {t('subtitle')}
          </SheetDescription>
          <div aria-hidden>
            <CardSectionHeader
              title={t('title')}
              description={t('subtitle')}
              icon={Building2}
            />
          </div>
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
