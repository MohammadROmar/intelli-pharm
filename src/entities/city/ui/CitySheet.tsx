import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Building2, CirclePlus } from 'lucide-react';

import {
  Button,
  CardSectionHeader,
  Sheet,
  SheetContent,
  SheetHeader,
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
            <CirclePlus />
            <span>{t('action')}</span>
          </Button>
        </SheetTrigger>
      )}

      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle')}
            icon={Building2}
          />
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
