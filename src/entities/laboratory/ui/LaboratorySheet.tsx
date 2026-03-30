import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { CirclePlus, Pencil, Pipette } from 'lucide-react';

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

export function LaboratorySheet({
  open,
  onOpenChange,
  isEdit = false,
  children,
}: Props) {
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: `laboratoriesPage.${isEdit ? 'edit' : 'create'}`,
  });

  const Icon = isEdit ? Pencil : CirclePlus;

  const isRtl = i18n.dir() === 'rtl';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button size="sm" className="flex items-center justify-center gap-2">
          <Icon />
          <span>{t('action')}</span>
        </Button>
      </SheetTrigger>

      <SheetContent side={isRtl ? 'left' : 'right'}>
        <SheetHeader>
          <CardSectionHeader
            title={t('title')}
            description={t('subtitle')}
            icon={Pipette}
          />
        </SheetHeader>

        <div className="grid flex-1 gap-6 p-4 pt-0">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
